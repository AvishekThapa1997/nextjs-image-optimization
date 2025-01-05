import React from "react";
import { ProductDto } from "./types";
import NextImage from "./NextImage";
import Link from "next/link";

export interface ProductItemProps {
  product: ProductDto;
}
const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="border relative shadow-sm rounded overflow-hidden">
      <div className="flex h-full flex-col gap-3 pb-4 justify-between">
        <div className="border-b bg-gray-100">
          <Link href={`/products/${product.id}`}>
            <NextImage
              id="product-image"
              src={product.imageUrl}
              width={256}
              height={144}
              quality={75}
              alt={product.title}
              className="h-auto mx-auto max-w-full aspect-video object-contain"
              sizes="(min-width: 1040px) 196px, (min-width: 780px) 200px, 230px"
            />
          </Link>
        </div>
        <div className="px-3 flex flex-col gap-3 justify-between flex-grow  bg-gray-50">
          <span className="absolute top-2 left-2 bg-black/85 font-semibold  px-2 py-1 text-white text-[10px] rounded-full capitalize">
            {product.category}
          </span>
          <div className="space-y-2">
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <p className="line-clamp-1" title={product.title}>
                  {product.title}
                </p>
                <p>${product.price}</p>
              </div>
              <p className="text-xs text-gray-500 line-clamp-3">
                {product.description}
              </p>
            </div>
            <p className="text-xs text-gray-600 font-medium">2.4k reviews</p>
          </div>
          <button className="text-white w-full transition-colors delay-75 text-center text-sm h-10 bg-black/90  hover:bg-black/85 rounded-md">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
