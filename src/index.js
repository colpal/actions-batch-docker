const path = require('path');

const core = require('@actions/core');

(async () => {
  const rootDirectory = core.getInput('root-directory', { required: true });
  const changedFiles = core.getInput('changed-files', { required: true });
  const contexts = JSON
    .parse(changedFiles)
    .map((p) => path.relative(rootDirectory, p))
    .filter((p) => !p.startsWith('../'))
    .map((p) => p.split('/')[0]);
  const uniqueContexts = [...new Set(contexts)];

  console.log(uniqueContexts);
})();
