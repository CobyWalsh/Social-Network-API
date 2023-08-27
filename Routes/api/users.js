const express = require('express');
const router = express.Router();
const User = require('../../Models/User');
const Thought = require('../../Models/Thought'); 

// GET all users
router.get('/api/users', async (req, res) => {
    console.log('GET all users route hit');
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
    console.log(req.body);
  try {
    const { username, email } = req.body;
    const newUser = new User({
      username,
      email,
    });
    const savedUser = await newUser.save();
    console.log(newUser,'this is new user');
    res.json(savedUser);
    console.log(savedUser,'this is a saved user');
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
    // Remove associated thoughts 
    await Thought.deleteMany({ username: userId });
    // Remove the user
    await User.findByIdAndRemove(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

  // POST to add a new friend to a user's friend list
router.post('/api/users/:userId/friends/:friendId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;
  
      // Find the user and friend by their IDs
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);
  
      if (!user || !friend) {
        return res.status(404).json({ error: 'User or friend not found' });
      }
  
      // Add the friend to the user's friend list
      user.friends.push(friendId);
      await user.save();
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error adding friend' });
    }
  });
  
  // DELETE to remove a friend from a user's friend list
  router.delete('/api/users/:userId/friends/:friendId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;
  
      // Find the user by their ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Remove the friend from the user's friend list
      user.friends = user.friends.filter(id => id.toString() !== friendId);
      await user.save();
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error removing friend' });
    }

});

module.exports = router;
