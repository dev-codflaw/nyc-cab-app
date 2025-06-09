import { useState, useEffect } from "react";
import { completeProfile, getProfile } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
    const [profile, setProfile] = useState({
        firstname: "",
        lastname: "",
        email: "",
        mobile: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await getProfile(token!);
                if (data.success && data.user) {
                    setProfile({
                        firstname: data.user.firstname || "",
                        lastname: data.user.lastname || "",
                        email: data.user.email || "",
                        mobile: data.user.mobile || ""
                    });
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to load profile.");
            }
        };
        loadProfile();
    }, [token]);

    const handleSubmit = async () => {
        // Trim all values
        const firstname = profile.firstname.trim();
        const lastname = profile.lastname.trim();
        const email = profile.email.trim();
        const mobile = profile.mobile.trim();

        // Check required fields
        if (!firstname || !lastname || !email) {
            toast.warn("All fields are required!");
            return;
        }

        setLoading(true);
        try {
            const res = await completeProfile(
                { firstname, lastname, email, mobile },
                token!
            );
            if (res.success) {
                toast.success("Profile updated successfully!");
                navigate("/home");
            } else {
                toast.error(res.message || "Failed to update profile.");
            }
        } catch (err: any) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Error updating profile.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setProfile((prev) => ({ ...prev, [field]: value.trimStart() })); // trimStart for better UX
    };

    return (
        <div className="flex flex-col p-4 min-h-screen">
            <input
                placeholder="First Name"
                value={profile.firstname}
                onChange={(e) => handleChange("firstname", e.target.value)}
                className="border p-3 rounded mb-2"
            />
            <input
                placeholder="Last Name"
                value={profile.lastname}
                onChange={(e) => handleChange("lastname", e.target.value)}
                className="border p-3 rounded mb-2"
            />
            <input
                placeholder="Email"
                value={profile.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="border p-3 rounded mb-2"
            />
            <input
                placeholder="Mobile"
                value={profile.mobile}
                disabled
                className="border p-3 rounded mb-2 bg-gray-100 cursor-not-allowed"
            />
            <button
                onClick={handleSubmit}
                className="bg-black text-white p-3 rounded"
                disabled={loading}
            >
                {loading ? "Submitting..." : "Submit"}
            </button>
            <br/>
            <button onClick={() => navigate("/home")} className="bg-blue-600 text-white p-3 rounded mb-2">
                Home
            </button>
        </div>
    );
}
