const transporter = require("../config/email");
const ContactMessage = require("../models/messageModel"); // << Add this

const sendContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.TO_EMAIL,
    subject: `New Contact Form Message from ${name}`,
    html: `
      <h3>Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    // 💾 Save to database
    await ContactMessage.create({ name, email, message });

    // 📧 Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: "Message sent & saved!" });
  } catch (error) {
    console.error("Error sending contact form:", error);
    return res.status(500).json({ success: false, message: "Failed to process request." });
  }
};

module.exports = { sendContactForm };
