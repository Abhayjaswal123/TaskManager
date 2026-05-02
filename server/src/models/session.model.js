import mongoose, { mongo } from "mongoose";

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", 
        required: [true, "user is required"]
    },
    refreshTokenHash: {
        type: String,
        required: [true, "refreshTokenHash is required"]
    },
    ip: {
        type: String,
        required: [true, "ip is required"]
    },
    userAgent: {
        type: String,
        required: [true, "userAgent is required"]
    },
    revoked: {
        type: Boolean,
        default: false
    },
    revokedAt: {
        type: Date,
        expires: 1 * 24 * 60 * 60
    }
}, {
    timestamps: true
})

const sessionModel = mongoose.model("session", sessionSchema);
export default sessionModel;