const express = require('express')
const twilio = require('twilio');

const {UserModel} = require('../model/User.model');

const accountSid = process.env.twiloid;
const authToken = process.env.twiliopass;
const client =  new twilio(accountSid,authToken)



const signUpRouter = express.Router()
signUpRouter.post('/',async(req, res) => {
  const { name, phoneNo, email } = req.body;
  if(!name || !phoneNo || !email) return  res.send({err:'provide all details'});
  
  const userPresent = await UserModel.findOne({email});
  if(userPresent) return  res.send({err:'try loggin in User already present'});
try {
    const code = Math.floor(10000 + Math.random() * 500000);
    // urlWithLink = `http://locahost:8080/signup/verify?tokennumber=${code}`;
    sendVerficationMailCode(name, email, code);
    sendVerficationPhoneCode(name,phoneNo,code)
    send
    let last5dgt  = phoneNo + "".split('').reverse()
    let password = name
    for(let i = 4 ; i<=0 ; i--){
        password+=last5dgt[i];
    }
    
    const user = new UserModel({
      name,
      email,
      password,
      isVerified: false,
      userId: phoneNo,
      isVerified: false,
      verifycode:code
    });
    res.send({
      msg: "sign-up successfull! Please check your email... before you login",
    });


} catch (error) {
    console.log(error);
    return res.send({err:error.message})
}
  
})

signUpRouter.get('/verify',async(req,res)=>{
    let code = req.query.code;
    let user = UserModel.find({ verifycode:code });
    if(!user) return res.send({msg:'verification failed'});
    try {
        let result  = await UserModel.findByIdAndUpdate(user._id,{isVerified:true});
        res.send({msg:"user Verified sucessfully"})
    } catch (error) {
        console.log(error);
        return res.send({err:error.message})
    }
})















function sendVerficationMailCode(name, email, verificationCode) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bhiapatil@gmail.com",
      pass: "sdfsd",
    },
  });
  const mailOptions = {
    from: "bhiapatil@gmail.com",
    to: email,
    subject: "Account Verification!",
    text: `Hi ${name}, your verification code is ${verificationCode}.`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log("Email sent :" + info.response);
  });
}

function sendVerficationPhoneCode(name,phoneno,verificationCode){
    client.messages.create({
        body:`Hellow ${name} ,this is the verification code for node assignment:${verificationCode}`,
        from:'+917498241136',
        to:phoneno
    }).then(msg=>{
        console.log(msg.sid)
    }).catch(err=>console.error(err))
}




module.exports = {
    signUpRouter
}