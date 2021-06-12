let discord = require('../connection/discord')
const run=async()=>{
    discord =discord()
    discord.on("ready", ()=>{
        console.log("Successfully logged into client.");
        const rank=require('../channels/ranking/time')
        require('../channels/status/players')(discord,rank.update)
        rank.time(discord)
    })
    discord.on('message',gotMessage)
    function gotMessage(msg){
        console.log(msg.channel.id)
        if(msg.channel.id=="850743160862146580" && !msg.author.bot){
            if(msg.content=='ranking'){
                msg.reply("oie")
            }
        }
    }
}
module.exports=run