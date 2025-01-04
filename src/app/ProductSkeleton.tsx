import React from "react";

interface ProductSkeletonProps {
  length?: number;
  className?: string;
}

const ProductSkeleton = ({
  length = 20,
  className = "",
}: ProductSkeletonProps) => {
  return (
    <>
      {Array.from({ length })
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className={`border rounded overflow-hidden ${className}`}
          >
            <div className="animate-pulse  bg-gray-200 aspect-video"></div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex h-6 gap-4 justify-between">
                    <div className="animate-pulse rounded basis-full h-full bg-gray-200 grow"></div>
                    <div className="h-full rounded animate-pulse bg-gray-200 px-8 bg-clip-padding"></div>
                  </div>
                  <div className="py-10 rounded bg-clip-padding animate-pulse bg-gray-200"></div>
                </div>
                <div className="py-5 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export { ProductSkeleton };
