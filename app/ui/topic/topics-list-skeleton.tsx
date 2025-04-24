import { Skeleton } from '@heroui/skeleton';

export default function TopicsListSkeleton() {
  return (
    <div className=" mt-4 min-w-full max-w-full  w-full flex flex-col justify-start gap-3">
      <div className="w-3/5  ">
        <Skeleton className="h-6 w-full rounded-sm" />
      </div>
      <div className="w-2/5  ">
        <Skeleton className="h-6 w-full rounded-sm" />
      </div>
      <div className="w-1/5  ">
        <Skeleton className="h-6 w-full rounded-sm" />
      </div>
      <div className="w-3/5  ">
        <Skeleton className="h-6 w-full rounded-sm" />
      </div>
      <div className="w-4/5  ">
        <Skeleton className="h-6 w-full rounded-sm" />
      </div>
      <div className="w-full  ">
        <Skeleton className="h-6 w-full rounded-sm" />
      </div>
    </div>
  );
}
