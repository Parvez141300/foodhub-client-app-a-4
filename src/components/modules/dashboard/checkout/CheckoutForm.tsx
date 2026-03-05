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

// [
//     {
//         "id": "cf58f5c5-c85b-4669-a14d-c110c1fbd8f9",
//         "cart_id": "8b187bfe-a27e-4470-92d8-86bd0c4e79de",
//         "meal_id": "77eda86e-d654-4296-8018-2c2d7e641866",
//         "quantity": 1,
//         "meal": {
//             "id": "77eda86e-d654-4296-8018-2c2d7e641866",
//             "provider_id": "XGyEl3WBuhGpx4DAT82DQKRvSnKlI3oF",
//             "category_id": "e5e8b32f-b0cc-481d-9675-4b7c5d4d0308",
//             "cuisine_id": "af8a832f-1879-4418-acae-e842c641e64c",
//             "dietery_id": "90d4bcae-1331-45c6-8e29-e6fcf00693a7",
//             "title": "Chicken Taco",
//             "description": "Chicken Taco Recipe - Valentina's CornerChicken tacos feature seasoned, tender shredded or diced chicken served in warm corn or flour tortillas. Common variations include crispy baked, grilled, or street-style, typically topped with cheese, diced onion, cilantro, salsa verde, and lime juice. They are often accompanied by sides like sour cream, guacamole, or pico de gallo. \n\nIsland Vibe Cooking\nYouTube • May 22, 2024\nKey Characteristics and Variations:\nProtein: Usually shredded chicken breast or thighs, sometimes seasoned with cumin, chili powder, and garlic.\nTexture: Can be soft (street-style) or crispy (baked in the oven).\nFlavor Profile: Ranging from smoky and spicy to tangy with citrus.\nCommon Toppings: Shredded lettuce, tomatoes, jack cheese, jalapeño ranch, and cilantro. \n\nCommon Preparation Styles:\nBaked/Crispy: Shredded chicken and cheese are placed in tortillas and baked until crunchy.\nStreet-Style: Grilled chicken with simple toppings like raw onion and cilantro.\nSkillet: Diced chicken cooked in a pan, sometimes with a sauce made from tomatoes or chiles.",
//             "stock": 70,
//             "price": 400,
//             "image_url": "https://res.cloudinary.com/dapbx8al2/image/upload/v1772447350/uy9duuutatlx4rks7koa.jpg",
//             "is_available": true,
//             "is_featured": true,
//             "created_at": "2026-03-02T10:29:28.586Z",
//             "updated_at": "2026-03-02T10:29:28.586Z",
//             "category": {
//                 "id": "e5e8b32f-b0cc-481d-9675-4b7c5d4d0308",
//                 "name": "taco"
//             },
//             "cuisine": {
//                 "id": "af8a832f-1879-4418-acae-e842c641e64c",
//                 "name": "Mexican"
//             },
//             "dietery": {
//                 "id": "90d4bcae-1331-45c6-8e29-e6fcf00693a7",
//                 "name": "Keto"
//             }
//         }
//     },
//     {
//         "id": "11377c60-aa5d-4697-8725-498fc79d0084",
//         "cart_id": "8b187bfe-a27e-4470-92d8-86bd0c4e79de",
//         "meal_id": "5efeefd3-2c61-4ade-9ba7-44f24448bfc5",
//         "quantity": 1,
//         "meal": {
//             "id": "5efeefd3-2c61-4ade-9ba7-44f24448bfc5",
//             "provider_id": "XGyEl3WBuhGpx4DAT82DQKRvSnKlI3oF",
//             "category_id": "59f73a5f-6515-443c-affb-0b8b234a347e",
//             "cuisine_id": "42b630b8-472d-48d1-b108-72dcd87db609",
//             "dietery_id": "dfe31fa4-573e-443b-b7e6-f97da8e12578",
//             "title": "Chicken Sandwich",
//             "description": "A classic turkey sandwich consists of sliced turkey breast—deli-style or roasted—layered with lettuce, tomato, and cheese (like cheddar, Swiss, or Monterey Jack) between slices of bread, often complemented by mayonnaise or mustard. It is a versatile, fresh, and savory meal that can be served cold or toasted/grilled, sometimes upgraded with bacon and avocado. \n\nIn The Kitchen With Gina Young\nYouTube • Sep 8, 2025\nCommon Variations:\nTurkey Club: A double-decker, toasted sandwich featuring turkey, bacon, lettuce, tomato, and mayo.\nHot Turkey Sandwich: Sliced or pulled turkey covered in warm gravy, often served open-faced, sometimes with cranberry sauce.\nDeli Turkey Sub: Turkey, cheese, and vegetables inside a submarine roll, commonly with mayo and mustard.\nGrilled Turkey & Cheese: Sliced bread with turkey and cheese, buttered and grilled until golden and melted. \n\nKey Components & Flavors:\nProtein: Sliced deli turkey (smoked, oven-roasted, honey-roasted) or leftover turkey.\nBread: White, sourdough, multigrain, focaccia, or rye.\nCondiments: Mayonnaise, yellow/Dijon mustard, cranberry sauce, or pesto.\nTexture/Veg: Crisp lettuce (iceberg, romaine, Bibb), sliced tomatoes, red onions, or pickles.\nCheese: Cheddar, Swiss, or Monterey Jack",
//             "stock": 90,
//             "price": 200,
//             "image_url": "https://res.cloudinary.com/dapbx8al2/image/upload/v1772446579/s3fblgeudzrpezrr7fqn.jpg",
//             "is_available": true,
//             "is_featured": true,
//             "created_at": "2026-03-02T10:16:38.411Z",
//             "updated_at": "2026-03-02T10:16:38.411Z",
//             "category": {
//                 "id": "59f73a5f-6515-443c-affb-0b8b234a347e",
//                 "name": "sandwich"
//             },
//             "cuisine": {
//                 "id": "42b630b8-472d-48d1-b108-72dcd87db609",
//                 "name": "Turkish"
//             },
//             "dietery": {
//                 "id": "dfe31fa4-573e-443b-b7e6-f97da8e12578",
//                 "name": "Diabetic Friendly"
//             }
//         }
//     }
// ]

// {
//     "user_id": "0Rs866Gj0HwOe5nXyzMhTMalPSXSyse2",
//     "name": "Ismail",
//     "phone": "0198491410",
//     "division": "Dhaka",
//     "district": "Gazipur",
//     "thana": "Tongi",
//     "area": "Ershad Nagar",
//     "street": "3 no block",
//     "postal_code": "2353",
//     "cartItems": [
//         {
//             "meal_id": "aaec0599-34f5-4e72-960e-ce8b2a03396a",
//             "quantity": 2
//         }
//     ]
// }

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
      setLoading(true);
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
            cartItems: [
                ...orderData?.cartItems
            ]
        }
        console.log('order object', orderObject);
        toast.success("Successfully ordered", { id: toastId });
      } catch (error: any) {
        toast.error(error.message, { id: toastId });
      } finally {
        setLoading(false);
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
                          field.handleChange(value);
                          setSelectedDivision(value);
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
                      <FieldLabel htmlFor={field.name}>Thana</FieldLabel>
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
                      <FieldLabel htmlFor={field.name}>Area</FieldLabel>
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
                <BaggageClaim /> Place Order
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
