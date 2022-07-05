const nodeMailer = require("nodemailer");
require("dotenv/config")

const sendMail = async (email, subject, text) => {
    
    let obj = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMPT_PASSWORD
        },
        to: email,
        subject,
        text
    }
    console.log(obj)
    const transport = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMPT_PASSWORD
        }
    });

    await transport.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject,
        text
    });
}

module.exports = sendMail;