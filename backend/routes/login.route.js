const express = require('express');
const {UserModel}  = require('../model/User.model')
const loginRouter = express.Router();

loginRouter.post('/',async(req,res)=>{
   const {email} =  req.body.email;
   if(!email) return res.send({err:"No email please provide credential"})
   try {
     let user = await UserModel.find({ email })
     if (!user) return res.send({ err: "please signUp first" });
     const code = Math.floor(10000 + Math.random() * 500000);
     urlWithLink = `http://locahost:8080/login/verify?tokennumber=${code}`;
     sendVerficationMailLink(name, email, urlWithLink);
    let updateduser = await UserModel.findByIdAndUpdate(user._id, {
      tokencode:code
    });
    return res.send({msg:"Verification link send sucessfully"})
   } catch (error) {
   }
})


loginRouter.get("/verify", async (req, res) => {
  let code = req.query.tokennumber;
  let user = UserModel.find({ tokencode: tokennumber });
  if (!user) return res.send({ msg: "verification failed" });
  try {
    // us verifiend 
    return res.send({msg:user})
  } catch (error) {
    console.log(error);
    return res.send({ err: error.message });
  }
});



function sendVerficationMailLink(name, email, link) {
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
    text: `Hi ${name}, your verification link is ${link}.`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log("Email sent :" + info.response);
  });
}
module.exports = {
    loginRouter
}