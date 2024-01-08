console.log("Inside plan");
const FoodPlanModel = require("../models/planModel");

async function getAllplansController(req,res){
    try{
        let plans = await FoodPlanModel.find()
        .populate("reviews");
        res.status(200).json({
            allPlans:plans
        })
    }catch(err){
        res.status(500).json({
            err:err.message
        })
    }
}

async function createPlanController(req,res){
    try{
        let planObjData = req.body;
        if(Object.keys(planObjData).length>0){
           let newPlan =  await FoodPlanModel.create(planObjData);
           console.log("plan controller",newPlan);
           res.status(201).json({
             result:"plan created",
             plan:newPlan
           });
        }else{
            res.status(404).json({
                result:"data is incomplete"
            })
        }
    }catch(err){
        res.status(500).json({
            err:err.message    
        })
     }
}

async function updatePlanController(req,res){
    try{
        let planUpdateObjData = req.body;
        console.log(planUpdateObjData);
        let id = req.params.planRoutes;
        console.log(id);
        if(Object.keys(planUpdateObjData).length>0){
            const updatedPlan=await FoodPlanModel.findByIdAndUpdate(id,planUpdateObjData,{
                runValidators:true,
                new:true
            })
            res.status(200).json({
                result:"Plan updated successfully",
                updatedPlan:updatedPlan
            })
            console.log(updatedPlan);
        }
        else{
            res.status(404).json({
                result:"Nothing to update"
            })
        }
    }catch(err){
        res.status(500).json({
            err:err.message
        })
    }
}

async function deletePlanController(req,res){
    try{
        let id = req.params.planRoutes;
        let plan = await FoodPlanModel.findByIdAndDelete(id);
        res.status(200).json({
            result:"the plan is deleted",
            plan:plan
        })
    }catch(err){
        res.status(500).json({
            err:err.message
        })
    }
}


async function getPlanController(req,res){
    try{
        let id = req.params.planRoutes;
        let plan = await FoodPlanModel.findById(id)
        .populate("reviews");
        res.status(200).json({
            result:"plan found",
            plan:plan
        })
    }catch(err){
        res.status(500).json({
            err:err.message
        })
    }
}

module.exports={
    getAllplansController,
    createPlanController,
    updatePlanController,
    deletePlanController,
    getPlanController
}