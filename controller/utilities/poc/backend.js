const express = require("express");
const app = express();
const Razorpay = require("razorpay");
const shortId = require('shortid');
const secrets = require("./secret");
const crypto = require('crypto');//Encryption inbuilt module
const bodyParser = require('body-parser');
const instance = new Razorpay({
    key_id:secrets.KEY_ID,
    key_secret:secrets.KEY_SECRET
});

app.use(express.static("public"));
app.get("/checkout",function(req,res){
    const currency="INR";
    const amount = 50000;
    const planName = "MyfirstPlan"
    instance.orders.create({
        amount:amount,
        currency:currency,
        receipt:shortId.generate(),
        notes:{
            key1:planName
        }
    })
    res.status(200).json({
        currency:currency,
        amount:amount,
        product:planName
    })
})
app.use(bodyParser.json());

app.post("/verification",function(req,res){
    const secret = "Mysecret";
    console.log(req.body);
    if (!req.body) {
        return res.status(400).json({ message: "Invalid request body" });
    }
    //encrypt
    const buffer = Buffer.from(JSON.stringify(req.body));
    const shasum = crypto.createHmac("sha256",secret);
    shasum.update(buffer);
    const digest = shasum.digest("hex");

    if(digest===req.headers["x-razorpay-signature"]){
        console.log("reqeuest is legit");
        // payment is done
        res.status(200).json({
            message:"Ok",
            result:"added"
        })
    }else{
        // payment has failed
        res.status(403).json({message:"Invalid"});
    }
})

app.listen(3001,function(){
    console.log("statred");
})