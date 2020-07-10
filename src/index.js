const path = require('path');

const core = require('@actions/core');
const glob = require('@actions/glob');

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
    .map((file) => path.relative(rootDirectory, file));

  console.log(relevantChanges);
  console.log(dockerfiles);
})();
