import { EcommerceFooter1 } from "@/components/layouts/common/ecommerce-footer1";
import { Navbar1 } from "@/components/layouts/common/navbar/navbar1";
import { userServices } from "@/services/user.service";
import React from "react";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await userServices.getSession();
  return (
    <div>
      <section className="mb-24 lg:mb-36">
        <Navbar1 session={session} />
      </section>
      <div className="mx-auto px-4 min-h-screen space-y-8">
        {children}
      </div>
      <EcommerceFooter1 />
    </div>
  );
};

export default CommonLayout;
