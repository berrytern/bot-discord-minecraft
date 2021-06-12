const Discord = require('discord.js');
const reconnect=async()=>{
    return await login().catch(()=>setTimeout(()=>reconnect(),1000))
}
const login=async()=>{
    const client = new Discord.Client();
    let cc=(msg)=>{console.log(msg)}
    await client.login('ODQ4OTEzNDgzNDEwOTY0NTQw.YLTiSg.2Rq5_drT2BExrv-4xEloUuSDDto').catch(e=>console.log("Discord Bot Offline!!!"))
    //console.log(client.on('message',cc))
    console.log(await client.channels.cache.get('850742530165309440'))
}
(async()=>{console.log(await login());})()

module.exports = login()
