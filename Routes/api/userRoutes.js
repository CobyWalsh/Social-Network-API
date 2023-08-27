const express = require('express');
const router = express.Router();
const User = require('../Models/User'); 

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

