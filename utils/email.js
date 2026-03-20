const { Resend } = require('resend');
const dotenv = require('dotenv');

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (firstName, lastName, email, message) => {
  const name =
    lastName && lastName.trim() ? `${firstName} ${lastName}` : firstName;

  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) {
    throw new Error('Missing email environment variables.');
  }

  const { error } = await resend.emails.send({
    from: 'Ed Advisory <onboarding@resend.dev>',
    to: process.env.ADMIN_EMAIL,
    reply_to: email,
    subject: `Ed Advisory - Contact Form Submission By ${name}`,
    text: `You have a new contact form submission:

Name: ${name}
Email: ${email}

Message:
${message}`,
  });

  if (error) {
    console.error('Error sending contact email via Resend:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
