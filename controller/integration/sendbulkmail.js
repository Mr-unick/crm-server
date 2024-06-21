const nodemailer = require("nodemailer");
const { trusted } = require("mongoose");
const { htmlcontent } = require("./marketingemail");

const SendBulkMail = async (arr) => {
 


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

  const SemBulkMails = async () => {
  arr.map(
      async (mail) => {
        await transporter.sendMail({
          from: "foodunity.services@gmail.com",
          to: mail,
          subject: `Status Of your Lead Has Changed`,
          html: htmlcontent,
        });
      }
    );
  };

  // Send email
  try {
    await SemBulkMails();
    return console.log("mail sent");
  } catch (e) {
    return console.log("error while sending mail", e);
  }
};

module.exports = { SendBulkMail };
