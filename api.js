const express = require('express');
const app = express();
// npm i cookie-parser and npm i jsonwebtoken 
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const planRouter = require('./routes/planRoutes');
const reviewRouter = require("./routes/reviewRoutes");
const secrets = require('./secrets');
const UserModel = require('./models/userModel');
const planModel = require('./models/planModel');
const reviewModel = require("./models/reviewModel");
// signup input: email,name,passed,phone number,pic,address,confirm passwd

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/plan",planRouter);
app.use("/api/v1/review",reviewRouter);

app.listen(process.env.PORT || 3000,function(){
    console.log("server started");
});
