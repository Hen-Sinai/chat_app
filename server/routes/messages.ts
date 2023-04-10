import express from "express";
import { Router } from "express";
import {
    getAllMessages,
    getUserMessages,
    sendMessage
} from "../controllers/messages";
import {verifyJWT} from '../middleware/verifyJWT'

const router: Router = express.Router();

router.use(verifyJWT)

router.route("/").get(getAllMessages);

router.route("/:chatId").post(sendMessage);

router.route("/user/:id").get(getUserMessages);

export default router;