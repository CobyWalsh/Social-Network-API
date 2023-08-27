const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Import your API route files
const users = require('./Routes/api/users');
const thoughtRoutes = require('./Routes/api/thoughts');
const reactionRoutes = require('./Routes/api/reactionRoutes');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/social-network-api';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false, 
  // useCreateIndex: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB database.');
});

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// Middleware
app.use(express.json());

// Use your API route files
app.use(users);
app.use(thoughtRoutes);
app.use(reactionRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
