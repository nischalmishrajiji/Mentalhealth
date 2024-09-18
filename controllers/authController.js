const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('../logger');

// Register controller
async function register(req, res) {
  const { username, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    await User.create({ username, password: hashedPassword });
    res.status(201).send('User registered');
  } catch (err) {
    logger.error(`'Error registering user':${err}`);
    res.status(500).send('Error registering user');
  }
}

// Login controller
async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).send('Cannot find user');
    if (!bcrypt.compareSync(password, user.password)) return res.status(403).send('Invalid password');

    const accessToken = jwt.sign({  id: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    res.json({ accessToken, userId: user.id  });
  } catch (err) {
    res.status(500).send('Error logging in');
  }
}

module.exports = { register, login };

