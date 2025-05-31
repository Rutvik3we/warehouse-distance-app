const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Define allowed origins
const allowedOrigins = [
  'http://localhost:4200',
  'https://4200-firebase-warehouse-distance-app-1748695554025.cluster-htdgsbmflbdmov5xrjithceibm.cloudworkstations.dev'
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) {
      callback(null, true);
      return;
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200,
  preflightContinue: false // This is important for handling preflight requests
};

// Enable CORS with options
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', (req, res) => {
  // Set CORS headers explicitly for preflight
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).send();
});

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/distance', async (req, res) => {
  // Set CORS headers for this endpoint specifically
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');

  try {
    const { origins, destinations, key } = req.query;
    
    if (!origins || !destinations || !key) {
      return res.status(400).json({ 
        error: 'Missing required parameters',
        details: { origins, destinations, key }
      });
    }

    console.log('Making request to Google Maps API...');
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${key}`
    );
    
    console.log('Received response from Google Maps API');
    res.json(response.data);
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    res.status(500).json({ 
      error: 'Failed to fetch distance data',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    details: err.message
  });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
  console.log(`Health check available at http://0.0.0.0:${port}/health`);
  console.log('Allowed origins:', allowedOrigins);
}); 