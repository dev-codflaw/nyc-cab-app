export default function LoginOptions() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-xl font-semibold mb-4">Login Options</h1>
            <a href="/login/mobile" className="w-full mb-2 p-3 text-center bg-black text-white rounded">Login with Mobile</a>
            <a href="/login/email" className="w-full mb-2 p-3 text-center bg-black text-white rounded">Login with Email</a>
            <a href="/login/gmail" className="w-full mb-2 p-3 text-center bg-black text-white rounded">Login with Gmail</a>
        </div>
    );
}
