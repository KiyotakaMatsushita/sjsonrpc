const jsonrpc = require("../index").server();
const app = require("express")();
var bodyParser = require("body-parser");

app.use(bodyParser.json());

jsonrpc.addMethod("hello", function () {
    return "hello"
})

jsonrpc.addMethod("hello promise", function () {
    return new Promise((ok, ng) => {
        setTimeout(function () {
            ok("hello")
        }, 1000)
    })
})


jsonrpc.addMethod("hello params", function (params) {
    return params
})

jsonrpc.addMethod("error", function () {
    throw new Error("error")
})

app.post('/rpc', async function (req, res) {
    const result = await jsonrpc.execute(req.body);
    res.json(result);
})

app.get('/', async function (req, res) {
    res.json("hello");
})

app.listen(3000,  () => console.log('Example app listening on port 3000!'));