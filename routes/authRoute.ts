import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

declare module "express-session" {
  export interface SessionData {
    messages: string
  }
}

router.get("/login", forwardAuthenticated, (req, res) => {
  const message = req.session.messages
  console.log(message)
  res.render("login", { message: message });
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: "Incorrect username or password"
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
