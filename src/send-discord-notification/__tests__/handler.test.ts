import { handler } from '../app';

const rest = {
    setToken: jest.fn().mockReturnThis(),
    post: jest.fn().mockResolvedValue('Success')
};
jest.mock('@discordjs/rest', () => {
    return {
        REST: jest.fn(() => rest)
    }
});

const event: any = {
    Records: [
        {
            Sns: {
                Subject: 'Alerts',
                Message: 'TrueNAS @ truenas<br><br>This is a test alert'
            }
        }
    ]
};

process.env.WEBHOOK_ID = '123456789'
process.env.WEBHOOK_TOKEN = 'NOTREALTOKEN'
process.env.TRUENAS_URL = 'https://NOTREALURL'

describe('Send Discord Notification - handler', () => {
    test('handler return sucessfully', async () => {
        const setTokenSpy = jest.spyOn(rest, 'setToken');
        const postSpy = jest.spyOn(rest, 'post');

        await expect(handler(event)).resolves.not.toThrow();
        expect(setTokenSpy).toBeCalledWith('NOTREALTOKEN');
        expect(postSpy).toBeCalledWith(
            expect.stringMatching('/webhooks/123456789/NOTREALTOKEN'), 
            expect.objectContaining({
                body: {
                    username: 'Truenas [Alerts]',
                    avatar_url: 'https://www.truenas.com/wp-content/uploads/2020/06/logo-TrueNAS-Scale-compressor.png',
                    embeds: [
                        {
                            author: {
                                name: 'TrueNAS @ truenas'
                            },
                            title: 'Alerts',
                            url: 'https://NOTREALURL',
                            description: 'This is a test alert',
                            color: 15224675
                        }
                    ]
                }
            }));
    });

    test('handler throws error when post fails', async () => {
        jest.spyOn(rest, 'post').mockRejectedValue(new Error('Some error'));

        await expect(handler(event)).rejects.toThrow();
    });
});
