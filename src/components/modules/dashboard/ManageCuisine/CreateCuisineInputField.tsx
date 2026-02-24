"use client";
import { createCuisine } from "@/actions/cuisine.action";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React from "react";
import { toast } from "sonner";

const CreateCuisineInputField = () => {
  const handleCreate = async (e: any) => {
    e.preventDefault();
    const toastId = toast.loading("Creating cuisine");
    const form = e.target;
    const cuisine = form.cuisine.value;
    if (!cuisine.trim()) {
      return toast.error("Give valid cuisine");
    }
    console.log(cuisine);
    try {
      const res = await createCuisine(cuisine);
      console.log('cuisine response', res);
      if(!res?.id){
        return toast.error("This cuisine is already availabe", {id: toastId});
      }
      toast.success("Successfully created cuisine", { id: toastId });
      form.reset();
    } catch (error: any) {
      toast.error(error.message, {id: toastId});
    }
  };
  return (
    <div className="max-w-2xl">
      <form onSubmit={handleCreate}>
        <Field orientation="horizontal">
          <Input
            name="cuisine"
            type="search"
            placeholder="cuisine name..."
            required
          />
          <Button>Create</Button>
        </Field>
      </form>
    </div>
  );
};

export default CreateCuisineInputField;
