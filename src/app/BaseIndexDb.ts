const DB_NAME = "ecomm";
const VERSION = 1;

abstract class BaseIndexDb {
  private static _db: IDBDatabase | null = null;
  public get db() {
    return BaseIndexDb._db;
  }
  static async init(): Promise<IDBDatabase> {
    return new Promise((res, rej) => {
      if (BaseIndexDb._db) {
        return res(BaseIndexDb._db);
      }
      const dbRequest = window.indexedDB.open(DB_NAME, VERSION);
      dbRequest.addEventListener("success", (event) => {
        const openDBRequest = event.target as IDBOpenDBRequest;
        BaseIndexDb._db = openDBRequest.result;
        res(openDBRequest.result);
      });
      dbRequest.addEventListener("error", (event) => {
        const dbRequest = event.target as IDBOpenDBRequest;
        rej(dbRequest.error?.message);
        console.error("ERROR", { event });
      });

      dbRequest.addEventListener("upgradeneeded", (event) => {
        const openDBRequest = event.target as IDBOpenDBRequest;
        const dbTransaction = openDBRequest.transaction;
        const db = openDBRequest.result;
        let recentlyViewObjectStore: IDBObjectStore | null | undefined;
        if (db.objectStoreNames.contains("recentlyView")) {
          recentlyViewObjectStore = dbTransaction?.objectStore("recentlyView");
        } else {
          recentlyViewObjectStore = db.createObjectStore("recentlyView", {
            keyPath: "id",
          });
        }
        recentlyViewObjectStore?.createIndex("createdAt", "createdAt", {
          unique: true,
        });
      });
    });
  }

  getObjectStore(storeName: string, mode: IDBTransactionMode) {
    return this.db?.transaction(storeName, mode).objectStore(storeName);
  }
}

export { BaseIndexDb };
