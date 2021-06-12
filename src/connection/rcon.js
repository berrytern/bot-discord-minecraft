const {Rcon} = require("rcon-client");
let rcon
module.exports={rcon:rcon,recon:async()=>await Rcon.connect({
    host: "localhost", port: 25575, password: "33109966"
})}