import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    importance: {
        type: Number,
        enum: [1, 2, 3],
        required: true
    },
    priorityScore: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
    },
    tag: {
        type: String,
        enum: ["Urgent", "Important", "Normal"],
        default: "Normal",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, {
    timestamps: true
})

const taskModel = mongoose.model("task", taskSchema);
export default taskModel;