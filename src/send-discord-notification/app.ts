import { SNSEvent } from 'aws-lambda';
import { REST } from '@discordjs/rest';
import {
    Routes,
    RESTPostAPIWebhookWithTokenJSONBody
} from 'discord-api-types/v10';
import { NodeHtmlMarkdown } from 'node-html-markdown';

export const handler = async (event: SNSEvent) => {
    console.log('incoming event is', JSON.stringify(event));

    const cleanMessage = event.Records[0].Sns.Message.replace('\n', '');
    const regex = /(.*?)<br><br>(.*)/;
    const match = regex.exec(cleanMessage);
    if (!match) {
        throw new Error('Unable to match message');
    }
    const markdownMessage = NodeHtmlMarkdown.translate(match[2]);

    console.log('translated markdown:', markdownMessage);

    const rest: REST = new REST({ version: '10' }).setToken(
        <string>process.env.WEBHOOK_TOKEN
    );

    const url = Routes.webhook(
        <string>process.env.WEBHOOK_ID,
        <string>process.env.WEBHOOK_TOKEN
    );
    const body: RESTPostAPIWebhookWithTokenJSONBody = {
        username: 'Truenas [Alerts]',
        avatar_url:
            'https://www.truenas.com/wp-content/uploads/2020/06/logo-TrueNAS-Scale-compressor.png',
        embeds: [
            {
                author: {
                    name: match[1]
                },
                title: event.Records[0].Sns.Subject,
                url: <string>process.env.TRUENAS_URL,
                description: markdownMessage,
                color: 15224675
            }
        ]
    };
    await rest.post(url, {
        body: body
    });
};
