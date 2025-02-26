import * as nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
    const { email } = await readBody(event);

    if (!email) {
        throw createError({ statusCode: 400, statusMessage: "Email is required" });
    }


    // Generate a magic link token (expires in 15 minutes)
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "15m" });

    const magicLink = `${process.env.BASE_URL}/auth/callback?token=${token}`;

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    console.log(JSON.stringify({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    }))

    // Send email
    await transporter.sendMail({
        from: `"Auth System" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Your Magic Login Link",
        text: `Click this link to log in: ${magicLink}`,
        html: `<p>Click <a href="${magicLink}">here</a> to log in.</p>`,
    });

    return { message: "Magic link sent!" };
});
