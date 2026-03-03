"use client";
import { getAllOrQueryMeal } from "@/actions/meal.action";
import LoadingSpinner from "@/components/global/LoadingSpinner";
import NoCuisineFound from "@/components/modules/dashboard/ManageCuisine/NoCuisineFound";
import NoCategoryFound from "@/components/modules/dashboard/MangeCategory/NoCategoryFound";
import NoDietaryFound from "@/components/modules/dashboard/MangeDietary/NoDietaryFound";
import { MealCard1 } from "@/components/modules/home/MealCard1";
import NoMealsFound from "@/components/modules/home/NoMealsFound";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { FilterIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

type MealCardType = {
  id: string;
  title: string;
  stock: number;
  price: number;
  image_url: string;
  is_available: boolean;
};

type CategoryType = {
  id: string;
  name: string;
};

type CuisineType = {
  id: string;
  name: string;
};

type DietaryType = {
  id: string;
  name: string;
};

const MealLayout = ({
  meals: initailMeals,
  categories,
  cuisines,
  dietaries,
}: {
  meals: MealCardType[];
  categories: CategoryType[];
  cuisines: CuisineType[];
  dietaries: DietaryType[];
}) => {
  const [meals, setMeals] = useState(initailMeals || []);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const searched = searchParams.get("s");

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const result = await getAllOrQueryMeal({ search: searched });
        console.log("searhed result meals", result);
        if (result?.data) {
          setMeals(result?.data);
        } else {
          setMeals([]);
        }
      } catch (error) {
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [searched]);

  return (
    <div className="flex gap-5">
      <aside className="hidden basis-1/4 md:flex md:flex-col gap-5">
        {/* categories */}
        <FieldSet className="gap-3">
          <h3 className="text-xl font-bold">Food Categories:</h3>
          <FieldGroup className="gap-3">
            {categories.length > 0 ? (
              categories?.map((category) => (
                <Field key={category?.id} orientation="horizontal">
                  <Checkbox id={category?.id} name={category?.id} />
                  <FieldLabel htmlFor={category?.id} className="font-normal">
                    {category?.name}
                  </FieldLabel>
                </Field>
              ))
            ) : (
              <NoCategoryFound />
            )}
          </FieldGroup>
        </FieldSet>
        <Separator />
        {/* cuisines */}
        <FieldSet className="gap-3">
          <h3 className="text-xl font-bold">Food Cuisines:</h3>
          <FieldGroup className="gap-3">
            {cuisines.length > 0 ? (
              cuisines?.map((cuisine) => (
                <Field key={cuisine?.id} orientation="horizontal">
                  <Checkbox id={cuisine?.id} name={cuisine?.id} />
                  <FieldLabel htmlFor={cuisine?.id} className="font-normal">
                    {cuisine?.name}
                  </FieldLabel>
                </Field>
              ))
            ) : (
              <NoCuisineFound />
            )}
          </FieldGroup>
        </FieldSet>
        <Separator />
        {/* ditaries */}
        <FieldSet className="gap-3">
          <h3 className="text-xl font-bold">Food Dietaries:</h3>
          <FieldGroup className="gap-3">
            {dietaries.length > 0 ? (
              dietaries?.map((dietary) => (
                <Field key={dietary?.id} orientation="horizontal">
                  <Checkbox id={dietary?.id} name={dietary?.id} />
                  <FieldLabel htmlFor={dietary?.id} className="font-normal">
                    {dietary?.name}
                  </FieldLabel>
                </Field>
              ))
            ) : (
              <NoDietaryFound />
            )}
          </FieldGroup>
        </FieldSet>
        <Separator />
        
        <Button type="submit">
          <FilterIcon /> Apply Filters
        </Button>
      </aside>
      <main className="basis-full md:basis-3/4">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="flex justify-between items-center mb-5">
              <div></div>
              <div className="flex items-center gap-2">
                {/* order by */}
                <Select>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Order By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Order By</SelectLabel>
                      <SelectItem value="apple">Accending</SelectItem>
                      <SelectItem value="banana">Deaccending</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {/* limit per page */}
                <Select>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Show" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Show</SelectLabel>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="9">9</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {meals?.length === 0 && <NoMealsFound />}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {meals.map((meal: any) => (
                <MealCard1 key={meal?.id} meal={meal} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default MealLayout;
