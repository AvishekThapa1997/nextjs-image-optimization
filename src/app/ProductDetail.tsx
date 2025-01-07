import React from "react";
import { ProductDto } from "./types";
import NextImage from "./NextImage";
interface ProductDetailProps {
  productDto: ProductDto;
}

const ProductDetail = ({ productDto }: ProductDetailProps) => {
  return (
    <div className="grid md:p-4 gap-6 lg:grid-cols-[auto,1fr] md:gap-4 ">
      <div className="border shadow-sm rounded overflow-hidden">
        <NextImage
          height={450}
          width={450}
          src={productDto.imageUrl}
          alt={productDto.title}
          quality={75}
          priority={true}
          className="mx-auto max-w-full object-contain h-auto aspect-square "
          sizes="(min-width: 540px) 400px, 50vw" // done from resp image lint
        />
      </div>
      <div className="h-full space-y-3">
        <h1 className="text-2xl font-medium md:text-5xl">{productDto.title}</h1>
        <p>{productDto.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
