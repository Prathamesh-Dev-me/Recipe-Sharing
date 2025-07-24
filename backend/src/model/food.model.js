import mongoose from "mongoose"

const FoodSchema = new mongoose.Schema({
    mealId: String,
    name: String,
    category: String,
    area: String,
    instructions: String,
    image: String,
    tags: String,
    youtube: String,
    source: String,
    ingredients: [String],
    measures: [String],
    expiresAt: Date
}, { timestamps: true });

const Food = mongoose.model("Food", FoodSchema);

export default Food;