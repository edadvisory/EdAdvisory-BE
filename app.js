const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration to only allow requests from your frontend domain
const corsOptions = {
  origin: 'https://edadvisory.co',  // Your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));  // Use the customized CORS settings
// app.use(cors());  // Allow requests from all origins
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Handle form data

// Routes
app.use('/api', routes);

app.get('/test', (req, res) => {
  res.send('Backend is working!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
