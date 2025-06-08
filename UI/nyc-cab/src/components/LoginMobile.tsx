import { useState } from "react";
import { sendOtp } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function LoginMobile() {
    const [mobile, setMobile] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        if (!mobile) return alert("Please enter mobile number");
        setLoading(true);
        try {
            const res = await sendOtp(mobile);
            if (res.success) {
                localStorage.setItem("mobile", mobile); // store mobile for OTP verification
                navigate("/otp");
            } else {
                alert(res.message || "Failed to send OTP");
            }
        } catch (err) {
            console.error(err);
            alert("Error sending OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-xl font-semibold mb-4">Enter Mobile Number</h1>
            <input
                type="tel"
                placeholder="Country Code + Mobile Number"
                className="border border-gray-300 p-3 rounded w-full mb-4"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
            />
            <button
                onClick={handleSendOtp}
                className="w-full p-3 text-center bg-black text-white rounded"
                disabled={loading}
            >
                {loading ? "Sending..." : "Send OTP"}
            </button>
        </div>
    );
}
