const { body } = require('express-validator');
const dailyLog = [
    body('userId')
        .notEmpty().withMessage('User ID is required'),
    body('date')
        .matches(/^\d{4}-(0[1-9]|1[0-2]|[1-9])-(0[1-9]|[12][0-9]|3[01]|[1-9])$/)
        .withMessage('Date must be in YYYY-MM-DD or YYYY-M-D format')
        .custom(value => {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                throw new Error('Date is not valid');
            }
            return true;
        }),
    body('moodRatings')
        .isInt({ min: 1, max: 10 }).withMessage('Mood ratings must be an integer between 1 and 10'),
    body('anxietyLevels')
        .isInt({ min: 1, max: 10 }).withMessage('Anxiety levels must be an integer between 1 and 10'),
  ];

module.exports = { dailyLog };