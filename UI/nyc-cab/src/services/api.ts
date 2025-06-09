import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Update this!

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const sendOtp = (mobile: string) =>
    api.post("/auth/send-otp", { mobile }).then((res) => res.data);

export const verifyOtp = (mobile: string, otp: string) =>
    api.post("/auth/verify-otp", { mobile, otp }).then((res) => res.data);

export const getProfile = (token: string) =>
    api
        .get("/auth/profile/me", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => res.data);

export const completeProfile = (profile: any, token: string) =>
    api
        .post("/auth/profile", profile, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.data);

export const submitSurvey = (surveyData: any, token: string) =>
    api
        .post("/auth/survey", surveyData, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.data);