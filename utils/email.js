const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000,
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (firstName, lastName, email, message) => {
  const name =
    lastName && lastName.trim() ? `${firstName} ${lastName}` : firstName;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: process.env.ADMIN_EMAIL,
    subject: `Ed Advisory - Contact Form Submission By ${name}`,
    text: `You have a new contact form submission:

Name: ${name}
Email: ${email}

Message:
${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
