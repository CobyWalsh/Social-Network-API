const {Schema, model} = require("mongoose");
// const thoughtsSchema = require('./Thoughts');

// The userSchema defines the schema of the subdocument
const userSchema = new Schema(
  { 
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
      type: String,
      required: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      unique: true,
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought' // This refers to the 'Thought' model
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User' 
        }]
      }
    );
    // Create a virtual property `commentCount` that gets the amount of comments per user
    userSchema.virtual('friendCount').get(function () {
      return this.friends.length;
    
});

const User = model('User', userSchema);

module.exports = User;  
