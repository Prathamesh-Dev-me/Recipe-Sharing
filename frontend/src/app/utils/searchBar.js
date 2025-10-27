"use client";
import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch, placeholder = "Search..." }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(query.trim());
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center w-full max-w-md mx-auto bg-white rounded-full shadow-md overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-blue-400 transition-all"
        >
            <Search className="ml-3 text-gray-400" size={20} />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-full transition-colors"
            >
                Search
            </button>
        </form>
    );
}
