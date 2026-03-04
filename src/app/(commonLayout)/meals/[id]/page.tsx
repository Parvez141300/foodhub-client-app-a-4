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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { use } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MealDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [meal, setMeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        setLoading(true);
        const data = await getMealById(id);
        setMeal(data);
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
  const handleAddToCart = () => {
    toast.success(`Added ${quantity} x ${meal?.title} to cart`);
  };

  // Handle add to wishlist
  const handleAddToWishlist = () => {
    toast.success(`${meal?.title} added to wishlist`);
  };

  // Handle share
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  // Handle order now
  const handleOrderNow = () => {
    toast.success("Proceeding to checkout...");
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
                disabled={!meal?.is_available}
                className="w-full"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={handleAddToWishlist}
                variant="outline"
                className="w-full"
              >
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
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
              <Button onClick={handleShare} variant="outline" className="w-full">
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
                    <span className="w-12 text-center font-bold">{quantity}</span>
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
              <TabsContent value="description" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground whitespace-pre-line">
                      {meal?.description}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="details" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="font-medium capitalize">{meal?.category?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cuisine</p>
                        <p className="font-medium capitalize">{meal?.cuisine?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Dietary</p>
                        <p className="font-medium capitalize">{meal?.dietery?.name}</p>
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
                        <p className="text-sm text-muted-foreground">Last Updated</p>
                        <p className="font-medium">
                          {new Date(meal?.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    No reviews yet. Be the first to review!
                  </CardContent>
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
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge
                      variant={meal?.provider?.emailVerified ? "default" : "secondary"}
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