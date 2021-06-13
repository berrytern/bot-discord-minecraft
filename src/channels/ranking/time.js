const user= require('../../database/models/user')
let {rcon,recon}=require('../../connection/rcon')
let players={}
setInterval(async()=>{

},20000)
const filterNames=(names)=>{
    const re=new RegExp(' ', 'g');
    return names.replace(re,'').split(',')
}
const update=(names,quant)=>{
    if(Number(quant)>0){
        names=filterNames(names)
        for(let i=0;i<names.length;i++){
            if(players[names[i]]===undefined){
                players[names[i]]={}
                players[names[i]].online=2
            }else{
                players[names[i]].online+=2
            }
        }
    }
}
const filterData=(msg)=>{
    const re=new RegExp(' ', 'g');
    return msg.replace(re,'').split(':')[1]
}
module.exports={update:update,time:async(discord)=>{
    let lastMessage=[]
    const channelTime= await discord.channels.cache.get('852469461897445396');
    const channelLevel= await discord.channels.cache.get('852469549110394900');
    const channelScore= await discord.channels.cache.get('852469705078734888');
    const channelAlive= await discord.channels.cache.get('852469890622423070');
    setInterval(async()=>{
        lastMessage.map(async(msg)=>await msg.delete())
        let users=await user.find().sort({Allseconds: -1}).limit(10)
        message="\n"
        users.map((user,index)=>{
            message+=(index+1)+"º\tNickname: "+user.mineNick+" \tHours: "+Math.round(((user.Allseconds/60)/60 + Number.EPSILON) * 100) / 100+"\n"
        })
        lastMessage.push(await channelTime.send(message))
        users=await user.find().sort({maxLvl: -1}).limit(10)
        message="\n"
        users.map((user,index)=>{
            message+=(index+1)+"º\tNickname: "+user.mineNick+" \tMaxLevel: "+user.maxLvl+"\tLevel: "+user.lvl+"\n"
        })
        lastMessage.push(await channelLevel.send(message))
        users=await user.find().sort({maxScore: -1}).limit(10)
        message="\n"
        users.map((user,index)=>{
            message+=(index+1)+"º\tNickname: "+user.mineNick+" \tMaxScore: "+user.maxScore+"\tScore: "+user.score+"\n"
        })
        lastMessage.push(await channelScore.send(message))
        users=await user.find().sort({maxAlive: -1}).limit(10)
        message="\n"
        users.map((user,index)=>{
            message+=(index+1)+"º\tNickname: "+user.mineNick+" \tMaxHours: "+Math.round(((user.maxAlive/60)/60 + Number.EPSILON) * 100) / 100+"\tCurrent: "+Math.round(((user.alive/60)/60 + Number.EPSILON) * 100) / 100+"\n"
        })
        lastMessage.push(await channelAlive.send(message))

    },60000*process.env.RANKING_TIME_SHOW|20)
    setInterval(async()=>{
        const keys=Object.keys(players)
        for(let i=0;i<keys.length;i++){
            try{
                xp=Number(filterData(await rcon.send("data get entity "+keys[i]+" XpLevel")))
                score=Number(filterData(await rcon.send("data get entity "+keys[i]+" Score")))
            }catch(e){
                rcon=await recon()
            }
            try{
                xp=Number(filterData(await rcon.send("data get entity "+keys[i]+" XpLevel")))
                score=Number(filterData(await rcon.send("data get entity "+keys[i]+" Score")))
                const find = await user.findOne({mineNick:keys[i]})
                if(find){
                    if(xp && score){
                        if(find.score<=score && 20<score){
                            find.alive+=players[keys[i]].online
                        }else{
                            find.alive=0 
                        }
                        if(find.maxAlive<=find.alive){
                            find.maxAlive=find.alive
                        }
                        if(find.maxLvl<=xp){
                            find.maxLvl=xp
                        }
                        if(find.maxScore<=score){
                            find.maxScore=score
                        }
                        find.score=score
                        find.lvl=xp
                    }
                    find.Allseconds+=players[keys[i]].online
                    find.Weekseconds+=players[keys[i]].online
                    find.dayseconds+=players[keys[i]].online
                    await find.save()
                }else{
                    players[keys[i]].xp=xp
                    players[keys[i]].score
                    user.create({mineNick:keys[i],Allseconds:players[keys[i]].online,Weekseconds:players[keys[i]].online,dayseconds:players[keys[i]].online,maxLvl:xp,lvl:xp,maxScore:score,score:score,maxAlive:players[keys[i]].online,alive:players[keys[i]].online})
                }
            }catch(e){
                if(find){
                    find.Allseconds+=players[keys[i]].online
                    find.Weekseconds+=players[keys[i]].online
                    find.dayseconds+=players[keys[i]].online
                    await find.save()
                }else{
                    players[keys[i]].xp=xp
                    players[keys[i]].score
                    user.create({mineNick:keys[i],Allseconds:players[keys[i]].online,Weekseconds:players[keys[i]].online,dayseconds:players[keys[i]].online,maxAlive:players[keys[i]].online,alive:players[keys[i]].online})
                }
            }
        }
        players={}
    },60000*(process.env.RANKING_TIME_UPDATE|1.5))
}}