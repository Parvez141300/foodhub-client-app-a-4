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
import { Label } from "@/components/ui/label";
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { FilterIcon, FunnelX } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState("");
  const [limit, setLimit] = useState("");
  const [value, setValue] = useState([0, 800]);
  console.log("price range", value);

  const searchParams = useSearchParams();
  const searched = searchParams.get("s");

  const category = searchParams.get("category");
  const cuisine = searchParams.get("cuisine");
  const dietery = searchParams.get("dietery");
  const sort_order = searchParams.get("sort_order");
  const itemLimit = searchParams.get("limit");
  const minimumPrice = searchParams.get("minPrice");
  const maximumPrice = searchParams.get("maxPrice");

  const router = useRouter();

  // first time render the url params to set in the state
  useEffect(() => {
    if (category) setSelectedCategory(category.split(","));
    if (cuisine) setSelectedCuisine(cuisine.split(","));
    if (dietery) setSelectedDietary(dietery.split(","));
    if (sort_order) setSortOrder(sort_order);
    if (itemLimit) setLimit(itemLimit);
    if (minimumPrice && maximumPrice)
      setValue([Number(minimumPrice), Number(maximumPrice)]);
  }, []);

  // fetch meal when url changes
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const queryObj: Record<string, string> = {
          search: "",
          category: "",
          cuisine: "",
          dietery: "",
          sort_order: "",
          limit: "",
          minPrice: "",
          maxPrice: "",
        };

        if (searched) queryObj.search = searched;
        if (category) queryObj.category = category;
        if (cuisine) queryObj.cuisine = cuisine;
        if (dietery) queryObj.dietery = dietery;
        if (sort_order) queryObj.sort_order = sort_order;
        if (itemLimit) queryObj.limit = itemLimit;
        if (minimumPrice) queryObj.minPrice = minimumPrice;
        if (maximumPrice) queryObj.maxPrice = maximumPrice;

        const result = await getAllOrQueryMeal(queryObj);
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
  }, [
    searched,
    category,
    cuisine,
    dietery,
    sort_order,
    itemLimit,
    minimumPrice,
    maximumPrice,
  ]);

  // handle category change
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategory([...selectedCategory, categoryId]);
    } else {
      setSelectedCategory(selectedCategory.filter((id) => id !== categoryId));
    }
  };

  // handle cuisine change
  const handleCuisineChange = (cuisineId: string, checked: boolean) => {
    if (checked) {
      setSelectedCuisine([...selectedCuisine, cuisineId]);
    } else {
      setSelectedCuisine(selectedCuisine.filter((id) => id !== cuisineId));
    }
  };

  // handle ditary change
  const handleDietaryChange = (dietaryId: string, checked: boolean) => {
    if (checked) {
      setSelectedDietary([...selectedDietary, dietaryId]);
    } else {
      setSelectedDietary(selectedDietary.filter((id) => id !== dietaryId));
    }
  };

  // handle apply filter
  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (searched) params.set("s", searched);
    if (selectedCategory.length > 0)
      params.set("category", selectedCategory.join(","));
    if (selectedCuisine.length > 0)
      params.set("cuisine", selectedCuisine.join(","));
    if (selectedDietary.length > 0)
      params.set("dietery", selectedDietary.join(","));
    if (sortOrder) {
      params.set("sort_order", sortOrder);
    } else {
      params.set("sort_order", "desc");
    }
    if (limit) {
      params.set("limit", limit);
    } else {
      params.set("limit", "9");
    }
    let minPrice = String(value[0]);
    let maxPrice = String(value[1]);
    if (value[0]) {
      params.set("minPrice", minPrice);
    } else {
      params.set("minPrice", "0");
    }
    if (value[1]) {
      params.set("maxPrice", maxPrice);
    } else {
      params.set("maxPrice", "800");
    }

    console.log("params", params.toString());
    router.push(`/meals?${params}`);
  };

  // handle reset filter
  const handleResetFilters = () => {
    setSelectedCategory([]);
    setSelectedCuisine([]);
    setSelectedDietary([]);
    setLimit("");
    setSortOrder("");
    const params = new URLSearchParams();
    setValue([0, 800]);
    if (searched) params.set("s", searched);
    router.push(`/meals?${params.toString()}`);
  };

  return (
    <div className="flex gap-5">
      {/* desktop filter left */}
      <aside className="hidden basis-1/4 md:flex md:flex-col gap-5">
        {/* categories */}
        <FieldSet className="gap-3">
          <h3 className="text-xl font-bold">Food Categories:</h3>
          <FieldGroup className="gap-3">
            {categories.length > 0 ? (
              categories?.map((category) => (
                <Field key={category?.id} orientation="horizontal">
                  <Checkbox
                    id={category?.id}
                    name={category?.id}
                    checked={selectedCategory.includes(category?.id)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category?.id, checked as boolean)
                    }
                  />
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
                  <Checkbox
                    id={cuisine?.id}
                    name={cuisine?.id}
                    checked={selectedCuisine.includes(cuisine?.id)}
                    onCheckedChange={(checked) =>
                      handleCuisineChange(cuisine?.id, checked as boolean)
                    }
                  />
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
                  <Checkbox
                    id={dietary?.id}
                    name={dietary?.id}
                    checked={selectedDietary.includes(dietary?.id)}
                    onCheckedChange={(checked) =>
                      handleDietaryChange(dietary?.id, checked as boolean)
                    }
                  />
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
        {/* price range */}
        <div className="flex w-full max-w-md flex-col gap-2">
          <Label htmlFor="slider">Price Range</Label>
          <Slider
            id="slider"
            max={10000}
            min={0}
            onValueChange={setValue}
            value={value}
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{value[0]}tk</span>
            <span>{value[1]}tk</span>
          </div>
        </div>
        <Separator />
        {/* apply or reset filters */}
        <div className="flex items-center gap-2">
          <Button type="reset" onClick={handleResetFilters}>
            <FunnelX /> Reset
          </Button>
          <Button type="submit" onClick={handleApplyFilters}>
            <FilterIcon /> Apply Filters
          </Button>
        </div>
      </aside>
      <main className="basis-full md:basis-3/4">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="flex justify-between items-center mb-5">
              <div>
                {/* mobile filter */}
                <div className="flex flex-col md:hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="capitalize">
                        <FilterIcon />
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]">
                      <div className="no-scrollbar overflow-y-auto px-4 my-6 space-y-5">
                        {/* categories */}
                        <FieldSet className="gap-3">
                          <h3 className="text-xl font-bold">
                            Food Categories:
                          </h3>
                          <FieldGroup className="gap-3">
                            {categories.length > 0 ? (
                              categories?.map((category) => (
                                <Field
                                  key={category?.id}
                                  orientation="horizontal"
                                >
                                  <Checkbox
                                    id={category?.id}
                                    name={category?.id}
                                    checked={selectedCategory.includes(
                                      category?.id,
                                    )}
                                    onCheckedChange={(checked) =>
                                      handleCategoryChange(
                                        category?.id,
                                        checked as boolean,
                                      )
                                    }
                                  />
                                  <FieldLabel
                                    htmlFor={category?.id}
                                    className="font-normal"
                                  >
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
                                <Field
                                  key={cuisine?.id}
                                  orientation="horizontal"
                                >
                                  <Checkbox
                                    id={cuisine?.id}
                                    name={cuisine?.id}
                                    checked={selectedCuisine.includes(
                                      cuisine?.id,
                                    )}
                                    onCheckedChange={(checked) =>
                                      handleCuisineChange(
                                        cuisine?.id,
                                        checked as boolean,
                                      )
                                    }
                                  />
                                  <FieldLabel
                                    htmlFor={cuisine?.id}
                                    className="font-normal"
                                  >
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
                                <Field
                                  key={dietary?.id}
                                  orientation="horizontal"
                                >
                                  <Checkbox
                                    id={dietary?.id}
                                    name={dietary?.id}
                                    checked={selectedDietary.includes(
                                      dietary?.id,
                                    )}
                                    onCheckedChange={(checked) =>
                                      handleDietaryChange(
                                        dietary?.id,
                                        checked as boolean,
                                      )
                                    }
                                  />
                                  <FieldLabel
                                    htmlFor={dietary?.id}
                                    className="font-normal"
                                  >
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
                        {/* price range */}
                        <div className="flex w-full max-w-md flex-col gap-2">
                          <Label htmlFor="slider">Price Range</Label>
                          <Slider
                            id="slider"
                            max={10000}
                            min={0}
                            onValueChange={setValue}
                            value={value}
                          />
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{value[0]}tk</span>
                            <span>{value[1]}tk</span>
                          </div>
                        </div>
                        <Separator />
                        {/* apply or reset filters */}
                        <div className="flex items-center gap-2">
                          <Button type="reset" onClick={handleResetFilters}>
                            <FunnelX /> Reset
                          </Button>
                          <Button type="submit" onClick={handleApplyFilters}>
                            <FilterIcon /> Apply Filters
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* order by */}
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Order By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Order By</SelectLabel>
                      <SelectItem value="asc">Accending</SelectItem>
                      <SelectItem value="desc">Deaccending</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {/* limit per page */}
                <Select value={limit} onValueChange={setLimit}>
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
