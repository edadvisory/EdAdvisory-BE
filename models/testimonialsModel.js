const pool = require('../config/db');

// Create a new testimonial
const createTestimonial = async (name, institute, program, message) => {
  const query = 'INSERT INTO testimonials(name, institute, program, message) VALUES($1, $2, $3, $4) RETURNING *';
  const values = [name, institute, program, message];
  return pool.query(query, values);
};

// Get all testimonials
const getAllTestimonials = async () => {
  const query = 'SELECT * FROM testimonials ORDER BY id';
  return pool.query(query);
};

module.exports = { createTestimonial, getAllTestimonials };
