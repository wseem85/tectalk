import { Skeleton } from '@heroui/skeleton';

export default function PostSkeleton() {
  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className=" min-w-[300px] max-w-[300px] w-full flex flex-col items-center gap-3">
        <div className="w-full flex  ">
          <Skeleton className="h-4 w-2/5 rounded-lg" />
        </div>
        <div className="w-full flex  ">
          <Skeleton className="h-8 w-2/5 rounded-lg" />
        </div>
        <div className="w-full flex flex-row items-center gap-2">
          <Skeleton className="flex rounded-full w-8 h-8" />
          <Skeleton className="h-4 w-3/5 rounded-lg" />
        </div>
      </div>
      <div className=" min-w-full  w-full flex flex-col items-center gap-3">
        <div className="w-full flex  ">
          <Skeleton className="h-40 w-full rounded-lg" />
        </div>
        <div className="w-full flex  ">
          <Skeleton className="h-16 w-full rounded-lg" />
        </div>
        <div className="w-full flex  ">
          <Skeleton className="h-16 w-full rounded-lg" />
        </div>
        <div className="w-full flex  ">
          <Skeleton className="h-16 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
