#!/bin/sh

set -eux

gcloud container clusters get-credentials "$CLUSTER" \
  --project "$PROJECT" \
  --zone "$ZONE"
kubectl config set-context \
  --current \
  --namespace="$NAMESPACE"

dag_directory=/exports/dags
pod_name=$(\
  kubectl get pod \
    -l "$POD_LABEL" \
    -o jsonpath='{.items[0].metadata.name}'\
)
kubectl exec "$pod_name" -- sh -c "rm -rf $dag_directory/*"
for dag_file in *.py; do
  test ! -f "$dag_file" \
    || kubectl cp "$dag_file" "$pod_name:$dag_directory"
done
