import ProviderCard from "@/components/modules/home/ProviderCard/ProviderCard";
import { userServices } from "@/services/user.service";
import React from "react";

const ProvidersWithTheirMealsPage = async () => {
  const providers = await userServices.getAllProvider();
  console.log("providers:", providers);
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-3xl font-bold">All Providers</h3>
        <p className="text-center">
          We server the best meal for you. There are many kinds of Dietaries.{" "}
          <br />
          Like Halal, Vegan, Healthy, Vegeterian etc.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {providers.map((provider: any) => (
          <ProviderCard key={provider?.id} provider={provider} />
        ))}
      </div>
    </div>
  );
};

export default ProvidersWithTheirMealsPage;
