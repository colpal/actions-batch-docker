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

(async () => {
  const project = core.getInput('project', { required: true });
  const rootDirectory = core.getInput('root-directory', { required: true });
  const changedFiles = core.getInput('changed-files', { required: true });

  const relevantChanges = new Set(
    JSON
      .parse(changedFiles)
      .map((p) => path.relative(rootDirectory, p))
      .filter((p) => !p.startsWith('../')),
  );

  const globber = await glob.create(path.resolve(rootDirectory, '**', 'Dockerfile.*'));
  const matches = await globber.glob();

  const dockerfiles = matches
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
      await exec('docker', ['build', '-f', filename, '-t', tag], { cwd });
    });
  await Promise.all(dockerfiles);
  await exec('docker', ['image', 'list']);
})();
