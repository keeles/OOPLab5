import { NextFunction, Request, Response } from "express";
import { userModel } from "../models/userModel"

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}

export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
}

export const ensureAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    let userId = (req.session as any).passport
    let role = userModel.findAdmin(userId.user)
    if (role === "admin") {
      console.log("VERIFIED")
      return next();
    }
  }
  console.log("DENIED")
  res.redirect("/dashboard")
}