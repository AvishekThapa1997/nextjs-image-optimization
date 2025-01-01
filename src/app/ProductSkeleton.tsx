import React from "react";

const ProductSkeleton = () => {
  return (
    <>
      {Array.from({ length: 20 })
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded bg-gray-300 w-full h-auto aspect-square"
          ></div>
        ))}
    </>
  );
};

export { ProductSkeleton };
