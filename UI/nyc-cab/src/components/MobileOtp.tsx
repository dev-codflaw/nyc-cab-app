import { useState } from "react";
import { verifyOtp } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function MobileOtp() {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const mobile = localStorage.getItem("mobile") || "";

    const handleVerify = async () => {
        if (!otp) return alert("Enter OTP");
        setLoading(true);
        try {
            const res = await verifyOtp(mobile, otp);
            if (res.success) {
                localStorage.setItem("token", res.token); // save auth token
                navigate("/profile");
            } else {
                alert(res.message || "Invalid OTP");
            }
        } catch (err) {
            console.error(err);
            alert("Error verifying OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-xl font-semibold mb-4">Enter OTP</h1>
            <input
                type="text"
                placeholder="mobile number"
                className="border border-gray-300 p-3 rounded w-full mb-4"
                value={mobile}
                disabled
            />
            <input
                type="text"
                placeholder="Enter 6-digit OTP"
                className="border border-gray-300 p-3 rounded w-full mb-4"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <button
                onClick={handleVerify}
                className="w-full p-3 text-center bg-black text-white rounded"
                disabled={loading}
            >
                {loading ? "Verifying..." : "Verify"}
            </button>
        </div>
    );
}
