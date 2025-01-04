"use client";
import { ProductDto } from "@/app/types";
import { useRecentlyViewDb } from "@/app/useRecentlyViewDb";
import React, { useEffect, useRef } from "react";

interface AddProductAsRecentlyViewedProps {
  productDto: ProductDto;
}

const AddProductAsRecentlyViewed = ({
  productDto,
}: AddProductAsRecentlyViewedProps) => {
  const hasUnmounted = useRef(false);
  const db = useRecentlyViewDb();
  console.count();
  useEffect(() => {
    return () => {
      const canAddItemToDb =
        (process.env.NODE_ENV === "development" && hasUnmounted.current) ||
        process.env.NODE_ENV === "production";
      if (canAddItemToDb) {
        db?.addProduct(productDto);
      } else {
        hasUnmounted.current = true;
      }
    };
  }, [db, productDto]);
  return null;
};

export { AddProductAsRecentlyViewed };
