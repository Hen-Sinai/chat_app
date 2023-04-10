import express from "express";
import { Router } from "express";
import {
    login,
    register,
    logout,
} from "../controllers/auth";


const router: Router = express.Router();

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/logout').post(logout)

export default router;