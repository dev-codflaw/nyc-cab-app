export default function LoginGmail() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-xl font-semibold mb-4">Login with Gmail</h1>
            <button
                className="bg-red-500 text-white p-3 rounded w-full"
                onClick={() => alert('Gmail Login Flow here!')}
            >
                Continue with Gmail
            </button>
        </div>
    );
}
