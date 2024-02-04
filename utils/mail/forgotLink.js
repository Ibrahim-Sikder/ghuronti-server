const { createMailTransporter } = require("./createMailTransporter");

const forgotPasswordLink = (req, user, res, token) => {
  const transporter = createMailTransporter();
 
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Reset your password",
    text: "code",
    html: `
    
    <div style="color: black">

    Dear ${user.username}, <br>
    
     To forget your password <br> please click on the following button:
    <br>
    
    
     <p style="fontSize: 25px">${token}</p>
     
   
    
    Best regards, <br>  
    Ghuronti
    </div>
    

`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("from send error", error);
      res.send(error)
    } else {
      res.send("Check your email.");
      console.log("Check and verify your email.");
    }
  });
};
module.exports = { forgotPasswordLink: forgotPasswordLink };
