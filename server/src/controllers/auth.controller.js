import userModel from '../models/user.model.js'
import sessionModel from "../models/session.model.js"
import bcrypt from 'bcrypt'
import { accessTokenFunction, hashFunction, refreshTokenFunction } from '../utils/genrate.token.js'
import config from '../config/config.js';
import jwt from "jsonwebtoken"

const refreshCookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
};

const clearCookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none"
}

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const isAlreadyExist = await userModel.findOne({ email });
        if (isAlreadyExist) {
            return res.status(409).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        });

        const refreshToken = refreshTokenFunction(user);
        const refreshTokenHash = hashFunction(refreshToken);
        const session = await sessionModel.create({
            user: user._id,
            refreshTokenHash,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        })

        const accessToken = accessTokenFunction(user, session);
        res.cookie("refreshToken", refreshToken, refreshCookieOptions);

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                name: user.name,
                email: user.email
            },
            accessToken
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server error"
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "invalid credentials"
            });
        }

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "invalid credentials"
            });
        }

        const refreshToken = refreshTokenFunction(user);
        const refreshTokenHash = hashFunction(refreshToken);
        const session = await sessionModel.create({
            user: user._id,
            refreshTokenHash,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        })

        const accessToken = accessTokenFunction(user, session);
        res.cookie("refreshToken", refreshToken, refreshCookieOptions);

        return res.status(201).json({
            message: "User login successfully",
            user: {
                name: user.name,
                email: user.email
            },
            accessToken
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server error"
        })
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(400).json({
                message: "User already logout"
            });
        }
        const refreshTokenHash = hashFunction(token);

        const session = await sessionModel.findOne({
            refreshTokenHash,
            revoked: false
        })

        if (!session) {
            return res.status(400).json({
                message: "User already logout"
            })
        }

        session.revoked = true;
        session.revokedAt = new Date();
        await session.save();
        res.clearCookie("refreshToken", clearCookieOptions);

        return res.status(200).json({
            message: "logout successfully"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server error"
        })
    }
}

export const refreshToken = async (req, res) => {

    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(400).json({
                message: "refresh token not found"
            })
        }

        const decoded = jwt.verify(token, config.REFRESH_JWT_SECRET);

        const refreshTokenHash = hashFunction(token);

        const session = await sessionModel.findOne({
            refreshTokenHash,
            revoked: false
        })

        if (!session) {
            return res.status(400).json({
                message: "invalid refresh token"
            })
        }

        const refreshToken = refreshTokenFunction(decoded);
        const newRefreshTokenHash = hashFunction(refreshToken);
        session.refreshTokenHash = newRefreshTokenHash;
        await session.save();
        const accessToken = accessTokenFunction(decoded, session);

        res.cookie("refreshToken", refreshToken, refreshCookieOptions)

        return res.status(200).json({
            message: "refreshed successfully",
            accessToken
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}