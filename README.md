# truenas-sns-discord-notifications
Creates an SNS Topic and Lambda to send Truenas notifcations to a Discord webhook.

## Development
### Prerequisites
The env file `devcontainer/devcontainer.env` needs to be created with the following environment variables.
```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=

WEBHOOK_ID=
WEBHOOK_TOKEN=
TRUENAS_URL=
```
### Build
Run the npm command
```
npm run build
```
To automatically build when changes are detected, run the npm command
```
npm run watch
```

### Test
Run the npm command
```
npm test
```
The command can also be ran in the context of a lambda to only run it's tests.

### Deploy
Run the bash script
```
bash deploy.sh
```