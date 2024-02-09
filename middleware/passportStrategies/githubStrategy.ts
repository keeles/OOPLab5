import passport from "passport";
import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import { VerifyCallback } from 'passport-oauth2';
import { getUserById } from "../../controllers/userController"
import dotenv from 'dotenv'
import { userModel } from '../../models/userModel';

dotenv.config({ path: __dirname + '/.env' });

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: "http://localhost:3000/auth/github/callback",
        passReqToCallback: true,
    },

    /* FIX ME 😭 */
    async (req: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
        let user = userModel.findById(profile._json.id)
        if (!user) {
            userModel.createOne(profile.username, profile._json.id)
            user = userModel.findById(profile._json.id)
        }
        done(null, user)
    },
);

passport.serializeUser(function (user: Express.User, done: (err: any, id?: number) => void): void {
    done(null, user.id);
});

passport.deserializeUser(function (id: any, done: (err: any, user?: Express.User | null) => void): void {
    let user = getUserById(id);
    if (user) {
        done(null, user);
    } else {
        done({ message: "User not found" }, null);
    }
});

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
