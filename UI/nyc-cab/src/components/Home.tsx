export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-xl font-semibold mb-4">Welcome to NYC-CAB</h1>
            <a href="/profile" className="w-full mb-2 p-3 text-center bg-black text-white rounded">Profile</a>
            <a href="/" className="w-full mb-2 p-3 text-center bg-black text-white rounded">Logout</a>
            <a href="#" className="w-full mb-2 p-3 text-center bg-black text-white rounded">Join Community</a>
            <a href="#" className="w-full mb-2 p-3 text-center bg-black text-white rounded">Survey</a>
        </div>
    );
}
