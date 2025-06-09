import { useState } from "react";
import { verifyOtp } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function OtpVerify() {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const mobile = localStorage.getItem("mobile");

    const handleVerify = async () => {
        if (!otp.trim()) {
            toast.warn("Please enter OTP!");
            return;
        }
        try {
            const res = await verifyOtp(mobile!, otp);
            if (res.success) {
                localStorage.setItem("token", res.token);
                toast.success("OTP verified successfully!");
                navigate("/profile");
            } else {
                toast.error(res.message || "OTP verification failed.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error verifying OTP.");
        }
    };

    return (
        <div className="flex flex-col p-4 min-h-screen">
            <input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border p-3 rounded mb-4"
            />
            <button onClick={handleVerify} className="bg-black text-white p-3 rounded">
                Verify OTP
            </button>
        </div>
    );
}
