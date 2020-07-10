const path = require('path');

const core = require('@actions/core');
const glob = require('@actions/glob');

function includesBy(set, fn) {
  for (const item of set) { // eslint-disable-line no-restricted-syntax
    if (fn(item)) {
      return true;
    }
  }
  return false;
}

(async () => {
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
    .map((file) => path.relative(rootDirectory, file))
    .filter((file) => {
      const dirname = path.dirname(file);
      return includesBy(relevantChanges, (change) => change.startsWith(dirname));
    });

  console.log(relevantChanges);
  console.log(dockerfiles);
})();
