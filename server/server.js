const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Define allowed origins with wildcard for Firebase Studio subdomains
const allowedOrigins = [
  'http://localhost:4200',
  'http://localhost:3000',
  '.cloudworkstations.dev'  // This will match all Firebase Studio domains
];

// CORS configuration for Firebase Studio
const corsOptions = {
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    // Check if the origin matches any of our allowed origins
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.startsWith('.')) {
        // For domain suffixes (like .cloudworkstations.dev)
        return origin.endsWith(allowedOrigin);
      }
      return origin === allowedOrigin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: Origin not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ status: 'ok', environment: 'Firebase Studio' });
});

// Distance calculation endpoint
app.get('/api/distance', async (req, res) => {
  try {
    const origins = req.query.origins;
    const destinations = req.query.destinations;
    const key = req.query.key;

    // Log request details for debugging
    console.log('Received request:', {
      origins,
      destinations,
      origin: req.headers.origin,
      host: req.headers.host
    });

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
    
    // Set CORS headers explicitly
    res.setHeader('Access-Control-Allow-Origin', '*');
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
    method: req.method,
    headers: req.headers
  });
  
  res.status(err.status || 500).json({ 
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
  console.log(`Health check available at http://0.0.0.0:${port}/health`);
  console.log('Server configured for Firebase Studio environment');
  console.log('Allowed origins:', allowedOrigins);
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use`);
  }
}); 