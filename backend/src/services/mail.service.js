import SibApiV3Sdk from "sib-api-v3-sdk";
import { config } from "../configs/env.js";

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = config.BREVO_API_KEY;

const transactionalEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendContactMail = async ({ fullName, email, message }) => {

 try {

  const mailOptions = {
   sender: {
    email: config.BREVO_SENDER_EMAIL,
    name: "Portfolio Contact"
   },

   to: [
    {
     email: config.BREVO_SENDER_EMAIL
    }
   ],

   subject: "New Contact Form Message",

   htmlContent: `
<div style="font-family: Arial, sans-serif; background:#f6f6f6; padding:20px;">
  
  <div style="max-width:600px; margin:auto; background:#ffffff; padding:25px; border-radius:8px; border:1px solid #e5e5e5;">
    
    <h2 style="margin-top:0; color:#333;">📩 New Contact Message</h2>
    
    <p style="color:#555;">
      Someone submitted a message through your portfolio contact form.
    </p>

    <table style="width:100%; border-collapse:collapse; margin-top:15px;">
      <tr>
        <td style="padding:8px 0; font-weight:bold; color:#333;">Name</td>
        <td style="padding:8px 0; color:#555;">${fullName}</td>
      </tr>
      <tr>
        <td style="padding:8px 0; font-weight:bold; color:#333;">Email</td>
        <td style="padding:8px 0; color:#555;">${email}</td>
      </tr>
    </table>

    <div style="margin-top:20px;">
      <p style="font-weight:bold; color:#333;">Message</p>
      <div style="background:#f9f9f9; padding:15px; border-radius:6px; border:1px solid #eee; color:#444;">
        ${message}
      </div>
    </div>

    <hr style="margin:25px 0; border:none; border-top:1px solid #eee;">


  </div>

</div>
`
  };

  await transactionalEmailApi.sendTransacEmail(mailOptions);

 } catch (err) {
  console.log("CONTACT MAIL ERROR :", err);
  throw err;
 }

};