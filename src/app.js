
    

const server=async()=>{
    require('./connection/database')
    await require('./services/rcon')()
    
}
module.exports= server