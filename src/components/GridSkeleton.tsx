"use client";

interface GridSkeletonProps {
  height?: string;
  rows?: number;
}

export default function GridSkeleton({ height = "h-[460px]", rows = 8 }: GridSkeletonProps) {
  return (
    <div
      className={`relative w-full ${height} rounded-lg border border-stone-200 bg-white p-4 flex flex-col justify-between overflow-hidden animate-pulse`}
      aria-label="Loading data table..."
    >
      {/* Top Toolbar Skeleton */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div className="h-7 w-48 bg-stone-200/80 rounded-md" />
        <div className="flex items-center gap-2">
          <div className="h-7 w-20 bg-stone-100 rounded-md" />
          <div className="h-7 w-7 bg-stone-100 rounded-md" />
          <div className="h-7 w-7 bg-stone-100 rounded-md" />
          <div className="h-7 w-7 bg-stone-100 rounded-md" />
        </div>
      </div>

      {/* Header Row Skeleton */}
      <div className="grid grid-cols-6 gap-4 py-2 border-b border-stone-200/60 bg-stone-50/50 -mx-4 px-4">
        <div className="h-4 bg-stone-200/90 rounded col-span-1" />
        <div className="h-4 bg-stone-200/90 rounded col-span-2" />
        <div className="h-4 bg-stone-200/90 rounded col-span-1" />
        <div className="h-4 bg-stone-200/90 rounded col-span-1" />
        <div className="h-4 bg-stone-200/90 rounded col-span-1" />
      </div>

      {/* Grid Rows Skeleton */}
      <div className="flex-1 space-y-3 py-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="grid grid-cols-6 gap-4 items-center border-b border-stone-100 pb-2.5">
            <div className="h-3.5 bg-stone-100 rounded col-span-1" />
            <div className="h-3.5 bg-stone-100 rounded col-span-2" />
            <div className="h-3.5 bg-stone-100 rounded col-span-1" />
            <div className="h-3.5 bg-stone-100 rounded col-span-1" />
            <div className="h-3.5 bg-stone-100 rounded col-span-1" />
          </div>
        ))}
      </div>

      {/* Bottom Pagination Skeleton */}
      <div className="flex items-center justify-between border-t border-stone-100 pt-3">
        <div className="h-4 w-32 bg-stone-100 rounded" />
        <div className="h-6 w-24 bg-stone-100 rounded" />
      </div>
    </div>
  );
}
