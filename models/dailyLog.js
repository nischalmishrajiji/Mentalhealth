const { DataTypes } = require('sequelize');
const { sequelize } = require('./index'); 

if (!sequelize) {
  throw new Error('Sequelize instance is not defined');
}

// Define the DailyLog model
const DailyLog = sequelize.define('DailyLog', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // references: {
    //   model: 'Users', // Ensure this matches the name of your User model
    //   key: 'id',
    // },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    // unique: true, // Ensures only one log per day
  },
  moodRatings: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  anxietyLevels: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  sleepPatterns: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  physicalActivity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  socialInteractions: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stressLevels: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  symptomsOrDepressionOrAnxiety: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true, // Optional: Adds createdAt and updatedAt fields
});

module.exports = DailyLog;