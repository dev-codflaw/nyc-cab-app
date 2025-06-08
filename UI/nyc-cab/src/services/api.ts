import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Update to your Node.js API URL

export const sendOtp = async (mobile: string) => {
    const res = await axios.post(`${API_BASE_URL}/auth/send-otp`, { mobile });
    return res.data;
};

export const verifyOtp = async (mobile: string, otp: string) => {
    const res = await axios.post(`${API_BASE_URL}/auth/verify-otp`, { mobile, otp });
    return res.data;
};

export const completeProfile = async (profile: { firstName: string; lastName: string; email: string; mobile: string; }) => {
    const res = await axios.post(`${API_BASE_URL}/auth/profile`, profile);
    return res.data;
};
