const nodemailer = require("nodemailer");
const { trusted } = require("mongoose");
const { htmlcontent } = require("./marketingemail");



const SendMail = async (email) => {

 

 const mymail='nikhillende9121@gmail.com'

  const mailOptions = {
    from: "foodunity.services@gmail.com",
    to: mymail,
    subject: `Status Changed for ${email} `,
    html: htmlcontent,
  };


  // Create Nodemailer transporter

  const transporter = nodemailer.createTransport({
    // Configure your email service provider settings here
    host: "smtp.gmail.com",
    port: 465,
    secure: trusted,
    service: "gmail",
    auth: {
      user: "foodunity.services@gmail.com",
      pass: "znqe ktoa bnsl mops",
    },
  });

  
  // Send email
  try{
    await transporter.sendMail(mailOptions);
    
    return console.log("mail sent");
  }catch(e){
 return console.log("error while sending mail", e);
  }

};

module.exports={SendMail}