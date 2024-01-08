console.log("Inside user");
const UserModel = require("../models/userModel");
async function profileController(req,res){
    // user profile ko show karna
    try{
        const userId = req.userId;
        let user = await UserModel.findById(userId);
        res.json({
            data:user,
            message:"Data about logged in user is sent."
        })
    }catch(err){
        res.send("err",err);
    }
}


async function getAllUsersController(req,res){
    try{
        let users = await UserModel.find();
        res.json({
            users
        });
    }catch(err){
        res.send("err",err);
    }
}

module.exports= {
    profileController,
    getAllUsersController
}