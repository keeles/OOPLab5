import express from "express";
import session, { Store } from "express-session";
import { promisify } from "util"

declare module "express-session" {
  export interface SessionData {
    passport: { user: number }
  }
}

const router = express.Router();
import { ensureAuthenticated, ensureAdmin } from "../middleware/checkAuth";
import { userModel } from "../models/userModel";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", ensureAdmin, async (req, res) => {
  if (req.sessionStore.all) {
    let adminId = (req.session as any).passport
    let admin = userModel.findById(adminId.user)?.name
    const sessionStoreAll = promisify(req.sessionStore.all.bind(req.sessionStore))
    const sessionStoreGet = promisify(req.sessionStore.get.bind(req.sessionStore))
    const sessions = await sessionStoreAll()
    const allSessions = []
    if (sessions) {
      for (const sid of Object.keys(sessions)) {
        const session = await sessionStoreGet(sid)
        if (session) {
          const user = userModel.findById(session.passport.user)
          allSessions.push({ name: user?.name, sid: sid, id: session.passport.user })
        }
      }
    }
    res.render("admin", {
      allSessions: allSessions,
      admin: admin
    })
  }
})

router.get("/admin/revoke/:sid", (req, res) => {
  const sid = req.params.sid
  req.sessionStore.destroy(sid)
  res.redirect("/admin")
})

export default router;
