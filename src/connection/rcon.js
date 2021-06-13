const {Rcon} = require("rcon-client");
let rcon
module.exports={rcon:rcon,recon:async()=>await Rcon.connect({
    host: process.env.RCON_HOST, port: Number(process.env.RCON_PORT) | 25575, password: process.env.RCON_PASSWORD
})}