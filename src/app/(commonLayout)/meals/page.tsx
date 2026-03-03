import MealLayout from "@/components/layouts/common/MealLayout/MealLayout";
import { categoryService } from "@/services/category.service";
import { cuisineService } from "@/services/cuisine.service";
import { dietaryService } from "@/services/dietary.service";
import { mealService } from "@/services/meal.service";
import React from "react";

const MealsPage = async () => {
  const meals = await mealService.getAllOrQueryMeal();
  const [categories, cuisines, dietaries] = await Promise.all([
    categoryService.getAllCategory(),
    cuisineService.getAllCuisine(),
    dietaryService.getAllDietary(),
  ]);

  return (
    <div>
      <MealLayout meals={meals?.data} categories={categories} cuisines={cuisines} dietaries={dietaries} />
    </div>
  );
};

export default MealsPage;
