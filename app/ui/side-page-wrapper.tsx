// components/side-page-wrapper.tsx
'use client';

import { SideProvider } from './side-context';
// import OpenSideBarButton from './sidebar-open-button';

export default function SidePageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SideProvider>
      <div className="sidebar">{children}</div>
    </SideProvider>
  );
}
