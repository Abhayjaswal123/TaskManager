import { deleteTask, completeTask } from "../api/api.tasks";
import { Trash2, CheckCircle2, Clock, RotateCcw } from "./icons";

const tagStyles = {
    Urgent: "bg-red-500/15 text-red-400 border border-red-500/25",
    Important: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
    Normal: "bg-white/8 text-[#7a8ba6] border border-white/10",
};

const TaskCard = ({ task, onDelete, onUpdate }) => {
    const isOverdue = task.deadline && new Date(task.deadline) < new Date();
    const isCompleted = task.status === "completed";

    const handleDelete = async () => {
        await deleteTask(task._id);
        onDelete(task._id);
    };

    const handleComplete = async () => {
        const res = await completeTask(task._id);
        onUpdate(res.task);
    };

    const deadlineText = task.deadline
        ? new Date(task.deadline).toDateString()
        : "No deadline";

    return (
        <div className={`group relative p-5 rounded-xl border transition-all duration-200
            hover:border-[#00FFC6]/20 hover:shadow-[0_0_20px_rgba(0,255,198,0.06)]
            ${isCompleted
                ? "bg-white/[0.02] border-white/[0.05]"
                : "bg-white/[0.04] border-white/[0.08]"
            }`}>

            {isCompleted && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl bg-gradient-to-b from-[#00FFC6]/60 to-[#00B8FF]/60" />
            )}

            {isOverdue && !isCompleted && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl bg-red-500/60" />
            )}

            <div className="flex flex-col gap-3">

                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <h3 className={`text-base font-semibold leading-snug truncate
                            ${isCompleted ? "line-through text-[#4a5a72]" : "text-white"}`}>
                            {task.title}
                        </h3>

                        <div className="flex items-center gap-1.5 mt-1">
                            <Clock className="w-3 h-3 text-[#4a5a72]" />
                            <span className={`text-xs ${isOverdue && !isCompleted ? "text-red-400" : "text-[#4a5a72]"}`}>
                                {deadlineText}
                                {isOverdue && !isCompleted && " · Overdue"}
                            </span>
                        </div>
                    </div>

                    {task.tag && (
                        <span className={`shrink-0 px-2.5 py-0.5 text-xs font-medium rounded-full ${tagStyles[task.tag] || tagStyles.Normal}`}>
                            {task.tag}
                        </span>
                    )}
                </div>

                {task.description && (
                    <p className="text-sm text-[#7a8ba6] leading-relaxed line-clamp-2">
                        {task.description}
                    </p>
                )}

                <div className="flex items-center justify-between pt-1 border-t border-white/[0.05]">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                        ${isCompleted
                            ? "bg-[#00FFC6]/10 text-[#00FFC6]"
                            : "bg-white/5 text-[#7a8ba6]"
                        }`}>
                        {task.status}
                    </span>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleComplete}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                            transition-all duration-200 cursor-pointer
                            ${isCompleted
                                ? "bg-white/5 text-[#7a8ba6] hover:bg-white/10 border border-white/10"
                                : "bg-[#00FFC6]/10 text-[#00FFC6] hover:bg-[#00FFC6]/20 border border-[#00FFC6]/20"
                            }`}
                        >
                            {isCompleted
                                ? <><RotateCcw className="w-3 h-3" /> Undo</>
                                : <><CheckCircle2 className="w-3 h-3" /> Complete</>
                            }
                        </button>

                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                            bg-red-500/10 text-red-400 border border-red-500/20
                            hover:bg-red-500/20 hover:border-red-500/40
                            transition-all duration-200 cursor-pointer"
                        >
                            <Trash2 className="w-3 h-3" />
                            Delete
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TaskCard;