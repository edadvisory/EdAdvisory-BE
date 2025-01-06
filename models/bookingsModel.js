const pool = require('../config/db');

// Create a new booking
const createBooking = async (first_name, last_name, email, phone_no) => {
  const query = 'INSERT INTO bookings(first_name, last_name, email, phone_no) VALUES($1, $2, $3, $4) RETURNING *';
  const values = [first_name, last_name, email, phone_no];
  return pool.query(query, values);
};

// Get all bookings
const getAllBookings = async () => {
  const query = 'SELECT * FROM bookings';
  return pool.query(query);
};

module.exports = { createBooking, getAllBookings };
