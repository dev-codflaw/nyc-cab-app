import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="flex flex-col p-4 min-h-screen">
            <h2 className="text-xl font-bold mb-4">Welcome to Home!</h2>
            <button onClick={() => navigate("/profile")} className="bg-blue-600 text-white p-3 rounded mb-2">
                Profile
            </button>
            <a href="#" className="bg-green-600 text-white p-3 rounded mb-2 text-center">Join Community</a>
            <button onClick={() => navigate("/survey")} className="bg-purple-600 text-white p-3 rounded mb-2 text-center">
                Survey
            </button>
            <button onClick={logout} className="bg-red-600 text-white p-3 rounded">Logout</button>
        </div>
    );
}
