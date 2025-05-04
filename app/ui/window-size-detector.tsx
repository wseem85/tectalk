'use client';

import { useState, useEffect } from 'react';
import { useSide } from './side-context';

export default function WindowSizeDetector({
  // componentToShow,
  mobileComponentToShow,
  desktopComponentToShow,
}: // children,
{
  // componentToShow: React.ReactNode | null;
  mobileComponentToShow: React.ReactNode | null;
  desktopComponentToShow: React.ReactNode | null;
  // children: React.ReactNode | null;
}) {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const { setIsOpen } = useSide();
  useEffect(
    function () {
      if (windowWidth >= 768) setIsOpen(true);
    },
    [windowWidth, setIsOpen]
  );
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Initial width
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {/* Render UI based on `windowWidth` */}

      {/* {children} */}
      {windowWidth < 768 && mobileComponentToShow}
      {windowWidth >= 768 && desktopComponentToShow}
    </div>
  );
}
