// app/components/sidenav-skeleton.tsx
export default function TopicsListSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Mimic your SideNav UI here */}
      <div className="h-[48px] bg-gray-200 rounded mb-4 w-3/4"></div>
      <div className="h-[48px] bg-gray-200 rounded mb-4 w-1/2"></div>
      <div className="h-[48px] bg-gray-200 rounded mb-4 w-3/4"></div>
      <div className="h-[48px] bg-gray-200 rounded mb-4 w-1/2"></div>
      <div className="h-[48px] bg-gray-200 rounded mb-4 w-3/4"></div>
      <div className="h-[48px] bg-gray-200 rounded mb-4 w-1/2"></div>
    </div>
  );
}
