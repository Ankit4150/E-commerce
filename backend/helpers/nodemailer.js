  

  const mailer=(email,otp)=>{
              let nodeMialer=require('nodemailer');
 let transporter=nodeMialer.createTransport({
    service:"gmail",
    port:578,
    secur:false,
    auth:{
        user:"user@gamil.com",
        pass:"8989"
    }
 });

 let mailOptions={
    form:"code@gail.com",
    to:"ram@ga",
    subject:"sending email using node.js ",
    text:"thank you sir "
 };

 transporter.sendMail(mailOptions,function(error,info){
    if(err){
        console.log(err);
    }else{
        console.log("Email sent"+ info.response)
    }
 })
  }



 