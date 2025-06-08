import { useState } from "react";
import { completeProfile } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ProfileComplete() {
    const [profile, setProfile] = useState({
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const { firstname, lastname, email, mobile } = profile;
        if (!firstname || !lastname || !email || !mobile ) {
            return alert("Please fill in all fields.");
        }

        setLoading(true);
        try {
            const res = await completeProfile(profile);
            if (res.success) {
                alert("Profile completed successfully!");
                navigate("/home");
            } else {
                alert(res.message || "Failed to complete profile.");
            }
        } catch (err) {
            console.error(err);
            alert("Error completing profile.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-xl font-semibold mb-4">Complete Profile</h1>

            <input
                type="text"
                placeholder="First Name"
                className="border border-gray-300 p-3 rounded w-full mb-4"
                value={profile.firstname}
                onChange={(e) => handleChange("firstname", e.target.value)}
            />

            <input
                type="text"
                placeholder="Last Name"
                className="border border-gray-300 p-3 rounded w-full mb-4"
                value={profile.lastname}
                onChange={(e) => handleChange("lastname", e.target.value)}
            />

            <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 p-3 rounded w-full mb-4"
                value={profile.email}
                onChange={(e) => handleChange("email", e.target.value)}
            />

            <input
                type="tel"
                placeholder="Mobile"
                className="border border-gray-300 p-3 rounded w-full mb-4"
                value={profile.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
            />


            <button
                onClick={handleSubmit}
                className="w-full p-3 text-center bg-black text-white rounded"
                disabled={loading}
            >
                {loading ? "Submitting..." : "Submit"}
            </button>
        </div>
    );
}
