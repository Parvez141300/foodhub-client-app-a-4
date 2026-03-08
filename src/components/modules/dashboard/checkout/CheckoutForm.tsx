"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import divisionData from "@/data/bangladesh-divisions-districts.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCurrentUser } from "@/actions/user.action";
import { getUserCart } from "@/actions/cart.action";
import { BaggageClaim } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import PaymentSystem from "./PaymentSystem";
import Link from "next/link";
import LoadingCircleSpinner from "@/components/global/LoadingCircleSpinner";
import { createUserOrder } from "@/actions/order.action";

const formSchema = z.object({
  name: z.string().min(5, "name must be at least 5 characters."),
  phone: z.string().min(5, "phone must be at least 5 characters."),
  division: z.string().min(1, "Division is Required"),
  district: z.string().min(1, "District is Required"),
  thana: z.string().min(1, "thana is required"),
  area: z.string().min(1, "area is required"),
  street: z.string(),
  postal_code: z.string(),
});

export function CheckoutForm() {
  const [selectedDivision, setSelectedDivision] = React.useState("");
  const [districts, setDistricts] = React.useState<string[]>([]);
  const [userData, setUserData] = React.useState<any>(null);
  const [orderData, setOrderData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [orderLoading, setOrderLoading] = React.useState(false);
  console.log("order data", orderData);

  const orderSubtotal = orderData?.cartItems.reduce(
    (acc: number, curr: any) => curr.quantity * curr.meal.price + acc,
    0,
  );

  React.useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const session = await getCurrentUser();
        const userInfo = session?.user;
        if (userInfo) {
          setUserData(userInfo);
        } else {
          setUserData(null);
        }
        const cart = await getUserCart(userInfo?.id);
        const cartInfo = cart[0];
        if (cartInfo) {
          setOrderData(cartInfo);
        } else {
          setOrderData(null);
        }
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //   after selection of division then set district
  React.useEffect(() => {
    if (selectedDivision) {
      const division = divisionData.divisions.find(
        (div) => div.name === selectedDivision,
      );

      setDistricts(division?.districts || []);
    }
  }, [selectedDivision]);

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      division: "",
      district: "",
      thana: "",
      area: "",
      street: "",
      postal_code: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setOrderLoading(true);
      const toastId = toast.loading("Processing Checkout");
      try {
        if (orderData?.cartItems.length === 0) {
          return toast.error("There are not cart data to order", {
            id: toastId,
          });
        }
        const orderObject = {
          ...value,
          user_id: userData?.id,
          cartItems: [...orderData?.cartItems],
        };
        console.log("order object", orderObject);
        const result = await createUserOrder(orderObject);
        if (result?.id) {
          toast.success("Successfully ordered", { id: toastId });
        } else {
          toast.error("Failed to order", { id: toastId });
        }
      } catch (error: any) {
        toast.error(error.message, { id: toastId });
      } finally {
        setOrderLoading(false);
      }
    },
  });

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <Card className="lg:basis-2/3">
        <CardHeader>
          <CardTitle>Billing details</CardTitle>
          <CardDescription>
            Please fill out the form carefully. By following this information
            you will get your food parcel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="checkout-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              {/* name & phone */}
              <div className="flex flex-col md:flex-row items-center gap-7">
                {/* name field */}
                <form.Field
                  name="name"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Enter Your Name"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                {/* phone field */}
                <form.Field
                  name="phone"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Enter your phone number"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>
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
                          setSelectedDivision(value);
                          field.handleChange(value);
                        }}
                      >
                        <SelectTrigger aria-invalid={isInvalid}>
                          <SelectValue placeholder="Select Division" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          {divisionData.divisions.map((div) => (
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
                        disabled={districts.length === 0}
                      >
                        <SelectTrigger aria-invalid={isInvalid}>
                          <SelectValue placeholder="Select District" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          {districts.map((district, index) => (
                            <SelectItem key={index} value={district}>
                              {district}
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
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Enter your thana"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              {/* area field */}
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
                        aria-invalid={isInvalid}
                        placeholder="Enter your area"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              {/* street field */}
              <form.Field
                name="street"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Street</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Enter Your street address"
                      />
                    </Field>
                  );
                }}
              />
              {/* postal code field */}
              <form.Field
                name="postal_code"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Postal Code</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Enter your postal code"
                      />
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                setDistricts([]);
              }}
            >
              Reset
            </Button>
          </Field>
        </CardFooter>
      </Card>
      <Card className="lg:basis-1/3">
        <CardHeader>
          <CardTitle className="mb-5">Your Order</CardTitle>
          <Separator />
        </CardHeader>
        {loading ? (
          <LoadingCircleSpinner />
        ) : (
          <>
            <CardContent className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Meal</span>
                <span className="font-semibold">Regular Price</span>
              </div>
              {orderData?.cartItems.map((item: any) => (
                <div
                  key={item?.id}
                  className="flex justify-between items-center"
                >
                  <span>{item?.meal?.title}</span>
                  <span>{item?.meal?.price}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-semibold">Meal</span>
                <span className="font-semibold">Sub Total</span>
              </div>
              {orderData?.cartItems.map((item: any) => (
                <div
                  key={item?.id}
                  className="flex justify-between items-center"
                >
                  <span>
                    {item?.meal?.title} × {item?.quantity}
                  </span>
                  <span>{item?.meal?.price * item?.quantity}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between items-center">
                <span>Sub Total</span>
                <span>{orderSubtotal}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span>0</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span>Total Price</span>
                <span>{orderSubtotal + 0}</span>
              </div>
              <Separator />
              <PaymentSystem />
              <CardDescription>
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our{" "}
                <Link
                  href={"/terms-and-conditions"}
                  className="underline text-red-500"
                >
                  Terms and Conditions
                </Link>
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                form="checkout-form"
                className="w-full"
                disabled={orderLoading}
              >
                {orderLoading ? (
                  <>
                    <BaggageClaim /> Ordering...
                  </>
                ) : (
                  <>
                    <BaggageClaim /> Place Order
                  </>
                )}
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
