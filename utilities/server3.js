const express = require('express');
const app = express();

app.use(express.json());

app.post("/simple",function bodyChecker(req,res,next){
    let data = req.body;
    let length = Object.keys(data).length;
    if(length==0){
        res.end("No data entered in the body");
    }else{
        next();
    }
})
app.post("/simple",function(req,res){
    console.log("data",req.body);
    res.send("post hello");
})
app.listen(3000,function(){
    console.log("server started at port 3000");
})

// middleware are the functions that modify the request and response cycles