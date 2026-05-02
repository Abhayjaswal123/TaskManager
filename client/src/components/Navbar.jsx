import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "./icons";
import {logoutUser} from '../api/api.auth'
const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const handleLogout = async() => {
        await logoutUser();
        logout();
        navigate("/login");
    };

    const initials = user?.name
        ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : "?";

    return (
        <nav className="w-full fixed top-0 left-0 z-50 border-b border-white/[0.06]"
            style={{ background: "rgba(5,8,24,0.85)", backdropFilter: "blur(20px)" }}>
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3.5">

                <h1
                    onClick={() => navigate("/dashboard")}
                    className="text-lg font-extrabold tracking-tight cursor-pointer bg-gradient-to-r from-[#00FFC6] to-[#00B8FF] bg-clip-text text-transparent select-none"
                >
                    TaskFlow
                </h1>

                <div className="flex items-center gap-4">
                    {user && (
                        <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-[#050818]"
                                style={{ background: "linear-gradient(135deg, #00FFC6, #00B8FF)" }}>
                                {initials}
                            </div>
                            <span className="text-sm text-[#7a8ba6] hidden sm:block">
                                {user.name}
                            </span>
                        </div>
                    )}

                    <div className="w-px h-4 bg-white/10" />

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium
                        text-[#00FFC6] border border-[#00FFC6]/25 bg-[#00FFC6]/05
                        hover:bg-[#00FFC6]/10 hover:border-[#00FFC6]/50
                        transition-all duration-200 cursor-pointer"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        Logout
                    </button>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;