const { Schema, Mongoose } = require("mongoose");

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

const Reaction = ('Reaction', reactionSchema);

// Define a virtual called 'formattedCreatedAt'
Reaction.virtual('formattedCreatedAt').get(function() {
  return this.createdAt.toLocaleString(); // You can format the timestamp however you like
});

module.exports = Reaction;
