let nodemailer = require("nodemailer");

module.exports = {
  registerMail: (mail, username, link) => {
    var message =
      "Hi " +
      username +
      ", \n\
        We have received your registration on Matcha.\
        We hope you will find what you are looking for on our platform.\
        \n\
        To get started on Matcha, please make sure to validate the following link:\n" +
      link +
      "\n\
        See you soon on Matcha.";

    let transporter = nodemailer.createTransport({
      sendmail: true,
      newline: "unix",
      path: "/usr/sbin/sendmail"
    });
    transporter.sendMail(
      {
        from: "registration@matcha.com",
        to: mail,
        subject: "Welcome to Matcha",
        text: message,
        contentType: "text/html"
      },
      (err, info) => {
        //console.log(info.envelope);
      }
    );
  },

  forgotPasswordMail: (mail, username, link) => {
    var message =
      "Hi " +
      username +
      ", \n\
        We have received your password reset request on Matcha.\
        Don't worry we got you covered ;)\
        \n\
        To reset your password on Matcha, please visit the following link:\n" +
      link +
      "\n\
        See you soon on Matcha.";

    let transporter = nodemailer.createTransport({
      sendmail: true,
      newline: "unix",
      path: "/usr/sbin/sendmail"
    });
    transporter.sendMail(
      {
        from: "noreply@matcha.com",
        to: mail,
        subject: "Matcha - Reset password",
        text: message,
        contentType: "text/html"
      },
      (err, info) => {
        //console.log(info.envelope);
      }
    );
  }
};
