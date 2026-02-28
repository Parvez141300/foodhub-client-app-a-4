"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { Loader2, Save } from "lucide-react";
import React from "react";
import z from "zod";

// form validation schema
const mealFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(250, "Title too long"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(1, "Price must be greater than 0"),
  stock: z.number().min(0, "Stock cannot be negative"),
  category_id: z.string().min(1, "Please select a category"),
  cuisine_id: z.string().min(1, "Please select a cuisine"),
  dietery_id: z.string().min(1, "Please select a dietary preference"),
  is_available: z.boolean(),
});

type CategoriesType = {
  id: string;
  name: string;
};
type CuisinesType = {
  id: string;
  name: string;
};
type DietariesType = {
  id: string;
  name: string;
};

const CreateMealForm = ({
  categories,
  cuisines,
  dietaries,
}: {
  categories: CategoriesType[];
  cuisines: CuisinesType[];
  dietaries: DietariesType[];
}) => {
  const defaultValues = {
    title: "",
    description: "",
    price: 0,
    stock: 0,
    category_id: "",
    cuisine_id: "",
    dietery_id: "",
    is_available: true,
  };
  const form = useForm({
    defaultValues: defaultValues,
    validators: {
      onSubmit: mealFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("meal form data", value);
    },
  });

  return (
    <Card className="w-full">
      {/* card header */}
      <CardHeader>
        <CardTitle>Add New Meal</CardTitle>
        <CardDescription>
          Fill in the details below to create a meal
        </CardDescription>
      </CardHeader>

      {/* card content */}
      <CardContent>
        <form
          id="meal-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Title & Price & Stock in grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* title */}
              <form.Field
                name="title"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Meal Title *</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="e.g., Chicken Biryani"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              {/* Price */}
              <form.Field
                name="price"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Price (BDT) *
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                        placeholder="250"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Stock */}
              <form.Field
                name="stock"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Stock *</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                        placeholder="50"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </div>
            {/* select category, cuisine and dietary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Select */}
              <form.Field
                name="category_id"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Category *</FieldLabel>
                      <Select
                        value={field.state.value}
                        onValueChange={field.handleChange}
                        disabled={categories.length === 0}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Cuisine Select */}
              <form.Field
                name="cuisine_id"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Cuisine *</FieldLabel>
                      <Select
                        value={field.state.value}
                        onValueChange={field.handleChange}
                        disabled={cuisines.length === 0}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a cuisine" />
                        </SelectTrigger>
                        <SelectContent>
                          {cuisines?.map((cui) => (
                            <SelectItem key={cui.id} value={cui.id}>
                              {cui.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Dietery Select */}
              <form.Field
                name="dietery_id"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Dietary Preference *
                      </FieldLabel>
                      <Select
                        value={field.state.value}
                        onValueChange={field.handleChange}
                        disabled={dietaries.length === 0}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select dietary preference" />
                        </SelectTrigger>
                        <SelectContent>
                          {dietaries?.map((die) => (
                            <SelectItem key={die.id} value={die.id}>
                              {die.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </div>
            <Separator className="my-4" />
            {/* Description */}
            <form.Field
              name="description"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Description *</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Describe the meal, ingredients, etc."
                      className="h-60"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      {/* card footer */}
      <CardFooter className="flex justify-end gap-2 border-t pt-6">
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <>
              <Button
                type="reset"
                variant={"outline"}
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button form="meal-form" type="submit" disabled={!canSubmit}>
                 {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Create
                  </>
                )}
              </Button>
            </>
          )}
        />
      </CardFooter>
    </Card>
  );
};

export default CreateMealForm;
