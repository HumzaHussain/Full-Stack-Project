// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { addUser, getUserByEmail } = require('C:\\Users\\user\\OneDrive\\Documents\\node_projects\\First_Project\\src\\controllers\\users.js');

// router.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = { name, email, password: hashedPassword };
//     addUser(user);
//     res.status(201).send({ message: 'User created successfully' });
//   } catch (error) {
//     res.status(400).send({ message: 'Error creating user' });
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = getUserByEmail(email);
//     if (!user) {
//       return res.status(401).send({ message: 'Invalid email or password' });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).send({ message: 'Invalid email or password' });
//     }
//     const token = jwt.sign({ userId: user.email }, 'secretkey', { expiresIn: '1h' });
//     res.send({ token: token, userId: user.email });
//   } catch (error) {
//     res.status(400).send({ message: 'Error logging in' });
//   }
// });

// module.exports = router;
// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/model_user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send({ message: 'User  created successfully' });
  } catch (error) {
    res.status(400).send({ message: 'Error creating user'});
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
    res.send({ token: token, userId: user._id });
  } catch (error) {
    res.status(400).send({ message: 'Error logging in' });
  }
});

module.exports = router;