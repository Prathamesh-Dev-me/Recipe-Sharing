"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import SearchBar from "./searchBar.js";
import SearchedRecipes from "./searchRecipes.js";

export default function Hero() {
    const [data, setData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const resultsRef = useRef(null); // for smooth scroll

    // Fetch random meals on load
    useEffect(() => {
        let mounted = true;

        axios
            .get("http://localhost:9000/api/v1/food/random-food")
            .then((res) => {
                if (!mounted) return;
                const payload = res.data?.data || res.data;
                setData(Array.isArray(payload) ? payload : [payload]);
            })
            .catch((err) => {
                if (!mounted) return;
                console.error(err);
                setError(err);
            })
            .finally(() => {
                if (!mounted) return;
                setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, [refreshKey]);

    if (loading) return <div className="text-center text-gray-500 py-10">Loading...</div>;
    if (error) return <div className="text-center text-red-500 py-10">Error loading data.</div>;

    // 🔹 Handle search with POST /search/:query
    const handleSearch = async (query) => {
        if (!query.trim()) return;

        try {
            const res = await axios.get(
                `http://localhost:9000/api/v1/food/search/${encodeURIComponent(query)}`
            );

            const payload = res.data?.data || res.data;
            setSearchResults(Array.isArray(payload) ? payload : [payload]);

            // scroll to results
            setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 200);
        } catch (error) {
            console.error("Search error:", error);
            setSearchResults([]);
        }
    };

    return (
        <div className="bg-gradient-to-b from-white to-gray-100 py-16 px-6">
            {/* Hero Heading */}
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
                    Our Delicious Meals
                </h1>
                <p className="text-gray-600 text-lg">
                    Explore our chef’s special dishes, made fresh and served with love.
                </p>
            </div>

            {/* Featured Random Meals */}
            <div className="flex flex-wrap justify-center gap-10">
                {data.length === 0 ? (
                    <div className="text-gray-600 text-lg font-medium">No meals found.</div>
                ) : (
                    data.map((item) => (
                        <div
                            key={item.mealId}
                            className="bg-white shadow-xl rounded-2xl overflow-hidden w-80 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                        >
                            <img
                                className="h-52 w-full object-cover"
                                src={item.image}
                                alt={item.name || "food image"}
                            />

                            <div className="p-5 text-left flex flex-col h-64">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2 truncate">
                                    {item.name}
                                </h2>
                                <p className="text-gray-500 mb-1">
                                    <span className="font-semibold text-gray-700">Category:</span>{" "}
                                    {item.category}
                                </p>
                                <p className="text-gray-500 mb-3">
                                    <span className="font-semibold text-gray-700">Area:</span>{" "}
                                    {item.area}
                                </p>

                                <div className="relative flex-1 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                                    <div className="absolute inset-0 p-2 text-sm text-gray-600 overflow-hidden hover:overflow-y-auto scroll-smooth">
                                        {item.instructions}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="flex items-center justify-center mt-10">
                <button className="text-black font-medium bg-white rounded-2xl px-4 py-3 shadow-xl transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer" onClick={() => setRefreshKey(prev => prev + 1)}>Refresh Meals</button>
            </div>
            
            {/* Search Section */}
            <div className="text-center mb-10 mt-16">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    Find Your Favorite Meal
                </h2>
                <p className="text-gray-500 mb-6">
                    Search by name, category, or area — discover something new!
                </p>
                <SearchBar onSearch={handleSearch} placeholder="Search meals..." />
            </div>

            {/* Search Results */}
            <div ref={resultsRef}>
                {searchResults.length > 0 && <SearchedRecipes results={searchResults} />}
            </div>
        </div>
    );
}
