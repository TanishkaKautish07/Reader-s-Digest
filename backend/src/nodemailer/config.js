const nodemailer = require("nodemailer");

const mailConfig = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shivneeraj2004@gmail.com",
    pass: "qthluoqjgjjzalqr",
  },
});

module.exports = {
  mailConfig,
};
