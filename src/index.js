const path = require('path');

const core = require('@actions/core');

(async () => {
  const rootDirectory = core.getInput('root-directory', { required: true });
  const changedFiles = JSON.parse(core.getInput('changed-files', { required: true }));

  const changedDirectories = new Set(changedFiles
    .map((p) => path.relative(rootDirectory, p))
    .filter((p) => !p.startsWith('../'))
    .map((p) => path.parse(p).root));

  console.log(changedDirectories);
})();
