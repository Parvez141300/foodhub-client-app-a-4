import React from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Button variant="outline" disabled size="sm">
        <Spinner data-icon="inline-start" />
        Please wait
      </Button>
    </div>
  );
};

export default LoadingSpinner;
