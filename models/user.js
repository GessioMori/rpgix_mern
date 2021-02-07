import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: String,
    characters: [String],
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
