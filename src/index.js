const path = require('path');

const core = require('@actions/core');

(async () => {
  const rootDirectory = core.getInput('root-directory', { required: true });
  const changedFiles = JSON.parse(core.getInput('changed-files', { required: true }));

  const relativeChanged = changedFiles.map((p) => path.relative(rootDirectory, p));
  console.log(relativeChanged);
  const relevantChanged = relativeChanged.filter((p) => !p.startsWith('../'));
  console.log(relevantChanged);
  const changedDirectories = relevantChanged.map((p) => p.split('/')[0])
  console.log(changedDirectories);
})();
