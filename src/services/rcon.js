let discord = require('../connection/discord')
let {rcon,recon} = require('../connection/rcon')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const run=async()=>{
    discord =discord()
    discord.on("ready", ()=>{
        console.log("Successfully logged into client.");
        const rank=require('../channels/ranking/time')
        require('../channels/status/players')(discord,rank.update,rcon,recon)
        rank.time(discord)
    })
    discord.on('message',gotMessage)
    async function gotMessage(msg){
        console.log(msg.channel.id)
        if(msg.channel.id=="850743160862146580" && !msg.author.bot){
            if(msg.content=='!help'){
                msg.reply("Commands:\n!start -start server\n!stop -stop server\n!restart -restart server\n!help -info commands")
            }
            else if(msg.content=='!restart'){
                msg.reply("!restart")
                try{
                    rcon=await recon()
                    rcon.send("restart")
                    msg.reply("Restarting...")
                }catch(e){
                    msg.reply("try run !start")
                }
            }
            else if(msg.content=='!stop'){
                try{
                    rcon=await recon()
                    rcon.send("stop")
                    msg.reply("Stopping...")
                }catch(e){
                    msg.reply("Already stopped")
                }
            }
            else if(msg.content=='!start'){
                try{
                    try{
                        rcon=await recon()
                        res=await rcon.send('list')
                        msg.reply("Already running")
                    }catch(e){
                        msg.reply("Starting...")
                        res= await exec('cd /media/berrytern/EEFA3927FA38ED89/mineservers/br_vanilla && sh start.sh &')

                    }
                }catch(e){
                    msg.reply("Do not possible:")
                }
            }else if(msg.content=="!stop --all"){
                await msg.reply("Stopping...")
                process.exit()
            }
        }
    }
}
module.exports=run