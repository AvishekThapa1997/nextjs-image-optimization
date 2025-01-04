import { BaseIndexDb } from "./BaseIndexDb";
import { ProductDto } from "./types";

class RecentlyViewIndexDb extends BaseIndexDb {
  private static _instance: RecentlyViewIndexDb | null = null;

  public get instance() {
    return RecentlyViewIndexDb._instance;
  }
  private constructor() {
    super();
  }
  static async initialize() {
    await super.init();
    if (!RecentlyViewIndexDb._instance) {
      RecentlyViewIndexDb._instance = new RecentlyViewIndexDb();
    }
    return RecentlyViewIndexDb._instance;
  }

  async addProduct(productDto: ProductDto) {
    if (!this.db) {
      return;
    }
    const recentlyViewObjectStore = this.getObjectStore(
      "recentlyView",
      "readwrite"
    );
    const getRequest = recentlyViewObjectStore?.get(productDto.id);
    getRequest?.addEventListener("success", function (getRequestEvent) {
      const existingProduct = (getRequestEvent.target as IDBRequest<ProductDto>)
        .result;
      if (existingProduct?.id) {
        return;
      }
      const countRequest = recentlyViewObjectStore?.count();
      countRequest?.addEventListener("success", function () {
        const totalItems = this.result;
        if (totalItems === 12) {
          recentlyViewObjectStore
            ?.index("createdAt")
            .openCursor()
            .addEventListener("success", function () {
              const cursor = this.result;
              if (cursor) {
                recentlyViewObjectStore.delete(cursor.primaryKey);
              }
            });
          // remove item which is inserted initially based on the createdAt
        }
      });

      const addRequest = recentlyViewObjectStore?.add({
        ...productDto,
        createdAt: Date.now(),
      });
      addRequest?.addEventListener("error", function () {
        console.error(this.error?.message, productDto.id);
      });
    });
  }

  async getProducts(): Promise<ProductDto[]> {
    return new Promise((res) => {
      const recentlyViewedProducts: ProductDto[] = [];
      if (!this.db) {
        return;
      }
      const recentlyViewObjectStore = this.getObjectStore(
        "recentlyView",
        "readonly"
      );
      const cursor = recentlyViewObjectStore?.openCursor();
      cursor?.addEventListener("success", function (event) {
        const dbCursor = (event.target as IDBRequest<IDBCursorWithValue>)
          .result;

        if (!dbCursor || recentlyViewedProducts.length === 12) {
          return res(
            //@ts-expect-error createdAt is added for sorting
            recentlyViewedProducts.sort((a, b) => b.createdAt - a.createdAt)
          );
        }
        recentlyViewedProducts.push({
          ...dbCursor.value,
        });
        dbCursor.continue();
      });
      cursor?.addEventListener("error", function (event) {
        const dbCursor = event.target as IDBRequest<IDBCursorWithValue>;
        console.error(dbCursor?.error?.message);
      });
    });
  }
}

export { RecentlyViewIndexDb };
