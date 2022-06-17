#!/bin/bash

npm run build && \
sam validate && \
sam deploy \
    --resolve-s3 \
    --stack-name truenas-aws-resources \
    --capabilities CAPABILITY_IAM CAPABILITY_IAM \
    --parameter-overrides "WebhookId=\"$WEBHOOK_ID\"" "WebhookToken=\"$WEBHOOK_TOKEN\"" "TruenasUrl=\"$TRUENAS_URL\"" \
    --disable-rollback