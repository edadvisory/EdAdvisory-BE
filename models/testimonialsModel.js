const pool = require('../config/db');

// Create a new testimonial
const createTestimonial = async (rating, name, serviceTaken, message, profilePicture) => {
  const query = `
      INSERT INTO testimonials (rating, name, service_taken, message, profile_picture) 
      VALUES($1, $2, $3, $4, $5) RETURNING *`;
  const values = [rating, name, serviceTaken, message, profilePicture];
  return pool.query(query, values);
};

// Get all testimonials
const getAllTestimonials = async () => {
  const query = 'SELECT * FROM testimonials ORDER BY id';
  return pool.query(query);
};

module.exports = { createTestimonial, getAllTestimonials };
