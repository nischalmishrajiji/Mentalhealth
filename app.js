const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const logger = require('./logger');
const authRoutes = require('./routes/authRoutes');
const dailyLogRoutes = require('./routes/dailyLogRoutes'); // Update route file
const { setupWebSocketServer } = require('./websocketServer'); // Import the WebSocket server setup module
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: 'http://192.168.0.6:4000', // URL of your React app
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // Allow credentials if needed (e.g., cookies)
};

app.use(cors(corsOptions));


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/dailyLogs', dailyLogRoutes); // Update route file

// Create an HTTP server and bind it to the Express app
const server = http.createServer(app);

// Set up WebSocket server
setupWebSocketServer(server);

// Sync database and start server
const { sequelize } = require('./models');

sequelize.sync({ alter: true }) // { force: true } to recreate tables, { alter: true } to update schema
  .then(() => {
    server.listen(port,process.env.IPADDRESS, () => {
      logger.info(`Server is running at http://localhost:${port}`);
    });
  })
  .catch(error => {
    logger.error('Error syncing database:', error);
  });