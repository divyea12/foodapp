//user-> (schema->set of features that a certain group should follow)
//  :name,email,passwd,phone number,address,pic

// use mongo db and mongoose to connect db to app

const mongoose = require('mongoose');

// userSchema-> name email password confirm password

let planSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"kindly pass the name"],
        unique:[true,"plan should be unique"]
    },
    price:{
        type:Number,
        required:[true,"kindly pass a price"]
    },
    duration:{
        type:Number,
        required:[true,"kindly pass the duration"]  
    },
    discount:{
        type:Number,
        validate:{
            validator:function(){
                return this.discount<this.price
            },
            message:"Discount must be less than the actual price"
        }
    },
    reviews: {
        type:[mongoose.Schema.ObjectId],
        ref:"FoodreviewModel"
    },
    averageRating:{
        type:Number
    }
})

const FoodPlanModel  = mongoose.model('FoodPlanModel',planSchema);
module.exports = FoodPlanModel;  

// store values in db
