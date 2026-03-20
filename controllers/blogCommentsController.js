const sendBlogCommentEmail = require('../utils/blogCommentEmail');

const submitComment = async (req, res) => {
  const { blogId, blogTitle, pageUrl, comment } = req.body;

  try {
    if (!blogId || !String(blogId).trim()) {
      return res.status(400).json({ error: 'Blog ID is required.' });
    }

    if (!blogTitle || !blogTitle.trim()) {
      return res.status(400).json({ error: 'Blog title is required.' });
    }

    if (!comment || !comment.trim()) {
      return res.status(400).json({ error: 'Comment is required.' });
    }

    await sendBlogCommentEmail({
      blogId: String(blogId).trim(),
      blogTitle: blogTitle.trim(),
      pageUrl: pageUrl ? pageUrl.trim() : '',
      comment: comment.trim(),
    });

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
