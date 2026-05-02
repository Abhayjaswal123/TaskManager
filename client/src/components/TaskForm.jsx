import { useState } from "react";
import { Plus, AlignLeft, Calendar, Flag } from "./icons";

const inputClass = `w-full px-3.5 py-2.5 rounded-lg text-sm text-white placeholder-[#4a5a72]
    bg-white/[0.05] border border-white/[0.08]
    focus:outline-none focus:border-[#00FFC6]/40 focus:bg-white/[0.07]
    transition-all duration-200`;

const labelClass = "flex items-center gap-1.5 text-xs font-medium text-[#7a8ba6] mb-1.5";

const TaskForm = ({ onAdd }) => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        deadline: "",
        importance: 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(form);
        setForm({ title: "", description: "", deadline: "", importance: 1 });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div>
                <label className={labelClass}>
                    <Plus className="w-3 h-3" />
                    Task Title
                </label>
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    className={inputClass}
                />
            </div>

            {/* Description */}
            <div>
                <label className={labelClass}>
                    <AlignLeft className="w-3 h-3" />
                    Description
                </label>
                <textarea
                    placeholder="Add more details..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                    rows={3}
                    className={`${inputClass} resize-none`}
                />
            </div>

            {/* Date + Priority — 2 cols on all screen sizes */}
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className={labelClass}>
                        <Calendar className="w-3 h-3" />
                        Due Date
                    </label>
                    <input
                        type="date"
                        value={form.deadline}
                        onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                        required
                        className={`${inputClass} [color-scheme:dark]`}
                    />
                </div>

                <div>
                    <label className={labelClass}>
                        <Flag className="w-3 h-3" />
                        Priority
                    </label>
                    <select
                        value={form.importance}
                        onChange={(e) => setForm({ ...form, importance: Number(e.target.value) })}
                        className={inputClass}
                    >
                        <option value={1}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={3}>High</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg
                text-sm font-semibold text-[#050818] cursor-pointer
                bg-gradient-to-r from-[#00FFC6] to-[#00B8FF]
                hover:opacity-90 active:scale-[0.97]
                transition-all duration-200 shadow-[0_0_16px_rgba(0,255,198,0.2)]"
            >
                <Plus className="w-4 h-4" />
                Add Task
            </button>

        </form>
    );
};

export default TaskForm;