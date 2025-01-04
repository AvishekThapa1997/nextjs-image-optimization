import { ProductDto } from "./types";

export interface GetProductsOptions {
  page: number;
  limit: number;
  select?: {
    [Key in keyof Omit<ProductDto, "imageUrl">]: boolean;
  };
}

export type GetProductResult = {
  products: Record<ProductDto["id"], ProductDto>;
  productIds: Array<ProductDto["id"]>;
  page: number;
  total: number;
};

export const getProducts = async (
  { limit, page, select }: GetProductsOptions = {
    limit: 20,
    page: 0,
    select: {
      id: true,
      description: true,
      tags: true,
      title: true,
      brand: true,
      category: true,
      price: true,
    },
  }
): Promise<GetProductResult> => {
  try {
    const dataToFetch = Object.entries(
      select ?? {
        id: true,
        description: true,
        tags: true,
        title: true,
        brand: true,
        category: true,
        price: true,
      }
    )
      .filter(([, value]) => value)
      .map(([key]) => key);
    const response = await fetch(
      `/products?limit=${limit}&skip=${page * 10}&select=${dataToFetch.join(
        ","
      )},images`
    );

    if (response.ok) {
      const result = await response.json();
      // @ts-expect-error eewrwerrew
      const formattedResult = result.products.reduce((accum, curr) => {
        if (!accum.products) {
          accum.products = {};
        }
        if (!accum.productIds) {
          accum.productIds = [];
        }
        accum.products[curr.id] = {
          ...curr,
          imageUrl: curr?.images?.[0],
        };

        accum.productIds.push(curr.id);
        return accum;
      }, {});
      return {
        ...formattedResult,
        page: page + 1,
        total: result.total,
      };
    }
  } catch (err) {
    console.error(err);
  }
  return {
    products: {},
    page,
    total: 0,
    productIds: [],
  };
};
