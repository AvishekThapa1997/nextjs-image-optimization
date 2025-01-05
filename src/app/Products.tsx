"use client";
import React from "react";

import ProductItem from "./ProductItem";
import InfiniteScrolling from "./InfiniteScrolling";
import { useGetProducts } from "./useProducts";
import { GetProductResult } from "./get-products";
import { ProductSkeleton } from "./ProductSkeleton";

export interface ProductsProps {
  initialProductResult?: GetProductResult;
}

const Products = ({ initialProductResult }: ProductsProps) => {
  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
    useGetProducts(initialProductResult);
  if (!isLoading && (!data || (data && data.pages.length === 0))) {
    return <p>No products</p>;
  }
  const isDataAvailable =
    data && Array.isArray(data.pages) && data.pages.length > 0;
  return (
    <>
      <InfiniteScrolling
        onPageEnd={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
      >
        {isLoading && <ProductSkeleton />}
        {isDataAvailable &&
          data.pages.map(({ productIds, products }) => {
            return productIds.map((productId) => (
              <ProductItem product={products[productId]} key={productId} />
            ));
          })}
        {isFetchingNextPage && <ProductSkeleton />}
      </InfiniteScrolling>
    </>
  );
};

export default Products;
