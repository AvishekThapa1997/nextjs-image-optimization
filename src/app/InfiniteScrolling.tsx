"use client";
import React, { PropsWithChildren, useEffect, useRef } from "react";

interface InfiniteScrollingProps extends PropsWithChildren {
  onPageEnd: () => void;
}

const InfiniteScrolling = ({ children, onPageEnd }: InfiniteScrollingProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }
    const intersectionCallback: IntersectionObserverCallback = (entries) => {
      const entry = Array.isArray(entries) ? entries[0] : null;
      if (!entry || (entry && !entry.isIntersecting)) {
        return;
      }
      onPageEnd();
    };
    const intersectionInit: IntersectionObserverInit = {
      threshold: 1.0,
    };
    const intersectionObserver = new IntersectionObserver(
      intersectionCallback,
      intersectionInit
    );
    intersectionObserver.observe(elementRef.current);
    return () => {
      intersectionObserver.disconnect();
    };
  }, [onPageEnd]);
  return (
    <>
      {children}
      <div ref={elementRef} className="la" aria-hidden="true"></div>
    </>
  );
};

export default InfiniteScrolling;
