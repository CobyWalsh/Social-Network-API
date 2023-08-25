const {Schema, model} = require("mongoose");
const thoughtsSchema = require('./Thoughts');

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
    thoughts: [thoughtsSchema]
  },
);



