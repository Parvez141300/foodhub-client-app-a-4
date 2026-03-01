import LoadingSpinner from "@/components/global/LoadingSpinner";
import EditMealForm from "@/components/modules/dashboard/ManageMeal/EditMealForm/EditMealForm";
import { categoryService } from "@/services/category.service";
import { cuisineService } from "@/services/cuisine.service";
import { dietaryService } from "@/services/dietary.service";
import { mealService } from "@/services/meal.service";
import React, { Suspense } from "react";

const EditeMealPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const [categories, cuisines, dietaries, meal] = await Promise.all([
    categoryService.getAllCategory(),
    cuisineService.getAllCuisine(),
    dietaryService.getAllDietary(),
    mealService.getMealById(id),
  ]);

  

  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <EditMealForm
        categories={categories}
        cuisines={cuisines}
        dietaries={dietaries}
        initialData={meal}
        mealId={id}
      />
      </Suspense>
    </div>
  );
};

export default EditeMealPage;
