import express from "express";

import CharacterModel from "./../models/character.js";
import GroupModel from "./../models/group.js";

const router = express.Router();

export const masterEditCharacter = async (req, res) => {
  const { id: groupId } = req.params;
  const { level, life, items, charClass, charId } = req.body;
  const userId = req.userId;
  const updatedChar = { level, life, items, charClass, charId, userId };
  try {
    const groupToEdit = await GroupModel.findById(groupId);
    if (!groupToEdit.characters.includes(charId))
      return res.status(400).json({ message: "Character is not in the group" });
    if (groupToEdit.master !== userId)
      return res
        .status(400)
        .json({ message: "Only masters can perform this action" });
    const editedChar = await CharacterModel.findByIdAndUpdate(
      charId,
      updatedChar,
      { new: true }
    );
    res.status(201).json(editedChar);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const userEditCharacter = async (req, res) => {
  const {
    attributes,
    goodTraits,
    badTraits,
    excelentTraits,
    charId,
  } = req.body;
  const userId = req.userId;
  try {
    const charToUpdate = await CharacterModel.findById(charId);
    if (!charToUpdate)
      return res.status(400).json({ message: "Character not found" });
    if (charToUpdate.user !== userId)
      return res.status(400).json({ message: "Not allowed" });
    const newLife =
      attributes[2] - charToUpdate.attributes[2] + charToUpdate.life;
    const maxAttributes = 30 + (charToUpdate.level - 1) * 2;
    const attributesPassed = attributes.reduce((a, b) => a + b);
    if (maxAttributes !== attributesPassed)
      if (charToUpdate.user !== userId)
        return res.status(400).json({ message: "Wrong attributes" });
    const updatedChar = {
      attributes,
      goodTraits,
      badTraits,
      excelentTraits,
      life: newLife,
    };
    const result = await CharacterModel.findByIdAndUpdate(charId, updatedChar, {
      new: true,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCharacter = async (req, res) => {
  const {
    userName,
    name,
    race,
    charClass,
    avatar,
    attributes,
    goodTraits,
    badTraits,
    excelentTraits,
  } = req.body;
  const userId = req.userId;
  const { id: groupId } = req.params;
  const life = 10 + attributes[2];
  const level = 1;
  const newCharacter = new CharacterModel({
    user: userId,
    userName,
    name,
    race,
    charClass,
    avatar,
    group: groupId,
    attributes,
    goodTraits,
    badTraits,
    excelentTraits,
    life,
    level,
  });
  try {
    const groupToEnter = await GroupModel.findById(groupId);
    if (!groupToEnter.members.includes(userId))
      return res.status(400).json({ message: "You are not in the group" });
    if (groupToEnter.charNames.includes(name))
      return res.status(400).json({ message: "Name is already taken" });
    const resultChar = await newCharacter.save();
    await GroupModel.findByIdAndUpdate(groupId, {
      $push: {
        membersNames: name,
        characters: resultChar._id,
        membersWithChar: userId,
      },
    });
    res.status(201).json(resultChar);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const createPage = async (req, res) => {
  const { content, charId } = req.body;
  const userId = req.userId;

  const newPage = { content };
  try {
    const character = await CharacterModel.findById(charId);
    if (!character)
      return res.status(404).json({ message: "Character not found" });
    if (character.user !== userId)
      return res.status(400).json({ message: "Not allowed" });
    const result = await CharacterModel.findByIdAndUpdate(
      charId,
      {
        $push: { journal: newPage },
      },
      { new: true }
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePage = async (req, res) => {
  const { pageId, charId } = req.body;
  const userId = req.userId;
  try {
    const character = await CharacterModel.findById(charId);
    if (!character)
      return res.status(404).json({ message: "Character not found" });
    if (character.user !== userId)
      return res.status(400).json({ message: "Not allowed" });
    await CharacterModel.findByIdAndUpdate(charId, {
      $pull: { journal: { _id: pageId } },
    });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default router;
