import react from "react"

export default function NavBar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
            {/* Profile Icon */}
            <a href="#">
                <img src="/profile.jpg" alt="User" className="w-10 h-10 rounded-full" />
            </a>

            {/* Logo */}
            <a href="#">
                <img src="/public/log/1.png" alt="logo" className="w-10 h-10 " />
            </a>

            {/* Navigation Links */}
            <ul className="flex gap-6 text-sm font-medium text-gray-700">
                <li><a href="/">Home</a></li>
                <li><a href="/trendy">Trendy</a></li>
                <li><a href="/friends">Friend's</a></li>
                <li><a href="/ai">AI</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact Us</a></li>
            </ul>
        </nav>

    )
}