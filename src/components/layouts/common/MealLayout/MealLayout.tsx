"use client";
import { getAllOrQueryMeal } from "@/actions/meal.action";
import LoadingSpinner from "@/components/global/LoadingSpinner";
import { MealCard1 } from "@/components/modules/home/MealCard1";
import NoMealsFound from "@/components/modules/home/NoMealsFound";
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

const MealLayout = ({ meals: initailMeals }: { meals: MealCardType[] }) => {
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
      <aside className="bg-red-500 hidden basis-1/4 md:flex md:flex-col">
        this is aside
      </aside>
      <main className="basis-full md:basis-3/4">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
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
