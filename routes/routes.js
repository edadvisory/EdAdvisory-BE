const express = require('express');
const router = express.Router();

const testimonialsController = require('../controllers/testimonialsController');
const bookingsController = require('../controllers/bookingsController');
const contactController = require('../controllers/contactController');
const blogsController = require('../controllers/blogsController');
const blogCommentsController = require('../controllers/blogCommentsController');

// Testimonials routes
router.post('/testimonials', testimonialsController.upload.single('profilePicture'), testimonialsController.createTestimonial);
router.get('/testimonials', testimonialsController.getAllTestimonials);

// Bookings routes
router.post('/bookings', bookingsController.createBooking);
router.get('/bookings', bookingsController.getAllBookings);

// Blogs routes
router.get('/blogs', blogsController.getBlogs);
router.get('/blogs/:id', blogsController.getBlog);

// Blog comments route
router.post('/blogs/:id/comments', blogCommentsController.submitComment);

// Handle contact form submission
router.post('/contact', contactController.handleContactForm);

module.exports = router;
