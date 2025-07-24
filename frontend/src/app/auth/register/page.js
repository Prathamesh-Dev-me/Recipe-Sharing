export default function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
                <form method="POST" className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter your username"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
                    />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black" 
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
                    />
                    <input
                        type="file"
                        name="img"
                        accept="image/*"
                        className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
