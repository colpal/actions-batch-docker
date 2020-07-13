const path = require('path');

const core = require('@actions/core');
const glob = require('@actions/glob');
const { exec } = require('@actions/exec');

function includesBy(set, fn) {
  for (const item of set) { // eslint-disable-line no-restricted-syntax
    if (fn(item)) {
      return true;
    }
  }
  return false;
}

function try$(a) {
  if (a instanceof Function) {
    try {
      return [null, a()];
    } catch (err) {
      return [err, null];
    }
  } else if (a instanceof Promise) {
    return a
      .then((x) => [null, x])
      .catch((err) => [err, null]);
  }
  return ['try$ was not invoked with an eligible argument', null];
}

(async () => {
  const project = core.getInput('project', { required: true });
  const rootDirectory = core.getInput('root-directory', { required: true });
  const changedFiles = core.getInput('changed-files', { required: true });

  const [parseError, parsedFiles] = try$(() => JSON.parse(changedFiles));
  if (parseError) {
    core.setFailed(`Could not parse changed-files as valid JSON: ${parseError}`);
    return;
  }

  const relevantChanges = new Set(
    parsedFiles
      .map((p) => path.relative(rootDirectory, p))
      .filter((p) => !p.startsWith('../')),
  );

  const [globberError, globber] = await try$(glob.create(
    path.resolve(rootDirectory, '**', 'Dockerfile.*'),
  ));
  if (globberError) {
    core.setFailed(`Could not create glob for eligible Dockerfiles: ${globberError}`);
    return;
  }

  const [matchError, matches] = await try$(globber.glob());
  if (matchError) {
    core.setFailed(`Could not execute glob for Dockerfiles: ${matchError}`);
    return;
  }

  const pipelines = matches
    .filter((file) => {
      const dirname = path.dirname(path.relative(rootDirectory, file));
      return includesBy(relevantChanges, (change) => change.startsWith(dirname));
    })
    .map(async (file) => {
      const filename = path.basename(file);
      const image = filename.match(/^Dockerfile\.(.*)$/)[1];
      const gitSHA = process.env.GITHUB_SHA;
      const tag = `gcr.io/${project}/${image}:${gitSHA}`;
      const cwd = path.dirname(file);

      const [buildError] = await try$(exec(
        'docker',
        ['build', '-f', filename, '-t', tag, '.'],
        { cwd },
      ));
      if (buildError) throw new Error(`Could not build '${file}'`);

      const [deployError] = await try$(exec('docker', ['push', tag]));
      if (deployError) throw new Error(`Could not deploy '${tag}'`);

      return undefined;
    });

  const rejected = await Promise
    .allSettled(pipelines)
    .then((pipes) => pipes.filter((pipe) => pipe.status === 'rejected'));

  rejected.forEach((reject) => core.setFailed(reject.reason));
})();
