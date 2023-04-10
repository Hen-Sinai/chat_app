import express from "express";
import { Router } from "express";
import {
  getChat,
  getAllChats,
  getAllUsersFromChats,
  createChat,
  addUserToChat,
  deleteChat,
  getAllChatsOfUser,
  getChatData,
} from "../controllers/chats";
import { verifyJWT } from "../middleware/verifyJWT";

const router: Router = express.Router();

router.use(verifyJWT);

router.route("/").get(getAllChatsOfUser).post(createChat);

router.route("/:chatId").get(getChatData);

router.route("/:id/users").get(getAllUsersFromChats);

// router.route("/:id")
//     .get(getChat)
//     .post(addUserToChat)
//     .delete(deleteChat);

// router.route("/:phoneNumber")
//     .get(getAllChatsOfUser)

export default router;
