const blogsModel = require('../models/blogsModel');
const sendBlogCommentEmail = require('../utils/blogCommentEmail');

const submitComment = async (req, res) => {
  const { id } = req.params;
  const { comment, pageUrl } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ error: 'Blog ID is required.' });
    }

    if (!comment || !comment.trim()) {
      return res.status(400).json({ error: 'Comment is required.' });
    }

    const trimmedComment = comment.trim();

    const blogResult = await blogsModel.getBlogById(id);

    if (!blogResult.rows.length) {
      return res.status(404).json({ error: 'Blog not found.' });
    }

    const blog = blogResult.rows[0];

    await sendBlogCommentEmail({
      blogId: blog.id,
      blogTitle: blog.title,
      pageUrl,
      comment: trimmedComment,
    });

    console.log('Blog comment submitted. Email sent successfully to admin.');

    return res.status(200).json({
      message: 'Comment submitted successfully.',
    });
  } catch (error) {
    console.error('Error handling blog comment submission:', error);
    return res.status(500).json({
      error: 'Failed to submit comment. Please try again later.',
    });
  }
};

module.exports = { submitComment };
