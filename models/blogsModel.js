const pool = require('../config/db');

const getAllBlogs = async () => {
  const query = `
    SELECT id, title, author, publish_date, content
    FROM blogs
    ORDER BY publish_date DESC, id DESC
  `;
  return pool.query(query);
};

const getBlogById = async (id) => {
  const query = `
    SELECT id, title, author, publish_date, content
    FROM blogs
    WHERE id = $1
    LIMIT 1
  `;
  return pool.query(query, [id]);
};

module.exports = { getAllBlogs, getBlogById };
