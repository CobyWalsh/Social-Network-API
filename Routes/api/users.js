const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const Thought = require('../Models/Thoughts'); // Make sure you import your Thought model

// GET all users
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// GET a single user by _id and populate thought and friend data
router.get('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      .populate('thoughts')
      .populate('friends');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// POST a new user
router.post('/api/users', async (req, res) => {
  try {
    const { username, email } = req.body;
    const newUser = new User({
      username,
      email,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// PUT to update a user by _id
router.put('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, {
      username,
      email,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

// DELETE to remove user by _id
router.delete('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    // Remove associated thoughts (BONUS)
    await Thought.deleteMany({ username: userId });
    // Remove the user
    await User.findByIdAndRemove(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

module.exports = router;
