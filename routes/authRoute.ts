import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

declare module "express-session" {
  export interface SessionData {
    messages: string[]
  }
}

router.get("/login", forwardAuthenticated, (req, res) => {
  const message = req.session.messages?.pop()
  res.render("login", { message: message });
})

router.get("/github",
  passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/login',
    successRedirect: '/dashboard'
  }),
  // function (req, res) {
  //   // Successful authentication, redirect home.
  //   res.redirect('/dashboard');
  // }
);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: true
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
