'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('DailyLogs', [
      {
        userId: 1, // Ensure this user exists in the Users table
        date: '2024-09-16',
        moodRatings: 7,
        anxietyLevels: 4,
        sleepPatterns: 'Good',
        physicalActivity: 'Moderate exercise',
        socialInteractions: 'Had a dinner with friends',
        stressLevels: 3,
        symptomsOrDepressionOrAnxiety: 'None',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2, // Ensure this user exists in the Users table
        date: '2024-09-17',
        moodRatings: 5,
        anxietyLevels: 6,
        sleepPatterns: 'Poor',
        physicalActivity: 'None',
        socialInteractions: 'Worked from home',
        stressLevels: 7,
        symptomsOrDepressionOrAnxiety: 'Feeling anxious',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('DailyLogs', null, {});
  },
};
