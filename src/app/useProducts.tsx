import {
  DefaultError,
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  GetProductResult,
  getProducts,
  GetProductsOptions,
} from "./get-products";

export function useGetProducts(initialData?: GetProductResult) {
  const result = useInfiniteQuery<
    GetProductResult,
    DefaultError,
    InfiniteData<GetProductResult, GetProductsOptions>,
    QueryKey,
    GetProductsOptions
  >({
    queryKey: ["products"],
    queryFn: ({ pageParam }) => getProducts(pageParam),
    initialPageParam: {
      limit: 20,
      page: 0,
    },
    initialData:
      initialData && Object.entries(initialData.products).length > 0
        ? {
            pageParams: [
              {
                limit: 20,
                page: 0,
              },
            ],
            pages: [
              {
                ...initialData,
              },
            ],
          }
        : undefined,

    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const currentlyTotalProductsFetched = allPages.reduce((acumm, curr) => {
        return acumm + curr.productIds.length;
      }, 0);
      if (currentlyTotalProductsFetched < lastPage.total)
        return {
          ...lastPageParam,
          page: lastPage.page + 1,
        };
    },
    getPreviousPageParam: (prevPage, allPages, prevPageParam) => {
      if (prevPage.page > 0) {
        return {
          ...prevPageParam,
          page: prevPage.page - 1,
        };
      }
    },
  });

  return result;
}
