import MealLayout from "@/components/layouts/common/MealLayout/MealLayout";
import { mealService } from "@/services/meal.service";
import React from "react";

const MealsPage = async () => {
  const meals = await mealService.getAllOrQueryMeal();
  return (
    <div>
      this is meals page
      <MealLayout meals={meals?.data} />
    </div>
  );
};

export default MealsPage;
