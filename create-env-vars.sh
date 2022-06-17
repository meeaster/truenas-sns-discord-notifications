#!/bin/bash

jq -n \
    --arg wid "$WEBHOOK_ID" \
    --arg wt "$WEBHOOK_TOKEN" \
    --arg tu "$TRUENAS_URL" \
    '{ SendDiscordNotificationFunction: { WEBHOOK_ID: $wid, WEBHOOK_TOKEN: $wt, TRUENAS_URL: $tu } }' \
    > env-vars.json
