const endpoint = process.env.ENDPOINT || "http://localhost:3000/rpc";
const client = require("../index").client(endpoint);

client.send("hello").then(console.log)
client.send("synchello").then(console.log)
client.send("hello params", "this is params").then(console.log)
client.send("error").then(console.log)