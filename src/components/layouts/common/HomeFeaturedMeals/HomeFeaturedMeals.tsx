import { HomeFeaturedCarousel } from "@/components/modules/home/HomeFeaturedCarousel/HomeFeaturedCarousel";
import { mealService } from "@/services/meal.service";
import React from "react";

const HomeFeaturedMeals = async () => {
  const featuredMeals = await mealService.getAllFeaturedMeals();
  console.log("featurd meals", featuredMeals);
  return (
    <div className="space-y-5">
      <h3 className="text-2xl font-semibold">Featured Meals</h3>
      <HomeFeaturedCarousel featuredMeals={featuredMeals} />
    </div>
  );
};

export default HomeFeaturedMeals;