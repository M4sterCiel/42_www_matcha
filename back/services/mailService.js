let nodemailer = require("nodemailer");

module.exports = {
    registerMail: (mail, username, link) => {
        var message     = "Bienvenue " + username + ", \n\
        Nous sommes très heureux de vous confirmer votre inscription sur Matcha.\
        Toute l’équipe Matcha vous remercie de votre confiance et vous souhaite la bienvenue.\
        \n\
        Afin de commencer votre expérience sur Matcha, merci de bien vouloir valider votre inscription en cliquant sur le lien suivant :\n" + link + "\n\
        A bientôt sur Matcha.";

        let transporter = nodemailer.createTransport({
            sendmail: true,
            newline: 'unix',
            path: '/usr/sbin/sendmail'
        });
        transporter.sendMail({
            from: 'registration@matcha.com',
            to: mail,
            subject: "Welcome to Matcha",
            text: message,
            contentType: "text/html"
        }, (err, info) => {
            //console.log(info.envelope);
        });
    }
}