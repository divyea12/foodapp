const express = require('express');
const app = express();// app is server itself
// get data from say hello and say bye ( ROute + CRUD );

app.use(express.json());

app.get("/sayhello",function(req,res){
   //Frontend ko response
    res.end("hello");
})
app.get("/saybye",function(req,res){
    //Frontend ko response
    res.end("bye");
})

// post data

app.post("/sayhello",function(req,res){
    console.log("data",req.body);
    res.end("post hello ");
})

//template route

app.get("/getsquare/:num",function(req,res){
    console.log("param is ",req.params.num);
    res.end(req.params.num*req.params.num+" ");
})

//patch
app.patch("/sayhello",function(req,res){
    console.log("data",req.body);
    res.end("patch hello");
})
app.delete("/sayhello",function(req,res){
    console.log("data",req.body);
    res.end("delete hello");
})


app.listen(3000,function(){
    console.log("server started at port 3000");
})