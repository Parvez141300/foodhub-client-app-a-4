import LoadingSpinner from "@/components/global/LoadingSpinner";
import { CategoryTable } from "@/components/modules/dashboard/MangeCategory/CategoryTable";
import CreateCategoryInputField from "@/components/modules/dashboard/MangeCategory/CreateCategoryInputField";
import { categoryService } from "@/services/category.service";
import React, { Suspense } from "react";

const MangeCategoriesPage = async () => {
  const categories = await categoryService.getAllCategory();
  return (
    <div className="space-y-5">
      <h3 className="text-xl">Create Category</h3>
      <CreateCategoryInputField />
      <h3 className="text-xl">Manage Categories</h3>
      <Suspense fallback={<LoadingSpinner />}>
        <CategoryTable categories={categories} />
      </Suspense>
    </div>
  );
};

export default MangeCategoriesPage;
