import nodemailer from 'nodemailer'

const trasporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

function emailConfirmation (req, confirmationCode){
    const mailOption = {
        from: process.env.EMAIL_ADDRESS,
        to: req.body.email,
        subject: "H2H- Please confirm your account",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${req.body.firstName}</h2>
        <p>Thank you for sign up to our H2H website. Please confirm your email by clicking on the following link</p>
        <a href=${process.env.USED_URL}/${confirmationCode}> Click here</a>
        </div>`,
    };
    trasporter.sendMail(mailOption, (error, info)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log("email sent: ", info.response);
        }
    });
}

export default {emailConfirmation}