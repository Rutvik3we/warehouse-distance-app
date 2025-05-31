const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Define allowed origins
const allowedOrigins = [
  'http://localhost:4200',
  'http://localhost:3000',
  'https://4200-firebase-warehouse-distance-app-1748695554025.cluster-htdgsbmflbdmov5xrjithceibm.cloudworkstations.dev',
  'https://3000-firebase-warehouse-distance-app-1748695554025.cluster-htdgsbmflbdmov5xrjithceibm.cloudworkstations.dev'
];

console.log('Allowed origins:', allowedOrigins);

// CORS middleware
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || 
        origin.includes('localhost') || 
        origin.includes('cloudworkstations.dev')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  exposedHeaders: ['Access-Control-Allow-Origin'],
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Distance calculation endpoint
app.get('/api/distance', async (req, res) => {
  try {
    const { origins, destinations, key } = req.query;
    
    // Validate required parameters
    if (!origins || !destinations || !key) {
      return res.status(400).json({ 
        error: 'Missing required parameters',
        required: ['origins', 'destinations', 'key'],
        received: { origins, destinations, key }
      });
    }

    // Encode URI components
    const encodedOrigins = encodeURIComponent(origins);
    const encodedDestinations = encodeURIComponent(destinations);
    
    // Construct Google Maps API URL
    const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodedOrigins}&destinations=${encodedDestinations}&key=${key}`;

    console.log('Making request to Google Maps API...');
    const response = await axios.get(apiUrl);
    
    console.log('Received response from Google Maps API');
    res.json(response.data);
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      stack: error.stack
    });
    
    // Send appropriate error response
    res.status(error.response?.status || 500).json({ 
      error: 'Failed to fetch distance data',
      message: error.message,
      status: error.response?.status || 500
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.url}`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });
  
  res.status(err.status || 500).json({ 
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
  console.log(`Health check available at http://0.0.0.0:${port}/health`);
  console.log('Allowed origins:', allowedOrigins);
}); 