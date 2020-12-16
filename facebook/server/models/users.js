const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: String,
    profile_photo: {
      type: String,
      default: "http://localhost:5000/images/no_pic.jpg",
    },
    cover_photo: { type: String },
    password: String,
    facebookID: String,
    display_name: String,
    first_name: String,
    last_name: String,
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

UserSchema.virtual("full_name").get(function () {
  return this.first_name + " " + this.last_name;
});

module.exports = mongoose.model("User", UserSchema);
