Batch Docker
============

Automatically build and deploy multiple Docker images at once.

Usage
-----

> Note: This example assumes you are deploying to a private GCR, but this action does support
> pushing to arbitrary Docker registries.

```yaml
steps:
  - uses: actions/checkout@v2.3.1
    with:
      # Be sure to set the fetch-depth to 0 to allow arbitrary analysis of previous commits
      fetch-depth: 0

  # The docker CLI must be installed and configured on your choice of runner
  - run: docker version

  # The gcloud CLI must be installed and configured on your choice of runner
  - uses: GoogleCloudPlatform/github-actions/setup-gcloud@master
    with:
      version: '301.0.0'
      # Needed to authenticate the docker CLI in a later step
      service_account_key: ${{ secrets.GCP_SA_KEY }}

  # Authenticate the docker CLI to push to the private GCR
  - run: gcloud auth configure-docker

  # This list of changed files will be necessary for a required input
  - id: changed
    uses: colpal/actions-changed-files@v1.0.0

  - uses: colpal/actions-batch-docker
    with:
      # The root directory that contains all of your docker directories
      root-directory: your/image/directory
      # A JSON formatted list of files that changed since the last workflow run. This is used to
      # only build Docker images that could have changed
      changed-files: '${{ steps.changed.outputs.json }}'
      # The Docker registry prefix you are attempting to push to
      registry: gcr.io/your-project-id
```
