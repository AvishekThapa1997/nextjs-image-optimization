import React from "react";
import { ProductDto } from "./types";
import NextImage from "./NextImage";
import Link from "next/link";

export interface ProductItemProps {
  product: ProductDto;
}
const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="border-2 rounded overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <NextImage
          id="product-image"
          src={product.imageUrl}
          height={256}
          width={256}
          quality={75}
          alt={product.title}
          className="h-auto mx-auto aspect-square max-w-full object-contain"
          sizes="(min-width: 1040px) 207px, (min-width: 780px) calc(6.25vw + 192px), (min-width: 600px) 256px, calc(46.07vw - 11px)"
        />
      </Link>
    </div>
  );
};

export default ProductItem;
