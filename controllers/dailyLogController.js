const { Op } = require('sequelize');
const WebSocket = require('ws');
const DailyLog = require('../models/dailyLog');
const User = require('../models/user'); // Ensure user model is available
const { getWebSocketServer } = require('../websocketServer');
const { validationResult } = require('express-validator');



// Add daily log controller
async function addDailyLog(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  
  const { userId, date, moodRatings, anxietyLevels, sleepPatterns, physicalActivity, socialInteractions, stressLevels, symptomsOrDepressionOrAnxiety } = req.body;
  
  
  try {
    // Check if a log for this user on this date already exists
    const existingLog = await DailyLog.findOne({ where: { userId, date } });
    if (existingLog) return res.status(400).send('Log for this date already exists');

    const dailyLog = await DailyLog.create({ userId, date, moodRatings, anxietyLevels, sleepPatterns, physicalActivity, socialInteractions, stressLevels, symptomsOrDepressionOrAnxiety });
    res.status(201).json(dailyLog);

    const wss = getWebSocketServer();
    if (wss) {
        try {
            const today = new Date().toISOString().split('T')[0];
            const count = await DailyLog.count({
            where: {
                date: today
            }
            });
        
            const message = JSON.stringify({ type: 'userCount', count });
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                client.send(message);
                }
            });
        } catch (error) {
        console.error('Error fetching user count for today:', error);
        }
    }
  } catch (err) {
    console.error('Error adding daily log:', err);
    res.status(500).send('Error adding daily log');
  }
}

// View daily logs controller
async function viewDailyLogs(req, res) {
  const { userId } = req.params;
  try {
    const dailyLogs = await DailyLog.findAll({ where: { userId } });
    res.json(dailyLogs);
  } catch (err) {
    console.error('Error retrieving daily logs:', err);
    res.status(500).send('Error retrieving daily logs');
  }
}

module.exports = { addDailyLog, viewDailyLogs };