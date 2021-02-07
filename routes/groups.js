import express from "express";

import {
  createGroup,
  getGroups,
  getGroup,
  enterGroup,
  createChapter,
  deleteChapter,
  deleteGroup,
  deleteChar,
  banUser,
} from "../controllers/groups.js";
import auth from "./../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, createGroup);
router.post("/enter", auth, enterGroup);
router.get("/get", auth, getGroups);
router.post("/getgroup/:id", auth, getGroup);
router.patch("/createchapter/:id", auth, createChapter);
router.patch("/deletechapter/:id", auth, deleteChapter);
router.patch("/deletegroup/:id", auth, deleteGroup);
router.patch("/deletechar/:id", auth, deleteChar);
router.patch("/banuser/:id", auth, banUser);

export default router;
