import { MealCard1 } from "@/components/modules/home/MealCard1";
import { mealService } from "@/services/meal.service";
import React from "react";

const HomeCardsNewProducts = async () => {
  const meals = await mealService.getHomeMeals();
  console.log("meals", meals.data);
  return (
    <div className="space-y-5">
      <h3 className="text-2xl font-semibold">
        New Products ({meals?.data?.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {meals?.data?.slice(0, 8).map((meal: any) => (
          <MealCard1 key={meal?.id} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default HomeCardsNewProducts;
