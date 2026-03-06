import LoadingSpinner from "@/components/global/LoadingSpinner";
import CreateDietaryInputField from "@/components/modules/dashboard/MangeDietary/CreateDietaryInputField";
import { DietaryTable } from "@/components/modules/dashboard/MangeDietary/DietaryTable";
import { dietaryService } from "@/services/dietary.service";

import React, { Suspense } from "react";

const ManageDieteries = async () => {
  const dietaries = await dietaryService.getAllDietary();
  return (
    <div className="space-y-5">
      <h3 className="text-xl">Create Dietery</h3>
      <CreateDietaryInputField />
      <h3 className="text-xl">Manage Dietery</h3>
      <Suspense fallback={<LoadingSpinner />}>
        <DietaryTable dietaries={dietaries} />
      </Suspense>
    </div>
  );
};

export default ManageDieteries;
