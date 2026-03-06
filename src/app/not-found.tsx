"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HomeIcon, ArrowLeftIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-b from-background to-secondary/20">
      <Card className="max-w-md w-full border-2 shadow-xl">
        <CardContent className="pt-6 pb-6 text-center space-y-6">
          {/* 404 Number with Animation */}
          <div className="relative">
            <h1 className="text-9xl font-bold text-primary/20">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Icon and Message */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Page Not Found</h2>
            <p className="text-muted-foreground">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="default">
              <Link href="/">
                <HomeIcon className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/meals">
                <SearchIcon className="mr-2 h-4 w-4" />
                Browse Meals
              </Link>
            </Button>
          </div>

          {/* Back Button */}
          <div>
            <Button
              variant="link"
              onClick={() => window.history.back()}
              className="text-muted-foreground"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>

          {/* Help Text */}
          <p className="text-xs text-muted-foreground">
            If you think this is a mistake, please{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact support
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
