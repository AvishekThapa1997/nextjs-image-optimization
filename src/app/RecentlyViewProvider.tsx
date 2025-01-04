"use client";
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { RecentlyViewIndexDb } from "./RecentlyViewIndexDb";

type RecentlyViewedDbContext = {
  db: RecentlyViewIndexDb | null;
};
export const RecentlyViewedDbContext = createContext<RecentlyViewedDbContext>({
  db: null,
});
const RecentlyViewProvider = ({ children }: PropsWithChildren) => {
  const [db, setDb] = useState<RecentlyViewIndexDb | null>(null);
  useEffect(() => {
    async function initDb() {
      const db = await RecentlyViewIndexDb.initialize();
      setDb(db);
    }
    initDb();
  }, []);
  const value: RecentlyViewedDbContext = useMemo(
    () => ({
      db,
    }),
    [db]
  );
  return (
    <RecentlyViewedDbContext.Provider value={value}>
      {children}
    </RecentlyViewedDbContext.Provider>
  );
};

export { RecentlyViewProvider };
