import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, reset_link: string) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.node_env === "production", // true for port 465, false for other ports
        auth: {
            user: "studentemam@gmail.com",
            pass: "mgck ppwe orru vblw",
        },
    });

    await transporter.sendMail({
        from: 'studentemam@gmail.com', // sender address
        to: to, // list of receivers
        subject: "Reset Your Password", // Subject line
        text: "Please change your password", // plain text body
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f7;
              margin: 0;
              padding: 0;
              line-height: 1.6;
              color: #333;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header {
              background: #007bff;
              color: #ffffff;
              padding: 20px;
              text-align: center;
              font-size: 24px;
              font-weight: bold;
            }
            .content {
              padding: 20px;
            }
            .content h2 {
              margin-top: 0;
              font-size: 20px;
              color: #007bff;
            }
            .content p {
              margin: 10px 0;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              margin-top: 20px;
              background: #007bff;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            }
            .button:hover {
              background:rgb(15, 118, 227);
            }
            .footer {
              text-align: center;
              padding: 10px;
              font-size: 12px;
              color: #777;
            }
            .footer a {
              color: #007bff;
              text-decoration: none;
            }
            .footer a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">Reset Your Password</div>
            <div class="content">
              <h2>Hello,</h2>
              <p>You recently requested to reset your password for your account. Click the button below to reset it:</p>
              <a href=${reset_link} class="button">Reset Password</a>
              <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
              <p>Thanks,<br>Customer Support Team</p>
            </div>
            <div class="footer">
              <p>If the button above does not work, paste this link into your browser:</p>
              <a href=${reset_link}>${reset_link}</a>
              <p>&copy; 2024 Dreams General Hospital & Diagonistic Center. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
        `,
    })


}

