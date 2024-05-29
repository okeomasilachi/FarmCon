const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');

const port = parseInt(process.env.PORT, 10) || 5000;

// Define CORS options
const corsOptions = {
  origin: ['http://localhost', 'http://okeoma.tech', 'http://0.0.0.0', /https?:\/\/.*\.okeoma\.tech/i],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Mount routes under /api/
app.use('/api', routes);

// Middleware to handle requests to the root path (/)
app.use((req, res) => {
  res.status(404).send({ message: 'Not found' });
});

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal server error' });
});

// Starts the server and listens on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
