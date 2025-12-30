const { Client } = require('fnbr');

// We use process.env so you don't have to show your secret code on GitHub
const AUTH_CODE = process.env.AUTH_CODE;

const client = new Client({
    auth: { authorizationCode: async () => AUTH_CODE },
});

client.on('ready', () => {
    console.log(`Bot is online: ${client.user.displayName}`);
});

// Auto-accept friends
client.on('friend:request', async (request) => {
    await request.accept();
    console.log(`Accepted friend: ${request.displayName}`);
});

// Auto-join parties
client.on('party:invite', async (invite) => {
    await invite.accept();
    console.log(`Joined party!`);
});

// Party Commands
client.on('party:message', async (message) => {
    const content = message.content.toLowerCase();
    
    if (content.startsWith('!skin ')) {
        const skinId = content.replace('!skin ', '').trim();
        await client.party.me.setOutfit(skinId);
    }
    
    if (content === '!ready') await client.party.me.setReady(true);
    if (content === '!unready') await client.party.me.setReady(false);
});

client.login();
