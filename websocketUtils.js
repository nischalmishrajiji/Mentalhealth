const WebSocket = require('ws');
const DailyLog = require('./models/dailyLog');

// Broadcast a message to all connected WebSocket clients
function broadcastMessage(wss, message) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Send user count for today to all connected clients
async function sendUserCountForToday(wss) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const count = await DailyLog.count({
      where: {
        date: today
      }
    });

    const message = JSON.stringify({ type: 'userCount', count });
    broadcastMessage(wss, message);
  } catch (error) {
    console.error('Error fetching user count for today:', error);
  }
}

module.exports = {
  sendUserCountForToday,
};
