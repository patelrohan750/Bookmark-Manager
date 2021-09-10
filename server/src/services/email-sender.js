const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendMail = async(email,subject,text,html) => {
    try {
        const msg = {
            to:email,
            from: process.env.APP_HOST_EMAIL,
            subject,
            text,
            html,
        }
        await sgMail.send(msg);
        console.log("MAIL SENT");

    } catch (e) {
        console.log("ERROR_MAILING",e.message);
    }
}

module.exports=sendMail;