import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import LoginMethod from "./components/LoginMethod";
import MobileLogin from "./components/MobileLogin";
import OtpVerify from "./components/OtpVerify";
import Profile from "./components/Profile";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import Survey from "./components/Survey";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<LoginMethod />} />
                <Route path="/login-mobile" element={<MobileLogin />} />
                <Route path="/verify-otp" element={<OtpVerify />} />

                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/survey"
                    element={
                        <PrivateRoute>
                            <Survey />
                        </PrivateRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}
