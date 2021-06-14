const fetch = require('node-fetch')
let kick=0
module.exports=async(discord,update,rcon,recon)=>{
    const channel = await discord.channels.cache.get('850742530165309440');
    let last_status;
    let last_msg;
    setInterval(async()=>{
        let data;
        try{
            try{
                /*const response=await fetch("http://localhost:4040/api/tunnels")
                const json=await response.json()
                const ip=json.tunnels[0].public_url.split('//')[1]*/
                const ip=process.env.SERVER_IP
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
                data=":red_circle: SERVIDOR OFFLINE!"            
            }
            if(data!=last_status){
                last_status=data
                if(last_msg){
                    last_msg.delete()
                }
                last_msg=await channel.send(data)
            }
        }catch(e){
            console.log("error Status")   
        }
    },2000)
}