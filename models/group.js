import mongoose from "mongoose";

const groupSchema = mongoose.Schema(
  {
    title: String,
    code: { type: String, required: true },
    master: { type: String, required: true },
    members: [String],
    charNames: [String],
    membersWithChar: [String],
    characters: [String],
    ban: [String],
    chapters: [
      {
        title: String,
        content: String,
        image: String,
        date: { type: Date, default: new Date() },
      },
    ],
    image: String,
  },
  { timestamps: true }
);

let groupModel = mongoose.model("Group", groupSchema);

export default groupModel;
