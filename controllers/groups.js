import express from "express";

import Group from "./../models/group.js";
import CharacterModel from "./../models/character.js";

const router = express.Router();

export const getGroups = async (req, res) => {
  const userId = req.userId;
  try {
    const groups = await Group.find({ members: userId }).select(
      "title image code master"
    );
    res.status(200).json(groups);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGroup = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  try {
    let group = await Group.findById(id);
    let characters;
    let isMaster;
    if (!group) return res.status(400).json({ message: "Group not found" });
    if (userId === group.master) {
      characters = await CharacterModel.find({
        _id: { $in: group.characters },
      });
      isMaster = true;
    } else {
      characters = await CharacterModel.find({
        _id: { $in: group.characters },
      });
      characters.forEach((character) => {
        if (character.user !== userId) {
          character.journal = undefined;
        }
      });
      group.master = undefined;
      group.members = undefined;
      isMaster = false;
    }
    const result = { group: group, characters: characters, isMaster: isMaster };
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createGroup = async (req, res) => {
  const { title, code, image } = req.body;
  const member = req.userId;
  const master = req.userId;
  const newGroup = new Group({ title, code, image, master });
  newGroup.members.push(member);
  if (Buffer.byteLength(image) > 1000000)
    return res.status(400).json({ message: "Image is too big" });
  try {
    const groupCodeExists = await Group.findOne({ code });
    if (groupCodeExists)
      return res.status(400).json({ message: "Group code already exists" });
    const resultGroup = await newGroup.save();
    res.status(201).json(resultGroup);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const enterGroup = async (req, res) => {
  const { code } = req.body;
  const userId = req.userId;
  try {
    const group = await Group.findOne({ code });
    if (!group) return res.status(400).json({ message: "Group not found" });
    if (group.members.includes(userId))
      return res.status(400).json({ message: "User already in group" });
    if (group.ban.includes(userId))
      return res.status(400).json({ message: "User not allowed" });
    const result = await Group.updateOne(
      { _id: group._id },
      { $push: { members: userId } }
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const createChapter = async (req, res) => {
  const { id } = req.params;
  const { title, content, image } = req.body;
  const userId = req.userId;

  if (Buffer.byteLength(image) > 300000)
    return res.status(400).json({ message: "Image is too big" });
  const newChapter = { title, content, image };
  try {
    const group = await Group.findById(id);
    if (!group) return res.status(404).json({ message: "Group not found" });
    if (group.master !== userId)
      return res.status(400).json({ message: "Not allowed" });
    const result = await Group.findByIdAndUpdate(
      id,
      {
        $push: { chapters: newChapter },
      },
      { new: true }
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteChapter = async (req, res) => {
  const { id } = req.params;
  const { chapterId } = req.body;
  const userId = req.userId;
  try {
    const group = await Group.findById(id);
    if (!group) return res.status(404).json({ message: "Group not found" });
    if (group.master !== userId)
      return res.status(400).json({ message: "Not allowed" });
    await Group.findByIdAndUpdate(id, {
      $pull: { chapters: { _id: chapterId } },
    });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteGroup = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const group = await Group.findById(id);
    if (!group) return res.status(404).json({ message: "Group not found" });
    if (group.master !== userId) {
      return res.status(400).json({ message: "Not allowed" });
    }

    await CharacterModel.deleteMany({ group: id });
    await Group.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteChar = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const { charId } = req.body;
  try {
    const group = await Group.findById(id);
    if (!group) return res.status(404).json({ message: "Group not found" });
    if (group.master !== userId) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const deletedChar = await CharacterModel.findByIdAndDelete(charId);
    await Group.findByIdAndUpdate(id, {
      $pull: { membersWithChar: deletedChar.user },
    });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const banUser = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const { charId } = req.body;
  try {
    const group = await Group.findById(id);
    if (!group) return res.status(404).json({ message: "Group not found" });
    if (group.master !== userId) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const deletedChar = await CharacterModel.findByIdAndDelete(charId);
    await Group.findByIdAndUpdate(id, {
      $pull: { membersWithChar: deletedChar.user, members: deletedChar.user },
      $push: { ban: deletedChar.user },
    });
    res.status(200).json({ message: "Banned" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default router;
