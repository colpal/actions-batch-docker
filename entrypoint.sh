#!/bin/sh

set -eux

echo "$INPUT_SERVICE_ACCOUNT_KEY"

echo "$INPUT_SERVICE_ACCOUNT_KEY" | base64 -d > /tmp/service_account.json

cat /tmp/service_account.json

gcloud auth activate-service-account --key-file=/tmp/service_account.json

gcloud container clusters get-credentials "$INPUT_CLUSTER" \
  --project "$INPUT_PROJECT" \
  --zone "$INPUT_ZONE"
kubectl config set-context \
  --current \
  --namespace="$INPUT_NAMESPACE"

dag_directory=/exports/dags
pod_name=$(\
  kubectl get pod \
    -l "$INPUT_POD_LABEL" \
    -o jsonpath='{.items[0].metadata.name}'\
)
kubectl exec "$pod_name" -- sh -c "rm -rf $dag_directory/*"
for dag_file in *.py; do
  test ! -f "$dag_file" \
    || kubectl cp "$dag_file" "$pod_name:$dag_directory"
done
