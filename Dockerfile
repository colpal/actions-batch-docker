FROM google/cloud-sdk:alpine

LABEL name="populate-dagbag"
LABEL version="1.0.0"
LABEL com.github.actions.name="Populate Dagbag"
LABEL com.github.actions.description="Github Action to repopulate an airflow dagbag"
LABEL com.github.actions.color="blue"
LABEL com.github.actions.icon="cloud"

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
