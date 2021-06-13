require('dotenv').config()
const {Rcon} = require("rcon-client");
let rcon=async()=>{
    //console.log(process.env)
    return await Rcon.connect({
    host: process.env.RCON_HOST, port: Number(process.env.RCON_PORT), password: process.env.RCON_PASSWORD
})}
rcon()