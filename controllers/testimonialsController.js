const testimonialsModel = require('../models/testimonialsModel');
const multer = require('multer');

// Set up Multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a new testimonial with an image
const createTestimonial = async (req, res) => {
  const { rating, name, serviceTaken, message } = req.body;
  const profilePicture = req.file ? req.file.buffer : null; // Convert image to buffer
  try {
      const result = await testimonialsModel.createTestimonial(rating, name, serviceTaken, message, profilePicture);
      console.log('Testimonial added successfully: ', result.rows[0]);
      res.status(201).json({ message: 'Review submitted successfully!', review: result.rows[0] });
  } catch (error) {
      console.error('Error creating testimonial:', error);
      res.status(500).json({ error: 'Failed to create testimonial' });
  }
};

// Get all testimonials
const getAllTestimonials = async (req, res) => {
  try {
    const result = await testimonialsModel.getAllTestimonials();
    
    // Convert `profile_picture` from Buffer to Base64
    const testimonials = result.rows.map(row => ({
      ...row,
      profile_picture: row.profile_picture ? row.profile_picture.toString('base64') : null
    }));

    console.log('Testimonials fetched successfully: ', testimonials);
    res.status(200).json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
};

module.exports = { createTestimonial, getAllTestimonials, upload };
