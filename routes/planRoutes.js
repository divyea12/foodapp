console.log("plan");
const express = require("express");
const planRouter = express.Router();

const {getAllplansController,createPlanController,updatePlanController,
deletePlanController,getPlanController} = require("../controller/planController");

const {protectRoute} = require("../controller/authController");
     
planRouter.route("/")
.get(getAllplansController)
.post(createPlanController)
planRouter.route("/:planRoutes")
.patch(updatePlanController)
.delete(deletePlanController)
.get(getPlanController); 
module.exports = planRouter;
