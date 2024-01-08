const express = require('express');
const app = express();


//middleware
app.use(express.json());// inbuilt middleware
// userdefined middleware
app.use(function(req,res,next){
    console.log("I ran");
    next();
    // ud ke lie next call karna padta hai
})
app.post("/sayhello",function(req,res) {
    console.log("data",req.body);
    res.send("post hello");
})

app.listen(3001,function(){
    console.log("server started");
})