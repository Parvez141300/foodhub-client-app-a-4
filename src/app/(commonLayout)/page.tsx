import { HomeCarousel } from "@/components/layouts/common/home-carousel";
import HomeCardsNewProducts from "@/components/layouts/common/HomeCardsNewProducts/HomeCardsNewProducts";
import HomeCategories from "@/components/layouts/common/HomeCategories/HomeCategories";
import NewsletterPromo from "@/components/layouts/common/NewsLetterPromo";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <HomeCarousel />
      <HomeCategories />
      <HomeCardsNewProducts />
      <NewsletterPromo />
    </div>
  );
}
