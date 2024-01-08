async function createReviewController(req,res){
    try{
        let reviewData = req.body;
        let review = await reviewModel.create(reviewData);
        let reviewId = review["_id"];
        let rating = review.rating;
        let currentPlan = await planModel.findById(review.plan);
        // average rating
        let preAvg = currentPlan.averageRating; 
        if(preAvg){
            currPlan.averageRating = (preAvg*currPlan.reviews.length + rating)/(currPlan.reviews.length+1);
        }else{
            currPlan.averageRating = rating;
        }
        currentPlan.reviews.push(reviewId);
        await currentPlan.save();     

        res.status(201).json({
            review,
            result:"created"
        })
    }catch(err){
        console.log("err",err.message);
        res.status(500).json({
            err:err.message
        })
    }
}

async function getAllReviewController(req,res){
    try{
        // ids of other collections documents to be imported in the collection
        let plans = await reviewModel.find()
        .populate({path:"user",select:"name pic phone_number"})
        .populate({path:"plan",select:"name price"});
        res.status(200).json({
            plans,
            result:"all results send"
        })
    }catch(err){
        res.status(500).json({
            err:err.message
        })
    }
}

module.exports ={
    createReviewController,
    getAllReviewController
}