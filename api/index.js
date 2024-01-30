const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./router/user_route');
const authRouter = require('./router/auth_route');
dotenv.config();
const app = express();
app.use(express.json());

mongoose
    .connect(process.env.MONGO)
    .then(()=>{
        console.log("Connected to Mongo");
    })
    .catch((err)=>{
        console.log(err);
    })

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter )
app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})