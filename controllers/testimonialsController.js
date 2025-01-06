const testimonialsModel = require('../models/testimonialsModel');

// Create a new testimonial
const createTestimonial = async (req, res) => {
  const { name, institute, program, message } = req.body;
  
  try {
    const result = await testimonialsModel.createTestimonial(name, institute, program, message);
    res.status(201).json({ message: 'Testimonial created successfully', testimonial: result.rows[0] });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
};

// Get all testimonials
const getAllTestimonials = async (req, res) => {
  try {
    const result = await testimonialsModel.getAllTestimonials();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
};

module.exports = { createTestimonial, getAllTestimonials };
