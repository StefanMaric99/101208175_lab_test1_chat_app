const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    creation: { type: String, required: true },
  },
  { timestamps: true }
);

const MessageSchema = new mongoose.Schema(
  {
    from_user: { type: String, required: true },
    to_user: { type: String, required: true },
    message: { type: String, required: true },
    date_sent: { type: String, required: true },
    room: { type: String, required: true }, 
  },
  { timestamps: true }
);

module.exports = {
  User: mongoose.model("user", UserSchema),
  Message: mongoose.model("message", MessageSchema),
};