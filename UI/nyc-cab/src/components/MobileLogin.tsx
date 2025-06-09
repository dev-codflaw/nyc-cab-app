import { useState } from "react";
import { sendOtp } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MobileLogin() {
    const [mobile, setMobile] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!mobile.trim()) {
            toast.warn("Enter mobile number");
            return;
        }
        try {
            const res = await sendOtp(mobile.trim());
            if (res.success) {
                toast.success("OTP sent!");
                localStorage.setItem("mobile", mobile.trim());
                navigate("/verify-otp");
            } else {
                toast.error(res.message || "Failed to send OTP.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error sending OTP.");
        }
    };

    return (
        <div className="flex flex-col p-4 min-h-screen">
            <input
                type="tel"
                placeholder="Mobile (with country code)"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="border p-3 rounded mb-4"
            />
            <button onClick={handleSubmit} className="bg-black text-white p-3 rounded">
                Send OTP
            </button>
        </div>
    );
}
