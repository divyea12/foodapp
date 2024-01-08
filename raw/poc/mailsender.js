console.log("Inside nodemailer");
const nodemailer = require("nodemailer");
const APPEMAIL = process.env.APPEMAIL||require("../../activity/secrets").APPEMAIL;
const APPPASSWORD = process.env.APPPASSWORD||require("../../activity/secrets").APPPASSWORD;
// async..await is not allowed in global scope, must use a wrapper
async function mailSender(email,otp) {
    //input-> through which mechanism email will be sent.(gmail,port,etc);
    const transporter = nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        secure: true,
        auth: {
        user: APPEMAIL,
        pass: APPPASSWORD
    },
  });

  let token = "smskam";
  
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Hello dog✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<b>Hello.
        le token ${otp};
    </b>`, // html body
  });

}

// mailSender().catch(console.error)
// .then(function(){
//     console.log("mail sent succesfully");
// });
module.exports = mailSender;