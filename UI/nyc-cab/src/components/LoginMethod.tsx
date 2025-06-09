import { useNavigate } from "react-router-dom";

export default function LoginMethod() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col p-4 min-h-screen">
            <h2 className="text-xl font-bold mb-4">Login / Register</h2>
            <button
                onClick={() => navigate("/login-mobile")}
                className="bg-blue-600 text-white p-4 rounded mb-2 w-full"
            >
                Login with Mobile
            </button>
        </div>
    );
}
