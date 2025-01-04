import Products from "./Products";

const ProductGrid = () => {
  return (
    <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Products />
    </div>
  );
};

export { ProductGrid };
