import React from "react";
import { Spinner } from "../ui/spinner";

const LoadingCircleSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <Spinner className="size-6" />
    </div>
  );
};

export default LoadingCircleSpinner;
