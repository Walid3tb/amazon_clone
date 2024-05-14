import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="!w-full py-4 flex items-center justify-center">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
