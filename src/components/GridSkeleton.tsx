"use client";

interface GridSkeletonProps {
  height?: string;
  rows?: number;
}

export default function GridSkeleton({ height = "h-[460px]", rows = 8 }: GridSkeletonProps) {
  return (
    <div
      className={`relative w-full ${height} rounded-xl border border-[#eae7df] dark:border-[#27272a] bg-white dark:bg-[#121215] p-4 flex flex-col justify-between overflow-hidden animate-pulse shadow-[0_1px_3px_rgba(0,0,0,0.015)]`}
      aria-label="Loading data table..."
    >
      {/* Top Toolbar Skeleton */}
      <div className="flex items-center justify-between border-b border-[#f4f2ea] dark:border-[#27272a] pb-3">
        <div className="h-7 w-48 bg-[#f4f2ea] dark:bg-[#18181b] rounded-md" />
        <div className="flex items-center gap-2">
          <div className="h-7 w-20 bg-[#f4f2ea] dark:bg-[#18181b] rounded-md" />
          <div className="h-7 w-7 bg-[#f4f2ea] dark:bg-[#18181b] rounded-md" />
          <div className="h-7 w-7 bg-[#f4f2ea] dark:bg-[#18181b] rounded-md" />
          <div className="h-7 w-7 bg-[#f4f2ea] dark:bg-[#18181b] rounded-md" />
        </div>
      </div>

      {/* Header Row Skeleton */}
      <div className="grid grid-cols-6 gap-4 py-2 border-b border-[#eae7df] dark:border-[#27272a] bg-[#fbfaf7] dark:bg-[#18181b] -mx-4 px-4">
        <div className="h-4 bg-[#eae7df] dark:bg-[#27272a] rounded col-span-1" />
        <div className="h-4 bg-[#eae7df] dark:bg-[#27272a] rounded col-span-2" />
        <div className="h-4 bg-[#eae7df] dark:bg-[#27272a] rounded col-span-1" />
        <div className="h-4 bg-[#eae7df] dark:bg-[#27272a] rounded col-span-1" />
        <div className="h-4 bg-[#eae7df] dark:bg-[#27272a] rounded col-span-1" />
      </div>

      {/* Grid Rows Skeleton */}
      <div className="flex-1 space-y-3 py-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="grid grid-cols-6 gap-4 items-center border-b border-[#f4f2ea] dark:border-[#27272a] pb-2.5">
            <div className="h-3.5 bg-[#f9f8f4] dark:bg-[#1c1c21] rounded col-span-1" />
            <div className="h-3.5 bg-[#f9f8f4] dark:bg-[#1c1c21] rounded col-span-2" />
            <div className="h-3.5 bg-[#f9f8f4] dark:bg-[#1c1c21] rounded col-span-1" />
            <div className="h-3.5 bg-[#f9f8f4] dark:bg-[#1c1c21] rounded col-span-1" />
            <div className="h-3.5 bg-[#f9f8f4] dark:bg-[#1c1c21] rounded col-span-1" />
          </div>
        ))}
      </div>

      {/* Bottom Pagination Skeleton */}
      <div className="flex items-center justify-between border-t border-[#f4f2ea] dark:border-[#27272a] pt-3">
        <div className="h-4 w-32 bg-[#f4f2ea] dark:bg-[#18181b] rounded" />
        <div className="h-6 w-24 bg-[#f4f2ea] dark:bg-[#18181b] rounded" />
      </div>
    </div>
  );
}
