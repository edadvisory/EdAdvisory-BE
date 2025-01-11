const bookingsModel = require('../models/bookingsModel');

// Create a new booking
const createBooking = async (req, res) => {
  const { firstName, lastName, email, phoneNo } = req.body;
  
  try {
    const result = await bookingsModel.createBooking(firstName, lastName, email, phoneNo);
    console.log('Booking created successfully: ', result.rows[0]);
    res.status(201).json({ message: 'Booking created successfully', booking: result.rows[0] });
  } catch (error) {
    console.error('Error creating booking: ', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const result = await bookingsModel.getAllBookings();
    console.log('Bookings fetched successfully: ', result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

module.exports = { createBooking, getAllBookings };
