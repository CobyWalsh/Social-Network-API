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
    }
  }
);

const emailSchema = new mongoose.Schema({
  title: { type: String, required: true, match: /.+\@.+\..+/, unique: true },
});
await emailSchema.create([
  { email: "gmail@google.com" },
  { email: "bill@microsoft.com" },
  { email: "test@gmail.com" },
]);
await emailSchema.init();
try {
  await emailSchema.create({ email: "gmail@google.com" });
} catch (error) {
  error.message; 
}
thoughts: [thoughtsSchema]

