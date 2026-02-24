"use client";
import { createDietary } from "@/actions/dietary.action";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React from "react";
import { toast } from "sonner";

const CreateDietaryInputField = () => {
  const handleCreate = async (e: any) => {
    e.preventDefault();
    const toastId = toast.loading("Creating dietary");
    const form = e.target;
    const dietary = form.dietary.value;
    if (!dietary.trim()) {
      return toast.error("Give valid dietary");
    }
    console.log(dietary);
    try {
      const res = await createDietary(dietary);
      if(!res?.id){
        return toast.error("This dietary is already availabe", {id: toastId});
      }
      toast.success("Successfully created dietary", { id: toastId });
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
            name="dietary"
            type="search"
            placeholder="dietary name..."
            required
          />
          <Button>Create</Button>
        </Field>
      </form>
    </div>
  );
};

export default CreateDietaryInputField;
