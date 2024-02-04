const { createMailTransporter } = require("./createMailTransporter");

const resendEmailConfirmation = (req, user, res) => {
  const transporter = createMailTransporter();
  // const code = user.generateConfirmationCode();
  const token = user.confirmation_token
 console.log(token)
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Verify your account",
    text: "code",
    html: `
    
    <div style="color: black">

    Dear ${user.username}, <br>
    
    Thank you for creating an account with our service. To complete the registration process and verify your account, <br> please click on the following button:
    <br>
    
    
    <a href="${req.protocol}://${req.get("host")}${
      req.originalUrl
    }/confirmation/${token}" style="text-decoration: none;">
    <button style="background-color: #4CAF50; color: white; padding: 8px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 15px; margin: 4px 5px; cursor: pointer; border: none; border-radius: 5px;">Verify Now</button>
</a>
     
    <br>
    If you cannot click on the link, you can copy and paste it into your web browser's address bar.
    <br>
    ${req.protocol}://${req.get("host")}${req.originalUrl}/confirmation/${token}
    <br>
    If you did not create an account or did not request this verification, please ignore this email.  <br> <br>
    
    Best regards, <br>  
    Ghuronti
    </div>
    

`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("from send error", error);
    } else {
      res.send("Check and verify your email.");
      console.log("Check and verify your email.");
    }
  });
};
module.exports = { resendEmailConfirmation: resendEmailConfirmation };
