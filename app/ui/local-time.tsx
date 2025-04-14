// components/local-time.tsx
'use client';

import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

export default function LocalTime({ utcDate }: { utcDate: string | Date }) {
  const [localDate, setLocalDate] = useState<Date>(new Date(utcDate));

  useEffect(() => {
    // Convert UTC to local time explicitly
    const date = new Date(utcDate);
    const offset = date.getTimezoneOffset() * 60 * 1000;
    setLocalDate(new Date(date.getTime() - offset));
  }, [utcDate]);

  return (
    <span className="text-sm text-gray-500">
      {formatDistanceToNow(localDate, { addSuffix: true })}
    </span>
  );
}
