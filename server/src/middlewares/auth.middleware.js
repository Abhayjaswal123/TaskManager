import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import sessionModel from '../models/session.model.js';
import userModel from '../models/user.model.js'

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, config.ACCESS_JWT_SECRET)

        const session = await sessionModel.findById(decoded.sessionId);
        if (!session || session.revoked) {
            return res.status(401).json({ message: 'Session is invalid or revoked' })
        }

        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'user not exists' })
        }

        req.user = user;
        req.session = session;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server error"
        })
    }
}