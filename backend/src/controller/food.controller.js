import axios from "axios";
import Food from "../model/food.model.js";
import asyncHandler from "../util/asyncHandler.js";
import ApiResponse from "../util/ApiResponse.js";
import ApiError from "../util/ApiError.js";

export const getHeroMeals = asyncHandler(async (req, res) => {
    const foodData = await Food.find({ expiresAt: { $gt: new Date() } }).limit(3);

    if (foodData.length === 3) {
        return res.status(200).json(new ApiResponse(200, foodData, "Fetched from DB"));
    }

    const meals = [];

    for (let i = 0; i < 3; i++) {
        const { data } = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
        const meal = data.meals[0];

        // Extract ingredients
        const ingredients = [];
        const measures = [];

        for (let j = 1; j <= 20; j++) {
            const ingredient = meal[`strIngredient${j}`];
            const measure = meal[`strMeasure${j}`];
            if (ingredient && ingredient.trim() !== "") {
                ingredients.push(ingredient);
                measures.push(measure ? measure : "");
            }
        }

        meals.push({
            mealId: meal.idMeal,
            name: meal.strMeal,
            category: meal.strCategory,
            area: meal.strArea,
            instructions: meal.strInstructions,
            image: meal.strMealThumb,
            tags: meal.strTags,
            youtube: meal.strYoutube,
            source: meal.strSource,
            ingredients,
            measures,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day expiry
        });
    }

    // Clear old data
    await Food.deleteMany({});

    // Save new meals
    const insertedMeals = await Food.insertMany(meals);

    res.status(200).json(new ApiResponse(200, insertedMeals, "Fetched fresh meals from API"));
});

export const searchFood = asyncHandler(async (req, res) => {
    const { meal_name } = req.params;
    const meals = [];

    if (!meal_name) {
        throw new ApiError(400, "Please provide a meal name.")
    }

    const { data } = await axios.get(`https://themealdb.com/api/json/v1/1/search.php?s=${meal_name}`);

    if (!data || !data.meals) {
        throw new ApiError(404, "Meal not found.");
    }

    for (let i = 0; i < data.meals.length; i++) {
        meals.push(data.meals[i]);
    }

    console.log(meals)
    
    if (meals.length == 0) {
        throw new ApiError(500, "not able to add in meals")
    }

    return res.status(200).json(new ApiResponse(200, meals, "Food fetched successfully"));

});

export const category = asyncHandler(async (req, res) => {
    const { data: vegData } = await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian");
    const { data: chickenData } = await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken");
    const { data: lambData } = await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Lamb");
    const { data: porkData } = await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Pork");
    const { data: seafoodData } = await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood");
    const { data: dessertData } = await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert");

    return res.status(200).json(
        new ApiResponse(200, {
            vegetarian: vegData.meals,
            chicken: chickenData.meals,
            lamb: lambData.meals,
            pork: porkData.meals,
            seafood: seafoodData.meals,
            dessert: dessertData.meals
        }, "Categories fetched successfully")
    );
});
