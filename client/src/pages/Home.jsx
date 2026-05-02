import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00FFC6" strokeWidth="2" strokeLinecap="round">
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
            ),
            iconBg: "rgba(0,255,198,0.1)",
            title: "Smart Tracking",
            desc: "Real-time progress across all your tasks",
        },
        {
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00B8FF" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            ),
            iconBg: "rgba(0,184,255,0.1)",
            title: "Deadline Alerts",
            desc: "Never miss a deadline with smart reminders",
        },
        {
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                </svg>
            ),
            iconBg: "rgba(167,139,250,0.1)",
            title: "Instant Search",
            desc: "Find any task in milliseconds with fuzzy search",
        },
    ];

    return (
        <div className="min-h-screen bg-[#050818] text-white relative overflow-hidden flex flex-col">

            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,255,198,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,198,0.03) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="fixed top-[-120px] left-[-120px] w-[420px] h-[420px] rounded-full pointer-events-none z-0"
                style={{ background: "radial-gradient(circle, rgba(0,255,198,0.18), transparent 70%)", filter: "blur(80px)" }} />
            <div className="fixed bottom-[-80px] right-[-80px] w-[340px] h-[340px] rounded-full pointer-events-none z-0"
                style={{ background: "radial-gradient(circle, rgba(0,184,255,0.14), transparent 70%)", filter: "blur(80px)" }} />

            <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between border-b border-white/[0.06]"
                style={{ background: "rgba(5,8,24,0.8)", backdropFilter: "blur(20px)" }}>
                <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-[#00FFC6] to-[#00B8FF] bg-clip-text text-transparent">
                    TaskFlow
                </span>
                <div className="flex items-center gap-2 text-xs text-[#4a5a72] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#00FFC6] shadow-[0_0_8px_#00FFC6] animate-pulse inline-block" />
                    Live
                </div>
            </nav>

            {/* Main content */}
            <main className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 pt-28 pb-5 text-center">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00FFC6]/20 bg-[#00FFC6]/05 text-[#00FFC6] text-xs font-medium tracking-wide mb-7">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FFC6]" />
                    Smart Task Management
                </div>

                {/* Heading */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-4"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    Focus on what
                    <span className="block bg-gradient-to-r from-[#00FFC6] to-[#00B8FF] bg-clip-text text-transparent">
                        actually matters
                    </span>
                </h1>

                <p className="text-[#7a8ba6] text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-10">
                    Organize your work, track progress, and crush every deadline — all in one beautifully crafted space.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-12">
                    <button
                        onClick={() => navigate("/register")}
                        className="px-8 py-3.5 rounded-xl font-semibold text-[#050818] text-sm
                        bg-gradient-to-r from-[#00FFC6] to-[#00B8FF]
                        hover:opacity-90 hover:-translate-y-0.5 active:scale-[0.97]
                        transition-all duration-200 shadow-[0_0_24px_rgba(0,255,198,0.2)]"
                    >
                        Get Started Free
                    </button>
                    <button
                        onClick={() => navigate("/login")}
                        className="px-8 py-3.5 rounded-xl font-medium text-[#00FFC6] text-sm
                        border border-[#00FFC6]/30 bg-[#00FFC6]/04
                        hover:bg-[#00FFC6]/10 hover:border-[#00FFC6]/60 hover:-translate-y-0.5
                        transition-all duration-200"
                    >
                        Sign In
                    </button>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl">
                    {features.map(({ icon, iconBg, title, desc }) => (
                        <div
                            key={title}
                            className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] text-left
                            hover:border-[#00FFC6]/20 hover:bg-[#00FFC6]/[0.03] hover:-translate-y-1
                            transition-all duration-200 cursor-default"
                        >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                                style={{ background: iconBg }}>
                                {icon}
                            </div>
                            <p className="text-sm font-semibold text-white/80 mb-1">{title}</p>
                            <p className="text-xs text-[#4a5a72] leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>

            </main>

            <footer className="relative z-10 text-center pb-2">
                <p className="text-xs text-[#4a5a72]/60">Smart prioritization powered ⚡</p>
            </footer>
        </div>
    );
};

export default Home;