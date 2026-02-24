"use client";
import { createCategory } from "@/actions/category.action";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React from "react";
import { toast } from "sonner";

const CreateCategoryInputField = () => {
  const handleCreate = async (e: any) => {
    e.preventDefault();
    const toastId = toast.loading("Creating category");
    const category = e.target.category.value;
    if (!category.trim()) {
      return toast.error("Give valid category");
    }
    console.log(category);
    try {
      const res = await createCategory(category);
      console.log('category response', res);
      if(!res?.id){
        return toast.error("Category creation failed", {id: toastId});
      }
      toast.success("Successfully created category", { id: toastId });
    } catch (error: any) {
      toast.error(error.message, {id: toastId});
    }
  };
  return (
    <div className="max-w-2xl">
      <form onSubmit={handleCreate}>
        <Field orientation="horizontal">
          <Input
            name="category"
            type="search"
            placeholder="category name..."
            required
          />
          <Button>Create</Button>
        </Field>
      </form>
    </div>
  );
};

export default CreateCategoryInputField;
