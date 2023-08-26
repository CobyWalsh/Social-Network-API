const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought'); // Make sure you import your Thought model
const User = require('../models/User'); // Import the User model to update user's thoughts array

// GET all thoughts
router.get('/api/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching thoughts' });
  }
});

// GET a single thought by _id
router.get('/api/thoughts/:id', async (req, res) => {
  try {
    const thoughtId = req.params.id;
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching thought' });
  }
});

// POST a new thought
router.post('/api/thoughts', async (req, res) => {
  try {
    const { thoughtText, username, userId } = req.body;

    const newThought = new Thought({
      thoughtText,
      username,
    });

    const savedThought = await newThought.save();

    // Push the created thought's _id to the associated user's thoughts array
    const user = await User.findById(userId);
    user.thoughts.push(savedThought._id);
    await user.save();

    res.json(savedThought);
  } catch (error) {
    res.status(500).json({ error: 'Error creating thought' });
  }
});

// PUT to update a thought by _id
router.put('/api/thoughts/:id', async (req, res) => {
  try {
    const thoughtId = req.params.id;
    const { thoughtText } = req.body;
    const updatedThought = await Thought.findByIdAndUpdate(thoughtId, {
      thoughtText,
    });
    res.json(updatedThought);
  } catch (error) {
    res.status(500).json({ error: 'Error updating thought' });
  }
});

// DELETE to remove a thought by _id
router.delete('/api/thoughts/:id', async (req, res) => {
  try {
    const thoughtId = req.params.id;
    // Remove the thought from the user's thoughts array
    const thought = await Thought.findById(thoughtId);
    if (thought) {
      await User.findByIdAndUpdate(thought.userId, {
        $pull: { thoughts: thoughtId },
      });
    }
    // Remove the thought
    await Thought.findByIdAndRemove(thoughtId);
    res.json({ message: 'Thought deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting thought' });
  }
});

module.exports = router;
