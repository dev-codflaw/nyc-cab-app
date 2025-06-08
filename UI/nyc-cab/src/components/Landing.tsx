export default function Landing() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to NYC-CAB</h1>
            <p className="text-gray-600 mb-8">
                Discover and manage your rides in NYC with our elegant, simple, and minimal app.
            </p>
            <a
                href="/login"
                className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800"
            >
                Login / Register
            </a>
        </div>
    );
}
