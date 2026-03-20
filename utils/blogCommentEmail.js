const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000,
});

const sendBlogCommentEmail = async ({ blogId, blogTitle, pageUrl, comment }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `Ed Advisory - New Blog Comment on "${blogTitle}"`,
    text: `You have received a new blog comment.

Blog Title: ${blogTitle}
Blog ID: ${blogId}
URL: ${pageUrl || 'N/A'}

Comment:
${comment}
`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
        <h2>New Blog Comment</h2>
        <p><strong>Blog Title:</strong> ${blogTitle}</p>
        <p><strong>Blog ID:</strong> ${blogId}</p>
        <p><strong>URL:</strong> ${pageUrl || 'N/A'}</p>
        <hr />
        <p><strong>Comment:</strong></p>
        <div style="background:#f5f5f5; padding:12px; border-radius:8px; white-space:pre-wrap;">
          ${comment}
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending blog comment email:', error);
    throw new Error('Failed to send blog comment email');
  }
};

module.exports = sendBlogCommentEmail;
