const nodemailer = require('nodemailer');
const blogsModel = require('../models/blogsModel');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function escapeHtml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const submitComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, pageUrl } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Blog ID is required.' });
    }

    if (!comment || !comment.trim()) {
      return res.status(400).json({ error: 'Comment is required.' });
    }

    const trimmedComment = comment.trim();

    if (trimmedComment.length > 3000) {
      return res.status(400).json({ error: 'Comment is too long.' });
    }

    const blogResult = await blogsModel.getBlogById(id);

    if (!blogResult.rows.length) {
      return res.status(404).json({ error: 'Blog not found.' });
    }

    const blog = blogResult.rows[0];

    // For testing, if COMMENT_RECEIVER is set, use it.
    // Later you can change it to ADMIN_EMAIL in .env only.
    const receiverEmail = process.env.COMMENT_RECEIVER || process.env.ADMIN_EMAIL;

    if (!receiverEmail) {
      return res.status(500).json({ error: 'Comment receiver email is not configured.' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: receiverEmail,
      subject: `Test Blog Comment - ${blog.title || `Blog #${id}`}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
          <h2>New Blog Comment Received</h2>
          <p><strong>Blog ID:</strong> ${escapeHtml(String(blog.id))}</p>
          <p><strong>Blog Title:</strong> ${escapeHtml(blog.title || '')}</p>
          <p><strong>Author:</strong> ${escapeHtml(blog.author || 'N/A')}</p>
          <p><strong>Publish Date:</strong> ${escapeHtml(blog.publish_date ? new Date(blog.publish_date).toISOString() : 'N/A')}</p>
          ${
            pageUrl
              ? `<p><strong>Page URL:</strong> ${escapeHtml(pageUrl)}</p>`
              : ''
          }
          <hr />
          <p><strong>Comment:</strong></p>
          <div style="white-space: pre-wrap; border: 1px solid #ddd; padding: 12px; border-radius: 8px; background: #f9f9f9;">
            ${escapeHtml(trimmedComment)}
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: 'Your comment has been submitted successfully.',
    });
  } catch (error) {
    console.error('Error submitting blog comment:', error);
    return res.status(500).json({
      error: 'Failed to submit comment. Please try again later.',
    });
  }
};

module.exports = { submitComment };
