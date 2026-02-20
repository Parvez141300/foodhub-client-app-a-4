import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Gift, Sparkles, Tag, Truck } from "lucide-react";

const NewsletterPromo = () => {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
            <Gift className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            $20 discount for your first order
          </CardTitle>
          <CardDescription className="text-base">
            Join our newsletter and get...
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Join our email subscription now to get updates on promotions and
              coupons.
            </p>

            <div className="max-w-3xl mx-auto">
              <div className="flex items-center space-x-2 mb-2">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Your email address
                </label>
              </div>

              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button type="submit">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
            <div className="flex justify-center items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-green-600" />
              <span>Everyday fresh products</span>
            </div>
            <div className="flex justify-center items-center gap-2 text-sm">
              <Truck className="h-4 w-4 text-blue-600" />
              <span>Free delivery for order over $70</span>
            </div>
            <div className="flex justify-center items-center gap-2 text-sm">
              <Tag className="h-4 w-4 text-purple-600" />
              <span>Daily Mega Discounts</span>
            </div>
            <div className="flex justify-center items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-amber-600" />
              <span>Best price on the market</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="text-xs text-muted-foreground text-center border-t pt-4">
          <p className="w-full">
            By subscribing you agree to our terms and conditions
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewsletterPromo;
