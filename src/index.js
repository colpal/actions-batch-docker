const path = require('path');

const core = require('@actions/core');
const glob = require('@actions/glob');

(async () => {
  const rootDirectory = core.getInput('root-directory', { required: true });
  const changedFiles = core.getInput('changed-files', { required: true });
  const dockerfiles = await glob
    .create(path.resolve(rootDirectory, '**', 'Dockerfile.*'))
    .then((globber) => globber.glob());
  const contexts = JSON
    .parse(changedFiles)
    .map((p) => path.relative(rootDirectory, p))
    .filter((p) => !p.startsWith('../'))
    .map((p) => p.split('/')[0]);

  console.log(dockerfiles);
  console.log(contexts);
})();
