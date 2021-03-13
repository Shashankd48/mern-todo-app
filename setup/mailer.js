const nodemailer = require("nodemailer");
const myKey = require("../setup/config");
const mailer = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 587,
   secure: false, // true for 465, false for other ports
   auth: {
      user: myKey.email, // generated ethereal user
      pass: myKey.password, // generated ethereal password
   },
});

module.exports = mailer;
