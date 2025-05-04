// components/local-time.tsx
'use client';

import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

export default function LocalTime({ utcDate }: { utcDate: string | Date }) {
  const [localDate, setLocalDate] = useState<Date>(new Date(utcDate));

  useEffect(() => {
    // Force UTC interpretation if your input is UTC string like "2023-01-01T00:00:00Z"
    const date = new Date(
      utcDate + (utcDate.toString().endsWith('Z') ? '' : 'Z')
    );
    setLocalDate(date);
  }, [utcDate]);
  return (
    <span className="text-sm text-gray-500">
      {formatDistanceToNow(localDate, { addSuffix: true })}
    </span>
  );
}
