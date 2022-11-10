import { createTransport } from 'nodemailer';
import * as dotenv from "dotenv"

dotenv.config()

const transporter = createTransport({
  host: process.env.SMPT_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMPT_PASSWORD
  },
});

function emailConfirmation (req, confirmationCode){
    const mailOption = {
        from: process.env.EMAIL_ADDRESS,
        to: req.body.email,
        subject: "H2H- Please confirm your account",
    };
    console.log(process.env.USED_URL);
    if(process.env.USED_URL ==="localhost:8080"){
        mailOption.html = `<h1>Email Confirmation</h1>
        <h2>Hello ${req.body.firstName}</h2>
        <p>Thank you for sign up to our H2H website. Please confirm your email by clicking on the following link</p>
        <a href=http://${process.env.USED_URL}/confirm/${confirmationCode}> Click here</a>
        </div>`
    }
    else{
        mailOption.html = `<h1>Email Confirmation</h1>
        <h2>Hello ${req.body.firstName}</h2>
        <p>Thank you for sign up to our H2H website. Please confirm your email by clicking on the following link</p>
        <a href=https://${process.env.USED_URL}/confirm/${confirmationCode}> Click here</a>
        </div>`
    }
    transporter.sendMail(mailOption, (error, info)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log("email sent: ", info.response);
        }
    });
}

export default {emailConfirmation}