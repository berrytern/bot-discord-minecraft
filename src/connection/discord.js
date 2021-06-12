const Discord =require('discord.js');

module.exports = ()=>{
    const client = new Discord.Client();
    client.login('ODQ4OTEzNDgzNDEwOTY0NTQw.YLTiSg.2Rq5_drT2BExrv-4xEloUuSDDto').catch(e=>console.log("Discord Bot Offline!!!"))
    return client
}
