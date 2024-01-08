console.log("user");
const express = require("express");
const userRouter = express.Router();
const {profileController,getAllUsersController} =require('../controller/userController');
const{protectRoute} = require('../controller/authController');

userRouter.get("/profile",protectRoute,profileController);
userRouter.get("/profileevery",protectRoute,getAllUsersController);
module.exports = userRouter;
