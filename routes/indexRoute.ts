import express from "express";
const router = express.Router();
import { ensureAuthenticated, ensureAdmin } from "../middleware/checkAuth";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", ensureAdmin, (req, res) => {
  res.render("dashboard", {
    user: req.user
  })
})

export default router;
