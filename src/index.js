const path = require('path');
const { Transform } = require('stream');

const core = require('@actions/core');
const glob = require('@actions/glob');
const { exec } = require('@actions/exec');

const includesBy = (set, fn) => {
  for (const item of set) { // eslint-disable-line no-restricted-syntax
    if (fn(item)) {
      return true;
    }
  }
  return false;
};

const try$ = (a) => {
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
};

const stampStream = (stamp) => new Transform({
  transform(chunk, _encoding, callback) {
    const newChunk = chunk
      .toString()
      .trim()
      .split('\n')
      .map((line) => `[${stamp}] ${line}`)
      .join('\n');
    callback(null, `${newChunk}\n`);
  },
});

const buildThenDeploy = (registry, shouldDeploy, imageTags) => async (dockerfile) => {
  const filename = path.basename(dockerfile);
  // matches 'Dockerfile' or 'Dockerfile.*', but not 'Dockerfile.'
  const regexMatch = filename.match(/^Dockerfile(?:\.(.+))?$/);
  const image = regexMatch ? regexMatch[1] : '';
  const gitSHA = process.env.GITHUB_SHA;
  const cwd = path.dirname(dockerfile);
  const subfolder = path.basename(cwd);
  const imageName = path.join(registry, subfolder, image);
  const stamp = `${subfolder}/${filename}`;
  const outStream = stampStream(stamp);
  outStream.pipe(process.stdout);
  const errStream = stampStream(stamp);
  errStream.pipe(process.stderr);

  imageTags.push(gitSHA);

  const [buildError] = await try$(exec('docker', ['build', '-f', filename, ...imageTags.map((p) => ['-t', `${imageName}:${p}`]).flat(), '.'], {
    cwd,
    outStream,
    errStream,
  }));
  if (buildError) throw new Error(`Could not build image '${gitSHA}' from dockerfile '${dockerfile}' with additional tags '${imageTags}'.`);

  if (!shouldDeploy) return undefined;

  const [deployError] = await try$(exec('docker', ['image', 'push', '-a', imageName], { cwd, outStream, errStream }));
  if (deployError) throw new Error(`Could not deploy one or more of '${imageTags}'`);

  return undefined;
};

const main = async () => {
  const registry = core.getInput('registry', { required: true });
  const root = core.getInput('root-directory', { required: true });
  const changedFiles = core.getInput('changed-files', { required: true });
  const shouldDeploy = core.getInput('deploy') === 'true';
  const imageTags = core.getInput('image-tags');

  const [gcloudError] = await try$(exec('gcloud', ['version']));
  if (gcloudError) return core.setFailed('The "gcloud" executable is not available');

  const [dockerError] = await try$(exec('docker', ['version']));
  if (dockerError) return core.setFailed('The "docker" executable is not available');

  const [parseError, parsedFiles] = try$(() => JSON.parse(changedFiles));
  if (parseError) return core.setFailed(`Input changed-files is not valid JSON: ${parseError}`);

  const relevantChanges = new Set(
    parsedFiles
      .map((p) => path.relative(root, p))
      .filter((p) => !p.startsWith('../')),
  );

  const [tagParseError, parsedImageTags] = try$(() => JSON.parse(imageTags));
  if (tagParseError) return core.setFailed(`Input image-tags is not valid JSON: ${parseError}`);

  const [globError, globber] = await try$(glob.create(path.resolve(root, '**', 'Dockerfile*')));
  if (globError) return core.setFailed(`Can't create glob for Dockerfiles: ${globError}`);

  const [matchError, matches] = await try$(globber.glob());
  if (matchError) return core.setFailed(`Can't execute glob for Dockerfiles: ${matchError}`);

  const pipelines = matches
    .filter((file) => {
      const dirname = path.dirname(path.relative(root, file));
      return includesBy(relevantChanges, (change) => change.startsWith(dirname));
    })
    .map(buildThenDeploy(registry, shouldDeploy, parsedImageTags));

  const rejected = await Promise
    .allSettled(pipelines)
    .then((pipes) => pipes.filter((pipe) => pipe.status === 'rejected'));

  rejected.forEach((reject) => core.setFailed(reject.reason));
  return undefined;
};

main();
