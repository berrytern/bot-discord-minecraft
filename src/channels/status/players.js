const fetch = require('node-fetch')
let {rcon,recon} = require('../../connection/rcon')
let kick=0
module.exports=async(discord,update)=>{
    const channel = await discord.channels.cache.get('850742530165309440');
    let last_status;
    let last_msg;
    /*channel.messages.fetch({ limit: 10 }).then(messages => {
        console.log(`Received ${messages.size} messages`);
        //Iterate through the messages here with the variable "messages".
        messages.forEach(async message => await message.delete())
    })*/
    //There are 2 of a max of 20 players online: Liongh0st, berrytern
    setInterval(async()=>{
        let data;
        try{
            /*const response=await fetch("http://localhost:4040/api/tunnels")
            const json=await response.json()
            const ip=json.tunnels[0].public_url.split('//')[1]*/
            const ip="berryternserver.ddns.net"
            if(rcon===undefined){
                rcon = await recon()
            }
            data=await rcon.send("list")
            if(kick==0){
                await rcon.send("/setidletimeout 5")
                kick++;
            }
            const players=data.split(':')[1]
            const quant=data.split(' ')[2]
            data=`:green_circle:  SERVIDOR ONLINE! [${quant}/${data.split(' ')[7]}] \n--IP: ${ip}\nplayers:${players}`
            update(players,quant)
        }catch(e){
            if(e.message==="Not connected"){
                try{
                    rcon=await recon()
                }catch(j){
                    console.log("not running")
                }
                
            }
            data=":red_circle: SERVIDOR OFFLINE!"
        }
        if(data!=last_status){
            last_status=data
            if(last_msg){
                last_msg.delete()
            }
            last_msg=await channel.send(data)
        }
        
    },2000)
}