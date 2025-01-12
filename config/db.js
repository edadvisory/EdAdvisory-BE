const { Pool } = require('pg'); // PostgreSQL
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create a PostgreSQL connection pool
// const pool = new Pool({
//     user: process.env.PG_USER,         // Database username
//     host: process.env.PG_HOST,         // Database host
//     database: process.env.PG_DATABASE, // Database name
//     password: process.env.PG_PASSWORD, // Database password
//     port: process.env.PG_PORT,         // Database port (default is 5432)
// });

// Create a PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// const connectDB = async () => {
//     try {
//         // Test the connection
//         await pool.connect();
//         console.log('PostgreSQL Connected');
//     } catch (error) {
//         console.error('Database connection failed:', error.message);
//         process.exit(1); // Exit the process with failure
//     }
// };

// module.exports = { connectDB, pool };
module.exports = pool;