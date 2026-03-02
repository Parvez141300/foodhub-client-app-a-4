import NoCategoryFound from "@/components/modules/dashboard/MangeCategory/NoCategoryFound";
import HomeCategoryCard from "@/components/modules/home/HomeCategoryCard";
import { categoryService } from "@/services/category.service";
import React from "react";

const HomeCategories = async () => {
  const categories = await categoryService.getAllCategory();
  return (
    <div className="text-center space-y-5">
      <div>
        <h2 className="text-3xl font-bold mb-2">Food Categories</h2>
        <p className="text-muted-foreground">
          Explore our delicious food categories
        </p>
      </div>
      {
        categories.length === 0 && <NoCategoryFound />
      }
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {categories.map((category: any) => (
          <HomeCategoryCard key={category?.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
