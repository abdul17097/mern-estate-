const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./router/user_route');
dotenv.config();
const app = express();

mongoose
    .connect(process.env.MONGO)
    .then(()=>{
        console.log("Connected to Mongo");
    })
    .catch((err)=>{
        console.log(err);
    })

app.use('/api/user', routes)

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})