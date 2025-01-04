"use client";
import React from "react";

import { useRecentlyViewProducts } from "./useRecentlyViewProducts";
import ProductItem from "./ProductItem";
import { ProductSkeleton } from "./ProductSkeleton";

const RecentlyView = () => {
  const { recentlyViewProducts, isFetching } = useRecentlyViewProducts();
  if (recentlyViewProducts.length === 0 && !isFetching) {
    return null;
  }
  if (isFetching) {
    return (
      <div className="space-y-4 overflow-hidden overflow-x-auto">
        <div className="animate-pulse rounded py-5 w-64  bg-clip-padding bg-gray-200"></div>
        <div className="flex snap-x snap-mandatory scroll-smooth gap-4 flex-shrink-0 basis-3/4 md:basis-1/3 lg:md:basis-1/4">
          <ProductSkeleton
            className="flex-shrink-0 snap-start basis-[calc(75%-16px)] sm:basis-[calc((100%-16px)/2)] md:basis-[calc((100%-2*16px)/3)] lg:md:basis-[calc((100%-3*16px)/4)]"
            length={4}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-4 flex-col justify-between">
      <h4 className="text-2xl font-semibold">Recently View</h4>
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth">
        {recentlyViewProducts.map((product) => (
          <div
            className="[&>*]:h-full scroll-my-12 snap-start  flex-shrink-0 basis-[calc(75%-16px)] sm:basis-[calc((100%-16px)/2)] md:basis-[calc((100%-2*16px)/3)] lg:md:basis-[calc((100%-3*16px)/4)]"
            key={product.id}
          >
            <ProductItem product={product} key={product.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export { RecentlyView };
