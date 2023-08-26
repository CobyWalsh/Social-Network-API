const {Schema, model} = require("mongoose");
// const thoughtsSchema = require('./Thoughts');

// The userNameSchema defines the schema of the subdocument
const userSchema = new Schema(
  { 
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
      type: String,
      required: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      unique: true
    },
    thoughts: [{
      type: Schema.Type.ObjectId,
      ref: 'thoughts' // This refers to the 'Thoughts' model
    }],
    user, [{
      type: Schema.Type.ObjectId,
      ref: 'user' 
    }]
  
    // Create a virtual property `commentCount` that gets the amount of comments per user
    postSchema.virtual('friendtCount').get(function () {
      return this.friends.length;
    })
});

  




