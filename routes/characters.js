import express from "express";

import {
  createCharacter,
  masterEditCharacter,
  userEditCharacter,
  createPage,
  deletePage,
} from "../controllers/character.js";

import auth from "./../middleware/auth.js";

const router = express.Router();

router.post("/create/:id", auth, createCharacter);
router.patch("/masterupdate/:id", auth, masterEditCharacter);
router.patch("/userupdate", auth, userEditCharacter);
router.patch("/createpage", auth, createPage);
router.patch("/deletepage", auth, deletePage);

export default router;
