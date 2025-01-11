// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');

// dotenv.config();

// const sendEmail = async (firstName, lastName, email, message) => {
//   // Create a transporter using your email service configuration
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',  // You can change this to your preferred email service
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   // Email options
//   const mailOptions = {
//     from: email,  // Sender's email address
//     to: process.env.ADMIN_EMAIL,  // Receiver's email address (Admin's email)
//     subject: `Ed Advisory - Contact Form Submission By ${firstName} ${lastName}`,
//     text: `You have a new contact form submission:\n\nName: ${firstName} ${lastName}\n\nEmail: ${email}\n\nMessage:\n\n${message}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw new Error('Failed to send email');
//   }
// };

// module.exports = sendEmail;

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const sendEmail = async (firstName, lastName, email, message) => {
  // Create a transporter using your email service configuration
  const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net', // GoDaddy SMTP server
    port: 465, // SSL port for SMTP
    secure: true, // Use SSL
    auth: {
      user: process.env.EMAIL_USER,  // Your email address (support@edadvisory.co)
      pass: process.env.EMAIL_PASS,  // Your email password
    },
  });

  const name = (lastName && lastName.trim()) ? `${firstName} ${lastName}` : firstName;

  // Email options
  const mailOptions = {
    from: email,  // Sender's email address
    to: process.env.ADMIN_EMAIL,  // Receiver's email address (Admin's email)
    subject: `Ed Advisory - Contact Form Submission By ${name}`,
    text: `You have a new contact form submission:\n\nName: ${name}\n\nEmail: ${email}\n\nMessage:\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;

