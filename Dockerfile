FROM google/cloud-sdk:alpine

LABEL name="action-template"
LABEL version="1.0.0"
LABEL com.github.actions.name="Action Name"
LABEL com.github.actions.description="Action Description"
LABEL com.github.actions.color="blue"
LABEL com.github.actions.icon="cloud"

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]