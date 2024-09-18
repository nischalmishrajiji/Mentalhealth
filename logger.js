const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

// Create a transport for daily rotating logs
const transportInfo = new DailyRotateFile({
  filename: 'storage/logs/info-%DATE%.log', // Filename pattern
  datePattern: 'YYYY-MM-DD', // Format for the date
  zippedArchive: true, // Compress the archive log files
  maxSize: '20m', // Maximum size of the log file before rotation
  maxFiles: '14d', // Keep logs for 14 days
  level: 'info' // Log level
});

const transportError = new DailyRotateFile({
  filename: 'storage/logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'error' // Log level
});

const transportDebug = new DailyRotateFile({
  filename: 'storage/logs/debug-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'debug' // Log level
});

// Create a logger instance
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to logs
    winston.format.json() // Format logs as JSON
  ),
  transports: [
    transportInfo,
    transportError,
    transportDebug,
    new winston.transports.Console() // Also log to console
  ],
});

// Export the logger
module.exports = logger;
