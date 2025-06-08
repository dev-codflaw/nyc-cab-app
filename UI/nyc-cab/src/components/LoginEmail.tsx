export default function LoginEmail() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-xl font-semibold mb-4">Login with Email</h1>
            <input
                type="email"
                placeholder="Email Address"
                className="border border-gray-300 p-3 rounded w-full mb-4"
            />
            <input
                type="password"
                placeholder="Password"
                className="border border-gray-300 p-3 rounded w-full mb-4"
            />
            <a
                href="/profile"
                className="w-full p-3 text-center bg-black text-white rounded"
            >
                Login
            </a>
        </div>
    );
}
