import { userServices } from "@/services/user.service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Phone,
  Calendar,
  Clock,
  Utensils,
  ChefHat,
  AlertCircle,
  Star,
  Users,
  Package,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const ProviderDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const providerWithMeal = await userServices.getProviderWithMeal(id);

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-8 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-foreground">Provider Profile</h1>
        <p className="text-muted-foreground mt-2">
          Detailed information about the provider and their meals
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column - Provider Info */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={providerWithMeal.image || ""} />
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {getInitials(providerWithMeal.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl">
                {providerWithMeal.name}
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <Badge
                  variant={
                    providerWithMeal.is_active === "ACTIVE"
                      ? "default"
                      : "secondary"
                  }
                >
                  {providerWithMeal.is_active}
                </Badge>
                <Badge variant="outline">{providerWithMeal.role}</Badge>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <Separator />

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Contact Information
                </h3>

                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">
                    {providerWithMeal.email}
                  </span>
                </div>

                {providerWithMeal.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">
                      {providerWithMeal.phone}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">
                    Joined {formatDate(providerWithMeal.createdAt)}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">
                    Last updated {formatDate(providerWithMeal.updatedAt)}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Statistics */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Statistics
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-secondary rounded-lg">
                    <Utensils className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold text-foreground">
                      {providerWithMeal.meals?.length || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Total Meals
                    </div>
                  </div>

                  <div className="text-center p-3 bg-secondary rounded-lg">
                    <Package className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold text-foreground">
                      {providerWithMeal.meals?.reduce(
                        (acc: number, meal: any) => acc + (meal.stock || 0),
                        0,
                      ) || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Total Stock
                    </div>
                  </div>
                </div>
              </div>

              {!providerWithMeal.emailVerified && (
                <div className="mt-4 p-3 bg-destructive/10 rounded-lg flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                  <p className="text-xs text-destructive">Email not verified</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Meals */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <ChefHat className="h-6 w-6 text-primary" />
                    Meals by {providerWithMeal.name}
                  </CardTitle>
                  <CardDescription>
                    Browse through all meals offered by this provider
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {providerWithMeal.meals?.length || 0} meals available
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="grid" className="w-full">
                <TabsList className="grid w-full max-w-50 grid-cols-2 mb-6">
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>

                <TabsContent value="grid">
                  {providerWithMeal.meals &&
                  providerWithMeal.meals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {providerWithMeal.meals.map((meal: any) => (
                        <Card
                          key={meal.id}
                          className="overflow-hidden hover:shadow-lg transition-shadow"
                        >
                          <div className="aspect-video bg-secondary relative">
                            {meal.image_url ? (
                              <Image
                                src={meal.image_url}
                                alt={meal.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Utensils className="h-12 w-12 text-muted-foreground" />
                              </div>
                            )}

                            {/* Status Badges */}
                            <div className="absolute top-2 right-2 flex gap-1 z-10">
                              {!meal.is_available && (
                                <Badge
                                  variant="destructive"
                                  className="text-xs"
                                >
                                  Unavailable
                                </Badge>
                              )}
                              {meal.is_featured && (
                                <Badge
                                  variant="default"
                                  className="text-xs bg-primary"
                                >
                                  <Sparkles className="h-3 w-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </div>

                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-lg line-clamp-1 text-foreground">
                                {meal.title}
                              </h3>
                              <Badge variant="secondary">{meal.price}tk</Badge>
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                              {meal.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-2">
                              {meal.category && (
                                <Badge variant="outline" className="text-xs">
                                  {meal.category.name}
                                </Badge>
                              )}
                              {meal.cuisine && (
                                <Badge variant="outline" className="text-xs">
                                  {meal.cuisine.name}
                                </Badge>
                              )}
                              {meal.dietery && (
                                <Badge variant="outline" className="text-xs">
                                  {meal.dietery.name}
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-1 text-sm">
                                <Package className="h-4 w-4 text-muted-foreground" />
                                <span
                                  className={
                                    meal.stock > 0
                                      ? "text-foreground"
                                      : "text-destructive"
                                  }
                                >
                                  Stock: {meal.stock}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                {meal.is_available ? (
                                  <CheckCircle2 className="h-4 w-4 text-primary" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-destructive" />
                                )}
                              </div>
                            </div>

                            <div className="text-xs text-muted-foreground mt-2">
                              Added {formatDate(meal.created_at)}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Utensils className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        No meals available
                      </h3>
                      <p className="text-muted-foreground">
                        This provider hasn't added any meals yet.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="list">
                  {providerWithMeal.meals &&
                  providerWithMeal.meals.length > 0 ? (
                    <div className="space-y-4">
                      {providerWithMeal.meals.map((meal: any) => (
                        <Card
                          key={meal.id}
                          className="hover:bg-secondary/50 transition-colors"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="w-20 h-20 bg-secondary rounded-lg overflow-hidden relative">
                                {meal.image_url ? (
                                  <Image
                                    src={meal.image_url}
                                    alt={meal.title}
                                    fill
                                    sizes="80px"
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Utensils className="h-8 w-8 text-muted-foreground" />
                                  </div>
                                )}

                                {/* Status Indicator */}
                                {!meal.is_available && (
                                  <div className="absolute inset-0 bg-destructive/20 flex items-center justify-center">
                                    <XCircle className="h-6 w-6 text-destructive" />
                                  </div>
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h3 className="font-semibold text-lg truncate text-foreground">
                                        {meal.title}
                                      </h3>
                                      {meal.is_featured && (
                                        <Sparkles className="h-4 w-4 text-primary" />
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-1">
                                      {meal.description}
                                    </p>
                                  </div>
                                  <Badge variant="secondary" className="ml-2">
                                    {meal.price}tk
                                  </Badge>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-2">
                                  {meal.category && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {meal.category.name}
                                    </Badge>
                                  )}
                                  {meal.cuisine && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {meal.cuisine.name}
                                    </Badge>
                                  )}
                                  {meal.dietery && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {meal.dietery.name}
                                    </Badge>
                                  )}
                                </div>

                                <div className="flex items-center gap-4 mt-2 text-sm">
                                  <div className="flex items-center gap-1">
                                    <Package className="h-4 w-4 text-muted-foreground" />
                                    <span
                                      className={
                                        meal.stock > 0
                                          ? "text-foreground"
                                          : "text-destructive"
                                      }
                                    >
                                      Stock: {meal.stock}
                                    </span>
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {formatDate(meal.created_at)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Utensils className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        No meals available
                      </h3>
                      <p className="text-muted-foreground">
                        This provider hasn't added any meals yet.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetailsPage;
