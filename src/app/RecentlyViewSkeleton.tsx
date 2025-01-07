import React from "react";
import { ProductSkeleton } from "./ProductSkeleton";

const RecentlyViewSkeleton = () => {
  return (
    <div className="flex gap-4 flex-col justify-between">
      <div className="animate-pulse rounded py-5 w-64  bg-clip-padding bg-gray-200"></div>
      <div className="flex snap-x snap-mandatory scroll-smooth gap-4">
        <ProductSkeleton
          className="flex-shrink-0 snap-start basis-[calc(75%-16px)] sm:basis-[calc((100%-16px)/2)] md:basis-[calc((100%-2*16px)/3)] lg:basis-[calc((100%-3*16px)/4)]"
          length={4}
        />
      </div>
    </div>
  );
};

export { RecentlyViewSkeleton };
