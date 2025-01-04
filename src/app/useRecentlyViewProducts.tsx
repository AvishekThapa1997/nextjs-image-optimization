import { useEffect, useState } from "react";
import { ProductDto } from "./types";
import { useRecentlyViewDb } from "./useRecentlyViewDb";

export function useRecentlyViewProducts() {
  const db = useRecentlyViewDb();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [recentlyViewProducts, setRecentlyViewProducts] = useState<
    Array<ProductDto>
  >([]);
  useEffect(() => {
    db?.getProducts()
      .then((products) => {
        setRecentlyViewProducts(products);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [db]);
  return { recentlyViewProducts, isFetching };
}
