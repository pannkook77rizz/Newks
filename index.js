const { Client } = require('fnbr');

// Render will provide this from the Environment tab
const AUTH_CODE = process.env.AUTH_CODE;

const client = new Client({
    auth: { authorizationCode: async () => AUTH_CODE },
});

client.on('ready', () => {
    console.log(`[SUCCESS] Bot online: ${client.user.self.displayName}`);
    
    // --- YOUR CUSTOM STATUS ---
    client.setStatus("Playing with Fans! | !skin"); 
    
    // Set a default skin (Aura)
    client.party.me.setOutfit('CID_441_Athena_Commando_F_MasterMind'); 
});

// Auto-accept friends
client.on('friend:request', async (request) => {
    await request.accept();
    console.log(`Accepted friend: ${request.displayName}`);
});

// Auto-join parties
client.on('party:invite', async (invite) => {
    await invite.accept();
    console.log(`Joined a party!`);
});

// Party commands
client.on('party:message', async (message) => {
    const msg = message.content.toLowerCase();

    // Change Skin (!skin CID_ID)
    if (msg.startsWith('!skin ')) {
        const skinId = msg.replace('!skin ', '').trim();
        await client.party.me.setOutfit(skinId);
        await message.reply(`Skin set to ${skinId}`);
    }

    // Ready/Unready
    if (msg === '!ready') await client.party.me.setReady(true);
    if (msg === '!unready') await client.party.me.setReady(false);
});

client.login();
