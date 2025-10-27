"use client";
import React from "react";

export default function SearchedRecipes({ results = [] }) {
    if (!results || results.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500 text-lg">
                No recipes found. Try a different search.
            </div>
        );
    }

    return (
        <section className="bg-white py-14 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
                    Search Results
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {results.map((recipe) => (
                        <div
                            key={recipe.idMeal}
                            className="border border-gray-200 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300 overflow-hidden"
                        >
                            <img
                                src={recipe.strMealThumb}
                                alt={recipe.strMeal || "Recipe image"}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                    {recipe.strMeal}
                                </h3>
                                <p className="text-sm text-gray-500 mb-2">
                                    <span className="font-medium text-gray-700">Category:</span>{" "}
                                    {recipe.strCategory}
                                </p>
                                <p className="text-sm text-gray-500 mb-3">
                                    <span className="font-medium text-gray-700">Area:</span>{" "}
                                    {recipe.strArea}
                                </p>

                                <div className="relative h-24 overflow-hidden rounded-md border border-gray-200">
                                    <div className="absolute inset-0 text-sm text-gray-600 p-2 overflow-hidden hover:overflow-y-auto scroll-smooth">
                                        {recipe.strInstructions}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
