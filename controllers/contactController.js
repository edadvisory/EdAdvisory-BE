const sendEmail = require('../utils/email');

// Handle form submission and send an email
const handleContactForm = async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  try {
    // Send the email to the admin
    await sendEmail(firstName, lastName, email, message);
    console.log('Contact form submitted. Email sent successfully to the admin!');
    res.status(200).json({ message: 'Thank you for reaching out! We have received your message and will get back to you shortly.' });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
};

module.exports = { handleContactForm };
