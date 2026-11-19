import { HeroSection } from "@/components/layouts/common/home-carousel";
import HomeCardsNewProducts from "@/components/layouts/common/HomeCardsNewProducts/HomeCardsNewProducts";
import HomeCategories from "@/components/layouts/common/HomeCategories/HomeCategories";
import HomeFeaturedMeals from "@/components/layouts/common/HomeFeaturedMeals/HomeFeaturedMeals";
import NewsletterPromo from "@/components/layouts/common/NewsLetterPromo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <HomeCategories />
      <HomeCardsNewProducts />
      <HomeFeaturedMeals />
      <NewsletterPromo />
    </div>
  );
}
