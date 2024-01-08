const express = require("express");
const reviewRouter = express.Router();
const {createReviewController,getAllReviewController} =require('../controller/reviewController');
const{protectRoute} = require('../controller/authController');

reviewRouter.post("/",createReviewController);
reviewRouter.get("/",getAllReviewController);
module.exports = reviewRouter;
