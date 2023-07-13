const express = require('express');
const nodemailer = require('nodemailer')
require('dotenv').config();
const {connection} = require('./config/db');
const { loginRouter } = require('./routes/login.route');
const { signUpRouter } = require('./routes/signup.route');
const app = express();

app.use(express.json())


app.get('/',(req,res)=>{
    res.send({msg:'this is your base route'})
})

app.use('/signup',signUpRouter);
app.use("/login", loginRouter);














app.listen(process.env.port,async()=>{
    try {
        await connection
    } catch (error) {
        console.log(error);
    }
    console.log('app is runnning on port',8080);
})