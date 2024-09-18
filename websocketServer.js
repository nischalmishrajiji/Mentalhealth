const WebSocket = require('ws');
const DailyLog = require('./models/dailyLog');
const { sendUserCountForToday, sendNewLogEntry } = require('./websocketUtils'); // Import utility functions

let wss;

function setupWebSocketServer(server) {
  wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    // Send user count for today when a new connection is established
    sendUserCountForToday(wss);

    // Optionally, set up periodic updates here
    // setInterval(() => sendUserCountForToday(wss), 60000); // Update every minute
  });

  return wss;
}

function getWebSocketServer() {
  return wss;
}

module.exports = {
  setupWebSocketServer,
  getWebSocketServer
};
