const router = require('express').Router();
const friendsRoutes = require('./friendsRoutes');
const reactionRoutes = require('./reactionRoutes');
const thoughts = require('./thoughts');
const users = require('./users');

router.use('/friends', friendsRoutes);
router.use('/reactions', reactionRoutes);
router.use('/thoughts', thoughts);
router.use('/users', users);

module.exports = router;
