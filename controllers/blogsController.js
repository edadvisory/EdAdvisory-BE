const blogsModel = require('../models/blogsModel');

const getBlogs = async (req, res) => {
  try {
    const result = await blogsModel.getAllBlogs();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

const getBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await blogsModel.getBlogById(id);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
};

module.exports = { getBlogs, getBlog };
