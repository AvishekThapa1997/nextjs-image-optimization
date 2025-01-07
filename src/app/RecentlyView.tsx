"use client";
import React from "react";

import { useRecentlyViewProducts } from "./useRecentlyViewProducts";
import ProductItem from "./ProductItem";
import { RecentlyViewSkeleton } from "./RecentlyViewSkeleton";

const RecentlyView = () => {
  const { recentlyViewProducts, isFetching } = useRecentlyViewProducts();
  if (recentlyViewProducts.length === 0 && !isFetching) {
    return null;
  }
  if (isFetching) {
    return <RecentlyViewSkeleton />;
  }
  return (
    <div className="flex gap-4 flex-col justify-between">
      <h4 className="text-2xl font-semibold">Recently View</h4>
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth">
        {recentlyViewProducts.map((product) => (
          <div
            className="[&>*]:h-full scroll-my-12 snap-start  flex-shrink-0 basis-[calc(75%-16px)] sm:basis-[calc((100%-16px)/2)] md:basis-[calc((100%-2*16px)/3)] lg:basis-[calc((100%-3*16px)/4)]"
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
