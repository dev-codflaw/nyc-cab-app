import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import LoginMethod from './components/LoginMethod';
import ProfileComplete from './components/ProfileComplete';
import Home from './components/Home';
import LoginMobile from "./components/LoginMobile.tsx";
import LoginEmail from "./components/LoginEmail.tsx";
import LoginGmail from "./components/LoginGmail.tsx";
import MobileOtp from "./components/MobileOtp.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<LoginMethod />} />
                <Route path="/login/mobile" element={<LoginMobile />} />
                <Route path="/login/email" element={<LoginEmail />} />
                <Route path="/login/gmail" element={<LoginGmail />} />
                <Route path="/otp" element={<MobileOtp />} />
                <Route path="/profile" element={<ProfileComplete />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}
