import { EcommerceFooter1 } from "@/components/layouts/common/ecommerce-footer1";
import { HomeCarousel } from "@/components/layouts/common/home-carousel";
import { Navbar1 } from "@/components/layouts/common/navbar1";
import { userServices } from "@/services/user.service";
import React from "react";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await userServices.getSession();
  return (
    <div>
      <Navbar1 session={session} />
      <div className="max-w-7xl mx-auto my-6 px-4 min-h-screen space-y-8">
        <HomeCarousel />
        {children}
        </div>
      <EcommerceFooter1 />
    </div>
  );
};

export default CommonLayout;
