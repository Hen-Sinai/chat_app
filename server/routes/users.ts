import express from "express";
import { Router } from "express";
import {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getAllUserContacts,
} from "../controllers/users";
import {verifyJWT} from "../middleware/verifyJWT";
import upload from "../utils/multer";

const router: Router = express.Router();

router.use(verifyJWT);

router.route("/").get(getAllUsers).patch(updateUser).delete(deleteUser);

router.route("/contacts").get(getAllUserContacts);

// router.route("/:phoneNumber").get(getUser).patch(updateUser).delete(deleteUser);


// .patch(upload.single("photo"), updateUser)
// router.route("/:id/messages").get(getUserMessages);

export default router;
