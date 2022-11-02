Batch Docker
============

Automatically build and deploy multiple Docker images at once.

Usage
-----

> Note: This example assumes you are deploying to a private GAR, but this action
  does support pushing to arbitrary Docker registries.

```yaml
steps:
  - uses: actions/checkout@v3
    with:
      # Be sure to set the fetch-depth to 0 to allow arbitrary analysis of
      # previous commits
      fetch-depth: 0

  # The docker CLI must be installed and configured on your choice of runner
  - run: docker version

  - id: auth
    uses: 'google-github-actions/auth@v0'
    with:
      # Needed to authenticate the docker CLI in a later step
      credentials_json: ${{ secrets.GAR_KEY }}

  # The gcloud CLI must be installed and configured on your choice of runner
  - uses: 'google-github-actions/setup-gcloud@v0'

  # Authenticate the docker CLI to push to the private GAR
  - run: gcloud auth configure-docker "$GAR_REGION-docker.pkg.dev"

  # This list of changed files will be necessary for a required input
  - id: changed
    uses: colpal/actions-changed-files@v2

  - uses: colpal/actions-batch-docker@v1
    with:
      # The root directory that contains all of your docker directories
      root-directory: tasks/
      # A JSON formatted list of files that changed since the last workflow run.
      # This is used to only build Docker images that could have changed
      changed-files: '${{ fromJSON(steps.changed.outputs.json).all }}'
      # The Docker registry prefix you are attempting to push to
      registry: "${{ env.GAR_REGION }}-docker.pkg.dev/${{ steps.auth.outputs.project_id}}/${{ env.GAR_REPOSITORY }}"
      # If set to 'false', the images will only be built and tagged. Defaults
      # to 'true'
      deploy: 'true'
      # JSON list of additional tags that will be added to each of the deployed
      # images in the remote container repository. Defaults to empty list '[]'
      image-tags: '[]'
```

Assume your project structure looked like the following, with the starred files
being those that had changes in the latest commit:

```
tasks/
├── task-a
│   └── Dockerfile *
├── task-b
|   ├── Dockerfile
|   └── Scripts
|       ├── entrypoint.py *
|       └── requirements.txt
├── task-c
│   └── Dockerfile
└── task-d
    ├── Dockerfile
    └── Scripts
        ├── entrypoint.py
        └── requirements.txt
.github/
└── workflows
    └── main.yaml
unrelated/
└── Dockerfile *
```

This workflow would build/deploy the following:

- `tasks/task-a/Dockerfile` would be tagged and deployed as
  `$GAR_REGION-docker.pkg.dev/$GAR_PROJECT/task-a:$COMMIT_SHA`
- `tasks/task-b/Dockerfile` would be tagged and deployed as
  `$GAR_REGION-docker.pkg.dev/$GAR_PROJECT/task-b:$COMMIT_SHA`

This workflow would **not** build/deploy the following:

- `tasks/task-c/Dockerfile` would not be built because it did not change
- `tasks/task-d/Dockerfile` would not be built because nothing in its directory
  changed
- `unrelated/Dockerfile` would not be built because it is outside of the root
  directory
