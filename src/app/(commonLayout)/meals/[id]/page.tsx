"use client";

import { getMealById } from "@/actions/meal.action";
import LoadingSpinner from "@/components/global/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Heart,
  Share2,
  Phone,
  Mail,
  Store,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  Star,
  Truck,
  PlusIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { use } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentUser } from "@/actions/user.action";
import { Roles } from "@/constants/roles";
import { createCartWithCartItem } from "@/actions/cart.action";
import { createWishList } from "@/actions/wishlist.action";
import { createMealReview, getMealReview } from "@/actions/review.action";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Rating } from "@/components/reui/rating";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export default function MealDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [meal, setMeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [wishListLoading, setWishListLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [userData, setUserData] = useState<any>(null);
  const [reviews, setReviews] = useState<any>(null);
  const [productRating, setProductRating] = useState(0);

  console.log("reviews", reviews);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        setLoading(true);
        const session = await getCurrentUser();
        const data = await getMealById(id);
        const reviewData = await getMealReview(id);
        setReviews(reviewData);
        setMeal(data);
        setUserData(session?.user);
      } catch (error) {
        console.error("Error fetching meal:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  // Helper function to display provider contact info
  const getProviderPhone = () => {
    if (meal?.provider?.phone) {
      return meal.provider.phone;
    }
    return (
      <span className="text-muted-foreground italic">
        Haven't added phone number
      </span>
    );
  };

  const getProviderImage = () => {
    if (meal?.provider?.image) {
      return meal.provider.image;
    }
    return null;
  };

  const getProviderNameInitials = () => {
    return meal?.provider?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    const toastId = toast.loading("Adding to cart");
    setCartLoading(true);
    try {
      if (!userData) {
        setCartLoading(false);
        return toast.error("User Need to login to add to cart", {
          id: toastId,
        });
      }
      if (userData.role !== Roles.CUSTOMER) {
        setCartLoading(false);
        return toast.error("Only Customer user can add to cart", {
          id: toastId,
        });
      }

      const result = await createCartWithCartItem({
        userId: userData.id,
        mealId: id,
        quantity: quantity,
      });
      console.log("added to cart response", result);
      if (result?.id) {
        toast.success(`Added ${quantity} x ${meal?.title} to cart`, {
          id: toastId,
        });
      } else {
        setCartLoading(false);
        toast.error("Failed to add to cart", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    } finally {
      setCartLoading(false);
    }
  };

  // Handle add to wishlist
  const handleAddToWishlist = async () => {
    const toastId = toast.loading("Adding to wish list");
    setWishListLoading(true);
    try {
      if (!userData) {
        setWishListLoading(false);
        return toast.error("User Need to login to add to wish list", {
          id: toastId,
        });
      }
      if (userData.role !== Roles.CUSTOMER) {
        setWishListLoading(false);
        return toast.error("Only Customer user can add to wish list", {
          id: toastId,
        });
      }

      const result = await createWishList({
        userId: userData.id,
        mealId: id,
      });
      console.log("added to wish list response", result);
      if (result?.id) {
        toast.success(`Added ${quantity} x ${meal?.title} to wish list`, {
          id: toastId,
        });
      } else {
        setWishListLoading(false);
        toast.error("This wish list already in Wish List", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    } finally {
      setWishListLoading(false);
    }
  };

  // Handle share
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  // Handle order now
  const handleOrderNow = () => {
    if (!userData) {
      return toast.error("User Need to login to add to cart");
    }
    if (userData.role !== Roles.CUSTOMER) {
      return toast.error("Only Customer user can add to cart");
    }
    toast.success("Proceeding to checkout...");
  };

  // rating message by toast
  const handleRatingChange = (rating: number) => {
    setProductRating(rating);
    toast.success("Rated {rating} out of 5", {
      description: `Rated ${rating} out of 5`,
    });
  };

  // submit review
  const handleReview = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const userComment = form.review.value;
    const toastId = toast.loading("Creating a Review");
    try {
      if(!userData.id){
        return toast.error("User need to login first to give review");
      }
      if (!productRating) {
        return toast.error("You haven't rated yet");
      }
      if (!userComment.trim()) {
        return toast.error("Review can't be empty");
      }
      const result = await createMealReview(
        userData.id,
        id,
        productRating,
        userComment,
      );
      if (result?.id) {
        toast.success("Successfully Created Review", { id: toastId });
        form.reset();
        setProductRating(0);
      } else {
        toast.error("Failed to create review", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Meal Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The meal you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/meals">Browse Meals</Link>
          </Button>
        </Card>
      </div>
    );
  }

  //   {
  //     "id": "a47f3c43-15be-4b3f-9143-e2e9de44757b",
  //     "author_id": "0Rs866Gj0HwOe5nXyzMhTMalPSXSyse2",
  //     "meal_id": "dd1264d4-90c2-4165-bae1-0ab9f583b8e3",
  //     "rating": 4,
  //     "comment": "It's really a good product I really love this. Because I take it every morning to boost myself for daily work. This is energy builder.",
  //     "created_at": "2026-03-06T08:53:29.049Z",
  //     "updated_at": "2026-03-06T08:53:29.049Z",
  //     "user": {
  //         "id": "0Rs866Gj0HwOe5nXyzMhTMalPSXSyse2",
  //         "name": "Ismail",
  //         "email": "ismail@gmail.com",
  //         "emailVerified": false,
  //         "image": null,
  //         "createdAt": "2026-01-30T15:08:40.125Z",
  //         "updatedAt": "2026-01-31T18:57:16.137Z",
  //         "role": "CUSTOMER",
  //         "phone": null,
  //         "is_active": "ACTIVE"
  //     }
  // }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/5">
      <div className="container max-w-7xl mx-auto py-8 px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/meals" className="hover:text-primary">
            Meals
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{meal?.title}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <Card className="overflow-hidden border-2">
              <div className="relative h-100 w-full">
                <Image
                  src={meal?.image_url}
                  alt={meal?.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
                {/* Availability Badge */}
                <div className="absolute top-4 right-4">
                  {meal?.is_available ? (
                    <Badge className="bg-green-500 hover:bg-green-600 text-white px-3 py-1">
                      <CheckCircle className="w-4 h-4 mr-1 inline" /> Available
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="px-3 py-1">
                      <XCircle className="w-4 h-4 mr-1 inline" /> Out of Stock
                    </Badge>
                  )}
                </div>
                {/* Featured Badge */}
                {meal?.is_featured && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1">
                      <Star className="w-4 h-4 mr-1 inline" /> Featured
                    </Badge>
                  </div>
                )}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                onClick={handleAddToCart}
                disabled={!meal?.is_available || cartLoading}
                className="w-full"
              >
                {cartLoading ? (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Adding to Cart...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button
                onClick={handleAddToWishlist}
                disabled={wishListLoading}
                variant="outline"
                className="w-full"
              >
                {wishListLoading ? (
                  <>
                    <Heart className="w-4 h-4 mr-2" />
                    Adding to Wishlist...
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 mr-2" />
                    Wishlist
                  </>
                )}
              </Button>
              <Button
                onClick={handleOrderNow}
                disabled={!meal?.is_available}
                variant="secondary"
                className="w-full"
              >
                <Truck className="w-4 h-4 mr-2" />
                Order Now
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="w-full"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Quantity Selector */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center font-bold">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= meal?.stock}
                    >
                      +
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {meal?.stock} available
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Description Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              {/* description */}
              <TabsContent value="description" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground whitespace-pre-line">
                      {meal?.description}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* detaisl */}
              <TabsContent value="details" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Category
                        </p>
                        <p className="font-medium capitalize">
                          {meal?.category?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cuisine</p>
                        <p className="font-medium capitalize">
                          {meal?.cuisine?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Dietary</p>
                        <p className="font-medium capitalize">
                          {meal?.dietery?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Stock</p>
                        <p className="font-medium">{meal?.stock} units</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Created</p>
                        <p className="font-medium">
                          {new Date(meal?.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Last Updated
                        </p>
                        <p className="font-medium">
                          {new Date(meal?.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* reviews */}
              <TabsContent value="reviews" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Review</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {reviews?.length > 0 ? (
                      <div className="space-y-3">
                        {reviews.map((review: any) => (
                          <ItemGroup key={review?.id} className="w-full">
                            <Item variant="outline">
                              <ItemMedia>
                                <Avatar>
                                  <AvatarImage
                                    src={review?.user?.image}
                                    className="grayscale"
                                  />
                                  <AvatarFallback>
                                    {review?.user?.name}
                                  </AvatarFallback>
                                </Avatar>
                              </ItemMedia>
                              <ItemContent className="gap-1">
                                <ItemTitle>{review?.user?.name}</ItemTitle>
                                <ItemTitle>{review?.user?.email}</ItemTitle>
                                <ItemTitle>{review?.rating} <StarIcon className="w-3" /> </ItemTitle>
                                <ItemDescription>
                                  {review?.comment}
                                </ItemDescription>
                              </ItemContent>
                              <ItemActions>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-full"
                                >
                                  <PlusIcon />
                                </Button>
                              </ItemActions>
                            </Item>
                          </ItemGroup>
                        ))}
                      </div>
                    ) : (
                      <CardContent className="p-6 text-center text-muted-foreground">
                        No reviews yet. Be the first to review!
                      </CardContent>
                    )}
                  </CardContent>
                  {/* review and rating */}
                  <CardFooter>
                    <FieldGroup>
                      {/* rating */}
                      <Field>
                        <FieldLabel>Rating</FieldLabel>
                        <div className="space-y-8">
                          <Rating
                            rating={productRating}
                            editable={true}
                            onRatingChange={handleRatingChange}
                            showValue={true}
                          />
                        </div>
                      </Field>
                      {/* review form */}
                      <Field>
                        <FieldLabel htmlFor="block-end-textarea">
                          Your Review
                        </FieldLabel>
                        <form onSubmit={handleReview}>
                          <InputGroup>
                            <InputGroupTextarea
                              id="block-end-textarea"
                              name="review"
                              placeholder="Write a review..."
                            />
                            <InputGroupAddon align="block-end">
                              <InputGroupButton
                                variant="default"
                                size="sm"
                                className="ml-auto"
                                type="submit"
                              >
                                Post
                              </InputGroupButton>
                            </InputGroupAddon>
                          </InputGroup>
                        </form>
                      </Field>
                    </FieldGroup>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Info and Provider Details */}
          <div className="space-y-6">
            {/* Meal Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">{meal?.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="capitalize">
                    {meal?.category?.name}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {meal?.cuisine?.name}
                  </Badge>
                  <Badge variant="secondary" className="capitalize">
                    {meal?.dietery?.name}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary mb-4">
                  ৳{meal?.price}
                  <span className="text-lg font-normal text-muted-foreground ml-2">
                    per item
                  </span>
                </div>
                <Separator className="my-4" />
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      Estimated delivery: 30-45 min
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Free delivery over ৳500</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Provider Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="w-5 h-5" />
                  Provider Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={getProviderImage() || ""} />
                    <AvatarFallback>{getProviderNameInitials()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{meal?.provider?.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      Role: {meal?.provider?.role?.toLowerCase()}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">
                        {meal?.provider?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <div className="text-sm text-muted-foreground">
                        {getProviderPhone()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge
                      variant={
                        meal?.provider?.emailVerified ? "default" : "secondary"
                      }
                      className="mt-1"
                    >
                      {meal?.provider?.emailVerified
                        ? "Email Verified"
                        : "Email Not Verified"}
                    </Badge>
                    <Badge
                      variant={
                        meal?.provider?.is_active === "ACTIVE"
                          ? "default"
                          : "destructive"
                      }
                      className="mt-1"
                    >
                      {meal?.provider?.is_active}
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/providers/${meal?.provider?.id}`}>
                    <Store className="w-4 h-4 mr-2" />
                    View All Meals from {meal?.provider?.name}
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Delivery Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Truck className="w-5 h-5" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Minimum Order</span>
                  <span className="font-medium">৳150</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Time</span>
                  <span className="font-medium">30-45 min</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>৳{meal?.price * quantity}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Meals Section (Optional) */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* You can add related meals here */}
            <Card className="p-8 text-center text-muted-foreground">
              More meals coming soon...
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
