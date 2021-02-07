import mongoose from "mongoose";

const characterSchema = mongoose.Schema(
  {
    user: String,
    name: String,
    userName: String,
    race: String,
    charClass: String,
    avatar: {
      topType: String,
      hairColor: String,
      accessoriesType: String,
      hatColor: String,
      facialHairType: String,
      facialHairColor: String,
      clotheType: String,
      clotheColor: String,
      eyeType: String,
      eyebrowType: String,
      mouthType: String,
      skinColor: String,
    },
    group: String,
    level: Number,
    life: Number,
    attributes: [Number],
    goodTraits: String,
    badTraits: String,
    excelentTraits: String,
    items: [String],
    journal: [{ content: String, date: { type: Date, default: new Date() } }],
  },
  { timestamps: true }
);

let characterModel = mongoose.model("Character", characterSchema);

export default characterModel;
