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

// CORS configuration
app.use(cors({
  origin: function(origin, callback) {
    console.log('Request origin:', origin);
    
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) {
      console.log('Allowing request with no origin');
      callback(null, true);
      return;
    }

    // Check if origin is allowed
    if (allowedOrigins.includes(origin) || 
        origin.includes('localhost') || 
        origin.includes('cloudworkstations.dev')) {
      console.log('Origin allowed:', origin);
      callback(null, true);
    } else {
      console.log('Origin not allowed:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  exposedHeaders: ['Access-Control-Allow-Origin'],
  optionsSuccessStatus: 200,
  preflightContinue: false
}));

// Add CORS headers middleware for preflight
app.options('*', cors());

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/distance', async (req, res) => {
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

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
  console.log(`Health check available at http://0.0.0.0:${port}/health`);
  console.log('Allowed origins:', allowedOrigins);
}); 