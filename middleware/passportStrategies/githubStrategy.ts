import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import { VerifyCallback } from 'passport-oauth2';
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
        console.log("ACCESS TOKEN", accessToken)
        console.log("REFRESH TOKEN", refreshToken)
        console.log("PROFILE", profile)
        let user = userModel.findById(parseInt(profile.id))
        if (!user) {
            let user = userModel.createOne(profile.username, profile.id)
        }
        done(null, user)
    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
