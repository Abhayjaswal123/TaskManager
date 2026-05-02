import taskModel from '../models/task.model.js';
import { calculatePriority } from '../utils/priority.js'

export const createTask = async (req, res) => {
    try {
        const { title, description, importance, deadline } = req.body;
        if (!title || !description || !importance || !deadline) {
            return res.status(400).json({
                message: "Every field is required"
            })
        }
        const { score, tag } = calculatePriority(Number(importance), deadline);

        const task = await taskModel.create({
            title,
            description,
            importance: Number(importance),
            deadline,
            priorityScore: score,
            tag,
            user: req.user.id
        })

        return res.status(201).json({
            message: "Task created successfully",
            task,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export const getTasks = async (req, res) => {
    try {
        const { search } = req.query;

        const filter = { user: req.user.id };

        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }
        const tasks = await taskModel.find(filter).sort({ priorityScore: -1 });

        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export const updateTask = async (req, res) => {
    try {
        const { title, description, deadline, importance, status } = req.body;

        const task = await taskModel.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.deadline = deadline || task.deadline;
        task.importance = importance || task.importance;
        task.status = status || task.status;

        const { score, tag } = calculatePriority(task.importance, task.deadline);
        task.priorityScore = score;
        task.tag = tag;

        await task.save();

        return res.status(200).json({
            message: "Task updated successfully",
            task,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await taskModel.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        return res.status(200).json({
            message: "Task deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const markComplete = async (req, res) => {
    try {
        const task = await taskModel.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        task.status = "completed";
        await task.save();

        return res.status(200).json({
            message: "Task marked as completed",
            task,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};