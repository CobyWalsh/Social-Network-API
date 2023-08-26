const {Schema, model} = require("mongoose");
const reactionSchema = require('./reactionSchema'); // Import the Reaction schema

const thoughtsSchema = new Schema (
    {
        thoughtText: {
             type: String,
             requred: true,
             minlength: 1,
             maxlenth: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now, // Sets the default value to the current timestamp
        },
         username: {
            type: String,
            required: true,
         }, 
         reactions: [reactionSchema], // Array of nested documents using reactionSchema 
        });

        thoughtsSchema.virtual('formattedCreatedAt').get(function() {
            return this.createdAt.toLocaleString(); // You can format the timestamp however you like
          }),
        
        // Define a virtual called 'reactionCount'
        thoughtsSchema.virtual('reactionCount').get(function() {
        return this.reactions.length;
        });

const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts;
