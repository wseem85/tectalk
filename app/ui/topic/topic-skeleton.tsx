import { Skeleton } from '@heroui/skeleton';

export default function TopicSkeleton() {
  return (
    <>
      <div className=" min-w-[300px] max-w-[300px] w-full flex flex-col items-center gap-3">
        <div className="w-full flex  ">
          <Skeleton className="h-8 w-2/5 rounded-lg" />
        </div>
        <div className="w-full flex flex-row items-center gap-2">
          <Skeleton className="h-6 w-3/5 rounded-lg" />
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
        <div className="w-full flex gap-2">
          <Skeleton className="h-6 w-4/5 rounded-lg" />
        </div>
        <div className="w-full flex  ">
          <Skeleton className="h-8 w-2/5 rounded-lg" />
        </div>
        <div className="w-full flex  ">
          <Skeleton className="h-6 w-1/5 rounded-lg" />
        </div>
      </div>
      <div className=" min-w-full  w-full flex flex-col items-center gap-3">
        <div className="w-full flex  ">
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
        <div className="w-full flex  ">
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
        <div className="w-full flex  ">
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
        <div className="w-full flex  ">
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      </div>
    </>
  );
}
