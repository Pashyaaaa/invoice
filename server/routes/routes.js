import express from "express";

const router = express.Router();

//login and register
router.get("/test", (req, res) => {
  res.send("Hello World!");
});

// router.get("/users", verifyToken, getUsers);
// router.post("/users", Register);
// router.post("/login", Login);
// router.get("/token", refreshToken);
// router.delete("/logout", Logout);

export default router;
