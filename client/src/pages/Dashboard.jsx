import { useEffect, useState } from "react";
import { Search, Plus, CheckCircle2, ListTodo, Loader2 } from "../components/icons";
import Navbar from "../components/Navbar";
import { getTasks, createTask } from "../api/api.tasks";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const fetchTasks = async () => {
        setLoading(true);
        const data = await getTasks(search);
        setTasks(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchTasks();
    }, [search]);

    const handleAdd = async (taskData) => {
        const res = await createTask(taskData);
        if (res?.task) {
            setTasks((prev) => [res.task, ...prev]);
            setShowForm(false);
        }
    };

    const completedCount = tasks.filter((t) => t.status === "completed").length;
    const pendingCount = tasks.length - completedCount;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#050818] via-[#0a1930] to-[#091638] text-white">
            <Navbar />

            <div className="pt-24 pb-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-[#00FFC6] to-[#00B8FF] bg-clip-text text-transparent mb-2">
                        Dashboard
                    </h1>
                    <p className="text-[#A1ACBE]">Stay focused. Achieve more.</p>
                </div>

                {/* Stats */}
                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                    {[
                        {
                            label: "Total Tasks",
                            icon: ListTodo,
                            color: "from-[#00FFC6] to-[#00B8FF]",
                            value: tasks.length,
                        },
                        {
                            label: "Completed",
                            icon: CheckCircle2,
                            color: "from-[#00FFC6] to-green-400",
                            value: completedCount,
                        },
                        {
                            label: "In Progress",
                            icon: Loader2,
                            color: "from-orange-400 to-yellow-300",
                            value: pendingCount,
                        },
                    ].map(({ label, icon: Icon, color, value }, i) => (
                        <div
                            key={i}
                            className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:scale-[1.02]
                            transition-all duration-300 hover:border-[#00FFC6]/40 hover:shadow-[0_0_15px_#00FFC630]"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`p-3 rounded-lg bg-gradient-to-br ${color} opacity-90`}
                                >
                                    <Icon className="w-5 h-5 text-[#050818]" />
                                </div>
                                <div>
                                    <p className="text-2xl font-semibold">{value}</p>
                                    <p className="text-xs text-[#A1ACBE]">{label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A1ACBE]" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 rounded-lg bg-white/10 border border-white/10 
                            text-white placeholder-[#A1ACBE] focus:ring-2 focus:ring-[#00FFC6]/40
                            outline-none transition-all duration-300"
                        />
                    </div>

                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold
                        bg-gradient-to-r from-[#00FFC6] to-[#00B8FF] text-[#050818] hover:opacity-90 
                        active:scale-[0.97] shadow-[0_0_15px_#00FFC630] transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Add Task
                    </button>
                </div>

                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        showForm ? "max-h-96 opacity-100 mb-8" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                        <TaskForm onAdd={handleAdd} />
                    </div>
                </div>

                <div className="space-y-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="w-10 h-10 border-3 border-[#00FFC6]/20 border-t-[#00FFC6]
                                rounded-full animate-spin mb-4" />
                            <p className="text-[#A1ACBE]">Loading tasks...</p>
                        </div>
                    ) : tasks.length > 0 ? (
                        <div className="grid gap-4">
                            {tasks.map((task, i) => (
                                <div
                                    key={task._id}
                                    className="animate-fadeIn"
                                    style={{ animationDelay: `${i * 70}ms` }}
                                >
                                    <TaskCard
                                        task={task}
                                        onDelete={(id) =>
                                            setTasks((prev) => prev.filter((t) => t._id !== id))
                                        }
                                        onUpdate={(updatedTask) =>
                                            setTasks((prev) =>
                                                prev.map((t) =>
                                                    t._id === updatedTask._id
                                                        ? updatedTask
                                                        : t
                                                )
                                            )
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 
                            bg-white/5 rounded-xl border border-dashed border-white/10">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-[#00FFC6]/10">
                                <ListTodo className="w-8 h-8 text-[#00FFC6]" />
                            </div>
                            <p className="text-[#A1ACBE] text-lg mb-2">No tasks found</p>
                            <p className="text-[#A1ACBE]/70 text-sm">
                                {search ? "Try another search term" : "Create your first task today!"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
