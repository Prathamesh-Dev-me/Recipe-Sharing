export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-10">
                <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Login</h2>
                <form method="POST" action="http://localhost:9000/api/v1/user/login" className="space-y-6">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
                    />
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <label>
                            <input type="checkbox" className="mr-2" />
                            Remember me
                        </label>
                        <a href="#" className="text-purple-600 hover:underline">Forgot Password?</a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
