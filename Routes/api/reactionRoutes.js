const express = require('express');
const router = express.Router();
const Thought = require('../Models/Thought'); // Make sure you import your Thought model

// POST to create a reaction within a thought's reactions array field
router.post('/api/thoughts/:thoughtId/reactions', async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;
    const { reactionBody, username } = req.body;

    // Create the reaction object
    const newReaction = {
      reactionBody,
      username,
    };

    // Push the reaction to the thought's reactions array
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: newReaction } },
      { new: true }
    );

    res.json(updatedThought);
  } catch (error) {
    res.status(500).json({ error: 'Error creating reaction' });
  }
});

// DELETE to remove a reaction by reactionId
router.delete('/api/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;

    // Pull and remove the reaction from the thought's reactions array
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId } } },
      { new: true }
    );

    res.json(updatedThought);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting reaction' });
  }
});

module.exports = router;
