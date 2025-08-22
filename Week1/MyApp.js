const { error } = require("node:console");
const http = require("node:http");
const { url } = require("node:inspector");
const port = 3000
const server = http.createServer((req,res)=>{
    res.writeHead(404 , {"content-type" : "text/plain"})
    res.write(req.method)
    res.end(req.statusCode)
});


server.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
})

//event
server.on("error" , (error)=>{
    console.log("Error : " + error.message);
})


//request
server.on("request" , (req,res)=>{
    console.log("Request recieved" , "Header : " ,  req.headers.host ,"Method : ", req.method);
})