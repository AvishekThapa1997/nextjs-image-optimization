import { Suspense } from "react";
import { getProducts } from "./get-products";
import Products from "./Products";
import { ProductSkeleton } from "./ProductSkeleton";

const ProductGrid = () => {
  return (
    <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductSection />
      </Suspense>
    </div>
  );
};

const ProductSection = async () => {
  const res = await getProducts();
  await new Promise((res) => {
    setTimeout(() => {
      res("");
    }, 500);
  });
  return <Products initialProductResult={res} />;
};
export { ProductGrid };
