import React from "react";
import { ProductDto } from "@/app/types";
import { AddProductAsRecentlyViewed } from "../../AddProductAsRecentlyViewed";
import { RecentlyView } from "@/app/RecentlyView";
import ProductDetail from "@/app/ProductDetail";

interface ProductDetailPageParams {
  params: {
    productId: string;
  };
}

const ProductDetailPage = async ({
  params: { productId },
}: ProductDetailPageParams) => {
  const response = await fetch("https://dummyjson.com/products/" + productId);
  const result = await response.json();
  const productDto: ProductDto = {
    id: result.id,
    title: result.title,
    description: result.description,
    brand: result.brand,
    category: result.category,
    price: result.price,
    tags: result.tags,
    images: result.images,
    imageUrl: result?.images?.[0],
  };
  return (
    <>
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        <ProductDetail productDto={productDto} />
        <RecentlyView />
      </div>
      <AddProductAsRecentlyViewed productDto={productDto} />
    </>
  );
};

export default ProductDetailPage;
