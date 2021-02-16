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
  - uses: google-github-actions/setup-gcloud@master
    with:
      # Needed to authenticate the docker CLI in a later step
      service_account_key: ${{ steps.vault.outputs.GKE_CREDENTIALS }}
      project_id: ${{ env.GKE_PROJECT }}

  # Authenticate the docker CLI to push to the private GCR
  - run: gcloud auth configure-docker

  # This list of changed files will be necessary for a required input
  - id: changed
    uses: colpal/actions-changed-files@v1.0.0

  - uses: colpal/actions-batch-docker@v1.0.0
    with:
      # The root directory that contains all of your docker directories
      root-directory: tasks/
      # A JSON formatted list of files that changed since the last workflow run. This is used to
      # only build Docker images that could have changed
      changed-files: '${{ steps.changed.outputs.json }}'
      # The Docker registry prefix you are attempting to push to
      registry: gcr.io/your-project-id
      # If set to 'false', the images will only be built and tagged. Defaults to 'true'
      deploy: 'true'
      # JSON list of additional tags that will be added to each of the deployed images in the remote container repository. Defaults to empty list '[]'
      image-tags: '[]'
```

Assume your project structure looked like the following, with the starred files being those that
had changes in the latest commit:

```
tasks/
├── task-a
│   ├── Dockerfile.debian
│   └── Dockerfile.ubuntu *
├── task-b
|   └── Dockerfile.alpine *
└── task-c
    ├── Dockerfile        *
    └── Dockerfile.ubuntu *
.github/
└── workflows
    └── main.yaml
unrelated/
└── Dockerfile.centos *
```

This workflow would build/deploy the following:

- `tasks/task-a/Dockerfile.ubuntu` would be tagged and deployed as
  `gcr.io/your-project-id/task-a/ubuntu:$COMMIT_SHA`
- `tasks/task-b/Dockerfile.alpine` would be tagged and deployed as
  `gcr.io/your-project-id/task-b/alpine:$COMMIT_SHA`
- `tasks/task-c/Dockerfile` would be tagged and deployed as
  `gcr.io/your-project-id/task-c:$COMMIT_SHA`
- `tasks/task-c/Dockerfile.ubuntu` would be tagged and deployed as
  `gcr.io/your-project-id/task-c/ubuntu:$COMMIT_SHA`

This workflow would **not** build/deploy the following:

- `tasks/task-a/Dockerfile.debian` would not be built because it did not change
- `unrelated/Dockerfile.centos` would not be built because it is outside of the root directory
