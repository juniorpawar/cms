import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from "bcryptjs";


export const sendEmail = async ({ email, emailType, userId }) => {
    try {

        const hashedtoken = await bcryptjs.hash(userId.toString(), 10)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(
                userId,
                {
                    verifyToken: hashedtoken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(
                userId,
                {
                    forgotPasswordToken: hashedtoken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "yuvrajsingh3641@gmail.com",
                pass: "123456",
            },
        });

        const mailOptions = {
            from: 'yuvraj@yuvraj.ai',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // subject line
            text: "this is a test email form verify singh pawar", // plain‑text body
            html: '<p>Click to go to the verigy page <a href=`${process.env.NEXT_PUBLIC_URL}`>here</a></p>', // HTML body
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (err) {
        console.log("Node Mailer says - tere was an error in sending mail");
        console.log(err);
    }
}