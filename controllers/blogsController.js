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

// Verify SMTP connection (VERY IMPORTANT for debugging)
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP ERROR:', error);
  } else {
    console.log('SMTP ready');
  }
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

    const blogResult = await blogsModel.getBlogById(id);

    if (!blogResult.rows.length) {
      return res.status(404).json({ error: 'Blog not found.' });
    }

    const blog = blogResult.rows[0];

    if (!process.env.ADMIN_EMAIL) {
      return res.status(500).json({
        error: 'Admin email not configured.',
      });
    }

    const info = await transporter.sendMail({
      from: `"Ed Advisory Website" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: process.env.EMAIL_USER,

      subject: `New Blog Comment - ${blog.title}`,

      text: `
New Blog Comment

Blog: ${blog.title}
Blog ID: ${blog.id}
URL: ${pageUrl || 'N/A'}

Comment:
${comment}
      `,

      html: `
        <div style="font-family: Arial;">
          <h2>New Blog Comment</h2>
          <p><strong>Blog:</strong> ${escapeHtml(blog.title)}</p>
          <p><strong>Blog ID:</strong> ${blog.id}</p>
          ${pageUrl ? `<p><strong>URL:</strong> ${escapeHtml(pageUrl)}</p>` : ''}

          <hr />

          <p><strong>Comment:</strong></p>
          <div style="background:#f5f5f5; padding:10px; border-radius:8px;">
            ${escapeHtml(comment)}
          </div>
        </div>
      `,
    });

    console.log('Email sent:', info.messageId);

    return res.status(200).json({
      message: 'Comment submitted successfully.',
    });

  } catch (error) {
    console.error('COMMENT ERROR:', error);

    return res.status(500).json({
      error: 'Failed to submit comment. Please try again later.',
    });
  }
};

module.exports = { submitComment };
