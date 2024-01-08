//user-> (schema->set of features that a certain group should follow)
//  :name,email,passwd,phone number,address,pic

// use mongo db and mongoose to connect db to app

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://divyea:Abc123@cluster0.kuu2wrz.mongodb.net/?retryWrites=true&w=majority')
.then (function(){
    console.log("connected");
}).catch(function(err){
    console.log("error",err); 
})

// userSchema-> name email password confirm password

let UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone_number:{
        type:String,
        minLength:10,
        maxLength:10  
    },
    pic:{
        type:String,
        default:"pic.png"
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true,
        //custom validator
        validate:{
            validator:function(){
                return this.password ==this.confirmPassword;
            },
            message:"password missmatch"
        }
    },
    otp:{
        type:String
    },
    otp_expiry:{
        type:Date
    },
    address:{
        type:String,
    }

})

const UserModel  = mongoose.model('FoodUser',UserSchema);
module.exports = UserModel; 

// store values in db
