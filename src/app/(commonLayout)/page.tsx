import { HomeCarousel } from "@/components/layouts/common/home-carousel";
import NewsletterPromo from "@/components/layouts/common/NewsLetterPromo";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <HomeCarousel />
      
      <NewsletterPromo />
    </div>
  );
}
