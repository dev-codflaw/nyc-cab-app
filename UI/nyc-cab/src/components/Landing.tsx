import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className="flex flex-col justify-center items-center p-4 min-h-screen">
            <h1 className="text-3xl font-bold mb-2">NYC-Cab</h1>
            <p className="mb-4 text-center text-gray-600">Drive smarter, earn more.</p>
            <Link to="/login" className="bg-black text-white p-3 rounded">Login / Register</Link>
        </div>
    );
}
