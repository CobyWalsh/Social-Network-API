const { Schema } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: new Schema.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define a virtual called 'formattedCreatedAt'
reactionSchema.virtual('formattedCreatedAt').get(function() {
  return this.createdAt.toLocaleString(); // You can format the timestamp however you like
});

module.exports = reactionSchema;
