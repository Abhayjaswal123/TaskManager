import express from 'express'
import {authMiddleware} from '../middlewares/auth.middleware.js'
import { register, login, logout, refreshToken } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/refresh-token", refreshToken);

authRouter.get("/me", authMiddleware,  (req,res) => {
    const {password, ...userData} = req.user.toObject()
    res.status(200).json({ user: userData })
});

export default authRouter;