"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "@tanstack/react-form";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import divisionsData from "@/data/bangladesh-divisions-districts.json";
import { Loader2, Pencil, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const profileFormSchema = z.object({
  name: z.string().min(3, "Name Must be minimum 3 characters long"),
  email: z.email("Please enter valid email address"),
  phone: z.string().min(11, "phone number must be minimum 11 characters long"),
  division: z.string().min(1, "Please Chose division"),
  district: z.string().min(1, "Please chose district"),
  thana: z.string().min(2, "Please enter your post office"),
  area: z.string().min(2, "Please enter your area"),
  street: z.string(),
  postal_code: z.string(),
});

type UserDataType = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  is_active: string;
  profile?: {
    id: string;
    user_id: string;
    phone: string;
    created_at: string;
    updated_at: string;
    area: string;
    division: string;
    district: string;
    thana: string;
    postal_code?: string;
    street?: string;
  };
};

const UserProfile = ({ user }: { user: UserDataType }) => {
  const [userData, setUserData] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState(
    userData?.profile?.division || "",
  );
  const [districts, setDistricts] = useState<string[]>([]);
  //   form default values
  const defaultValues = {
    name: userData.name || "",
    email: userData.email || "",
    phone: userData?.profile?.phone || "",
    division: userData.profile?.division || "",
    district: userData.profile?.district || "",
    thana: userData.profile?.thana || "",
    area: userData.profile?.area || "",
    street: userData.profile?.street || "",
    postal_code: userData.profile?.postal_code || "",
  };
  const form = useForm({
    defaultValues: defaultValues,
    validators: {
      onSubmit: profileFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("profile form values", value);
    },
  });

  //   set district if division is selected
  useEffect(() => {
    const division = divisionsData.divisions.find(
      (div) => div.name === selectedDivision,
    );
    setDistricts(division?.districts || []);
  }, [selectedDivision]);
  return (
    <Card className="w-full">
      {/* card header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl">Manage Profile</CardTitle>
          <CardDescription>
            View and read your personal information
          </CardDescription>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(false)} variant="ghost">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        )}
      </CardHeader>
      {/* card content */}
      <CardContent>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile Info</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
          </TabsList>
          {/* profile tabs content */}

          {/* form */}
          <form
            id="profile-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <TabsContent value="profile" className="space-y-1">
              {/* Profile Header */}
              <div className="flex items-center gap-4 py-4">
                <Avatar className="h-20 w-20">
                  {userData?.image ? (
                    <>
                      <AvatarImage src={userData.image || ""} />
                      <AvatarFallback className="text-lg">
                        (userData.name)
                      </AvatarFallback>
                    </>
                  ) : (
                    <>
                      {" "}
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{userData.name}</h3>
                  <p className="text-muted-foreground">{userData.email}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge>{userData.role}</Badge>
                    {userData.emailVerified ? (
                      <Badge variant="default">Email Verified</Badge>
                    ) : (
                      <Badge variant="secondary">Email Not Verified</Badge>
                    )}
                  </div>
                </div>
              </div>
              <Separator />
              <FieldGroup>
                {/* name */}
                <form.Field
                  name="name"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Your Full Name
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          disabled={!isEditing}
                          placeholder="Give Your Full Name"
                        />
                      </Field>
                    );
                  }}
                />
                {/* email */}
                <form.Field
                  name="email"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Your Full Name
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          disabled={!isEditing}
                          placeholder="Give Your Email Address"
                        />
                      </Field>
                    );
                  }}
                />
                {/* phone */}
                <form.Field
                  name="phone"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Phone Number
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          disabled={!isEditing}
                          placeholder="01xxxxxxxxx"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </TabsContent>
            {/* profile address content */}
            <TabsContent value="address" className="space-y-1">
              {/* address form */}
              <FieldGroup>
                {/* division field */}
                <form.Field
                  name="division"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Division</FieldLabel>
                        <Select
                          name={field.name}
                          value={field.state.value}
                          onValueChange={(value) => {
                            field.handleChange(value);
                            setSelectedDivision(value);
                          }}
                          aria-invalid={isInvalid}
                          disabled={!isEditing}
                        >
                          <SelectTrigger id={field.name}>
                            <SelectValue placeholder="Select Division" />
                          </SelectTrigger>
                          <SelectContent>
                            {divisionsData.divisions.map((div) => (
                              <SelectItem key={div.id} value={div.name}>
                                {div.name}
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
                {/* district field */}
                <form.Field
                  name="district"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>District</FieldLabel>
                        <Select
                          name={field.name}
                          value={field.state.value}
                          onValueChange={(value) => {
                            field.handleChange(value);
                          }}
                          aria-invalid={isInvalid}
                          disabled={!isEditing || !selectedDivision}
                        >
                          <SelectTrigger id={field.name}>
                            <SelectValue placeholder="Select District" />
                          </SelectTrigger>
                          <SelectContent>
                            {districts.map((dis) => (
                              <SelectItem key={dis} value={dis}>
                                {dis}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    );
                  }}
                />
                {/* thana field */}
                <form.Field
                  name="thana"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Thana</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          disabled={!isEditing}
                          placeholder="Give Thana"
                        />
                      </Field>
                    );
                  }}
                />
                {/* Area */}
                <form.Field
                  name="area"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Area</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          disabled={!isEditing}
                          placeholder="Area name"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                {/* Street */}
                <form.Field
                  name="street"
                  children={(field) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Street</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        disabled={!isEditing}
                        placeholder="Street (optional)"
                      />
                    </Field>
                  )}
                />

                {/* Postal Code */}
                <form.Field
                  name="postal_code"
                  children={(field) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Postal Code</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        disabled={!isEditing}
                        placeholder="Postal Code (optional)"
                      />
                    </Field>
                  )}
                />
              </FieldGroup>
            </TabsContent>
          </form>
        </Tabs>
      </CardContent>
      {/* card footer */}
      {isEditing && (
        <CardFooter className="flex justify-end gap-2 border-t pt-6">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  form="profile-form"
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      সংরক্ষণ করা হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </>
                  )}
                </Button>
              </>
            )}
          />
        </CardFooter>
      )}
    </Card>
  );
};

export default UserProfile;
