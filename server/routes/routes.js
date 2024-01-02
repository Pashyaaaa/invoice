import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
} from "../controller/UsersController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";
const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/register", Register);
router.post("/login", Login);
router.delete("/logout", Logout);
router.get("/token", refreshToken);

export default router;
