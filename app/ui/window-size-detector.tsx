'use client';

import { useState, useEffect } from 'react';

export default function WindowSizeDetector({
  mobileComponentToShow,
  desktopComponentToShow,
  children,
}: {
  mobileComponentToShow: React.ReactNode | null;
  desktopComponentToShow: React.ReactNode | null;
  children: React.ReactNode | null;
}) {
  const [windowWidth, setWindowWidth] = useState<number>(0);

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
    <div>
      {/* Render UI based on `windowWidth` */}

      {children}
      {windowWidth < 768 && mobileComponentToShow}
      {windowWidth >= 768 && desktopComponentToShow}
    </div>
  );
}
