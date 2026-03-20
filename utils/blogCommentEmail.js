const { Resend } = require('resend');
const dotenv = require('dotenv');

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendBlogCommentEmail = async ({ blogId, blogTitle, pageUrl, comment }) => {
  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) {
    throw new Error('Missing email environment variables.');
  }

  const { error } = await resend.emails.send({
    from: 'Ed Advisory <onboarding@resend.dev>',
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
  });

  if (error) {
    console.error('Error sending blog comment email via Resend:', error);
    throw new Error('Failed to send blog comment email');
  }
};

module.exports = sendBlogCommentEmail;
