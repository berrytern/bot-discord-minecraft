const Discord =require('discord.js');

module.exports = ()=>{
    const client = new Discord.Client();
    client.login(process.env.DISCORD_TOKEN).catch(e=>console.log("Discord Bot Offline!!!"))
    return client
}
