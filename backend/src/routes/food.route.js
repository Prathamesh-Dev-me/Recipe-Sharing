import express from "express";
import { getHeroMeals, searchFood, category } from "../controller/food.controller.js"
import { verifyjwt } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/random-food", getHeroMeals);
router.post("/search", searchFood);
router.get("/category", category);

export default router;