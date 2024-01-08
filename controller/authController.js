console.log("Inside auth");``
const jwt =  require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("../models/userModel");
const secrets =  require("../secrets");
const mailSender = require("../utilities/mailsender");
async function signupController(req,res){
    try{
        let data = req.body;
        console.log(data);
        let newUser = await UserModel.create(data);
        console.log(newUser);
        res.status(200).json({
            result:"user signed up"
        })
    }catch(err){
        res.status(500).json({err:err.message});
    }
}

async function loginController(req,res){
    try{
        let data = req.body;
        let {email,password} = data;
        if(email && password){
            let user = await UserModel.findOne({email});
            if(user){
                if(user.password==password){
                    const token = jwt.sign({
                        data:user["_id"],
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
                    },secrets.JWTSECRET);
                    res.cookie("JWT",token);
                    res.status(200).json({
                        data:user,
                        message:"user logged in"
                    })
                }else{
                    res.status(400).json({message:"Email/Password missmatch."});
                }
            }else{
                res.status(404).json({message:"User does not found. Please sign up first"});
            }
        }else{
            res.status(404).json({message:"Enter email and passwd both"});
        }
    }catch(err){
        res.status(500).json({
            err:err.message
        })
    }
}

async function resetPasswordController(req,res){
    try{
        let {otp,password,confirmPassword,email} = req.body;
        console.log(otp);
        let user = await UserModel.findOne({email});
        console.log(user.otp);
        let currentTime = Date.now();
        if(currentTime>user.otp_expiry){
            user.otp = undefined;
            user.otp_expiry = undefined;
            await user.save();
            res.send("otp expired");
        }else{
            if(user.otp!=otp){
                res.send("otp does not match. Please try again.");
            }else{
                user = await UserModel.findOneAndUpdate({otp},{password,confirmPassword},{runValidators:true,new:true},{otp:1,otp_expiry:1});
                console.log("before",user.otp);
                user.otp = undefined;
                console.log("after",user.otp);
                user.otp_expiry = undefined;
                await user.save();
                console.log("after",user.otp);
                console.log(user);
                res.json({
                    data:user,
                    message:"password resetted"
                })
            }
        } 
        console.log(user);
    }catch(err){
        res.send("err",err);
    }
}

async function forgetPasswordController(req,res){
    try{
        let { email } = req.body;
        let user = await UserModel.findOne({email});
        if( user ){
            let otp = otpGenerator();
            console.log("before");
            await mailSender(email,otp);
            console.log("after");
            user.otp = otp;
            user.otp_expiry = Date.now()+5*1000*60;
            await user.save();
            res.json({
                data:user,
                message:"otp sent to your email"
            })
            console.log(user);
        }else{
            res.send("First sign up please.")
        }
    }catch(err){
        res.send("err",err);
    }
}

function protectRoute(req,res,next){
    try{
        const cookies = req.cookies;
        const JWT = cookies.JWT;
        if(cookies.JWT){
            console.log("Protected route entered");
            let token = jwt.verify(JWT,secrets.JWTSECRET);
            let userId = token.data;
            req.userId = userId;
            next();
        }else{
            res.send("Sign up please");
        }
    }catch(err){
        res.send("err",err);
    }
}

function otpGenerator(){
    return Math.floor(100000 + Math.random() * 900000);
}


module.exports={
    signupController,
    loginController,
    forgetPasswordController,
    resetPasswordController,
    protectRoute
}
