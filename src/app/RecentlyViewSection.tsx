"use client";
import dynamic from "next/dynamic";
import React from "react";
import { RecentlyViewSkeleton } from "./RecentlyViewSkeleton";

const RecentlyView = dynamic(
  () => import("./RecentlyView").then((mod) => mod.RecentlyView),
  { loading: () => <RecentlyViewSkeleton /> }
);
const RecentlyViewSection = () => {
  return <RecentlyView />;
};

export { RecentlyViewSection };
