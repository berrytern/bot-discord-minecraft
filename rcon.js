const  {Rcon} = require("rcon-client")
 
let test = async()=>{
const rcon = await Rcon.connect({
    host: "localhost", port: 25575, password: "33109966"
})
 
console.log(await rcon.send("list"))
    rcon.end()
}
test()