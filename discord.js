const Discord = require('discord.js');
const reconnect=async()=>{
    return await login().catch(()=>setTimeout(()=>reconnect(),1000))
}
const login=async()=>{
    const client = new Discord.Client();
    await client.login(process.env.TOKEN_DISCORD).catch(e=>console.log("Discord Bot Offline!!!"))
    return client
}
(async()=>{console.log(await login());})()

module.exports = login()
