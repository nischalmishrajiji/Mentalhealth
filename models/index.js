const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

// Check Sequelize instance
// console.log('Sequelize instance:', sequelize);

// Import models
// const User = require('./user');
// const DailyLog = require('./dailyLog');

// Check model imports
// console.log('User model:', User);
// console.log('DailyLog model:', DailyLog);

// Define relationships
// User.hasMany(DailyLog, { foreignKey: 'userId' });
// DailyLog.belongsTo(User, { foreignKey: 'userId' });

// Test connection
async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

authenticate();

module.exports = {
  sequelize,
  Sequelize,
//   User,
//   DailyLog,
};
