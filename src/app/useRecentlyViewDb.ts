import { useContext } from "react";
import { RecentlyViewedDbContext } from "./RecentlyViewProvider";

export function useRecentlyViewDb() {
  const result = useContext(RecentlyViewedDbContext);
  if (!result) {
    throw new Error(
      "useRecentlyView must be used within RecentlyViewedProvider"
    );
  }
  return result.db;
}
