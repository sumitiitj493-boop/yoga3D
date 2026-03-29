const nodemailer = require('nodemailer');

const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
};

const sendVerificationEmail = async ({ email, name, otp }) => {
    const transporter = createTransporter();
    const fromName = process.env.SMTP_FROM_NAME || 'Yoga 3D';
    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;

    await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: email,
        subject: 'Verify your Yoga 3D account',
        text: `Hello ${name}, your Yoga 3D verification code is ${otp}. It expires in 10 minutes.`,
        html: `
            <div style="font-family:Segoe UI,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1f2937;">
                <h2 style="margin:0 0 16px;color:#4f46e5;">Verify your Yoga 3D account</h2>
                <p style="margin:0 0 16px;">Hello ${name},</p>
                <p style="margin:0 0 16px;">Use this OTP to verify your email address:</p>
                <div style="font-size:32px;font-weight:700;letter-spacing:8px;background:#eef2ff;color:#312e81;padding:16px 20px;border-radius:12px;display:inline-block;">
                    ${otp}
                </div>
                <p style="margin:16px 0 0;">This code expires in 10 minutes.</p>
            </div>
        `
    });
};

module.exports = {
    sendVerificationEmail
};
