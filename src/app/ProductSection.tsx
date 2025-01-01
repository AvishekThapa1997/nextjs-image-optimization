import React, { Suspense } from "react";

import Products from "./Products";
import { getProducts } from "./get-products";
import { ProductSkeleton } from "./ProductSkeleton";

const ProductSection = () => {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductContainer />
    </Suspense>
  );
};
const ProductContainer = async () => {
  const initialProductResult = await getProducts();
  return <Products initialProductResult={initialProductResult} />;
};

export default ProductSection;
