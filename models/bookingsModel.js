const pool = require('../config/db');

// Create a new booking
const createBooking = async (firstName, lastName, email, phoneNo) => {
  
  // If lastName is null or undefined, set it to null in the query
  const lastNameToInsert = (lastName === null || lastName === undefined) ? null : lastName;

  const query = 'INSERT INTO bookings(first_name, last_name, email, phone_no) VALUES($1, $2, $3, $4) RETURNING *';
  const values = [firstName, lastNameToInsert, email, phoneNo];
  return pool.query(query, values);
};

// Get all bookings
const getAllBookings = async () => {
  const query = 'SELECT * FROM bookings';
  return pool.query(query);
};

module.exports = { createBooking, getAllBookings };
