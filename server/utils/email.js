const nodemailer = require("nodemailer");

// Create a function to send password reset emails
const sendResetEmail = async (email, resetToken, firstName) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    }); // Reset link with token - pointing to frontend page
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Password Reset",
      html: `        <h1>Hello ${firstName},</h1>
        <p>We received a request to reset your password.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="padding: 10px 15px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>This link will expire in 15 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Thanks,</p>
        <p>The Team</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
};

module.exports = {
  sendResetEmail,
};
