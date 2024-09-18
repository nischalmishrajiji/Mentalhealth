const express = require('express');
const { addDailyLog, viewDailyLogs } = require('../controllers/dailyLogController');
const authenticateToken = require('../middleware/authenticateToken'); // Use authentication middleware
const verifyUserIdinParam = require('../middleware/verifyUserIdinParam');
const verifyUserIdinBody = require('../middleware/verifyUserIdinBody');
const { dailyLog } = require('../middleware/form/dailyLog');
const router = express.Router();

// Apply middleware to specific routes
router.post('/', authenticateToken, verifyUserIdinBody, dailyLog , addDailyLog);
router.get('/:userId', authenticateToken, verifyUserIdinParam, viewDailyLogs);

module.exports = router;