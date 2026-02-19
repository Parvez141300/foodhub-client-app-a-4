import React from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const LoadingSpinner = () => {
  return (
    <Button variant="outline" disabled size="sm">
      <Spinner data-icon="inline-start" />
      Please wait
    </Button>
  );
};

export default LoadingSpinner;
