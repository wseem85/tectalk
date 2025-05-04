// components/local-time.tsx
'use client';

import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

export default function LocalTime({ utcDate }: { utcDate: string | Date }) {
  const [localDate, setLocalDate] = useState<Date>(new Date());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Ensure the input is properly parsed as UTC
    const date =
      typeof utcDate === 'string'
        ? new Date(utcDate.endsWith('Z') ? utcDate : utcDate + 'Z')
        : new Date(utcDate);

    setLocalDate(date);
  }, [utcDate]);

  // To avoid hydration mismatch, don't render anything until mounted
  if (!isMounted) {
    return <span className="text-sm text-gray-500">...</span>;
  }

  return (
    <span className="text-sm text-gray-500">
      {formatDistanceToNow(localDate, { addSuffix: true })}
    </span>
  );
}
