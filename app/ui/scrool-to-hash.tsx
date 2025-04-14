// app/components/scroll-to-hash.tsx
'use client';

import { useEffect } from 'react';

export default function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return null; // This component doesn't render anything
}
