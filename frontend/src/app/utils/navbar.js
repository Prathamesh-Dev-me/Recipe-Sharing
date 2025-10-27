import react from "react"

export default function NavBar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">

            {/* Logo */}
            <a href="#">
                <img src="\logo\1.png" alt="logo" className="w-12 h-12 rounded" />
            </a>

            {/* Navigation Links */}
            <ul className="flex gap-8 text-sm font-medium text-gray-700 ">
                <li><a className="hover:text-gray-400" href="/">Home</a></li>
                <li><a className="hover:text-gray-400" href="/trendy">Trendy</a></li>
                <li><a className="hover:text-gray-400" href="/friends">Friend's</a></li>
                <li><a className="hover:text-gray-400" href="/ai">AI</a></li>
                <li><a className="hover:text-gray-400" href="/about">About</a></li>
                <li><a className="hover:text-gray-400" href="/contact">Contact Us</a></li>
            </ul>

            {/* Profile Icon */}
            <a href="#">
                <img src="frontend\public\logo\1.png" alt="User" className="w-10 h-10 rounded-full" />
            </a>
        </nav>

    )
}