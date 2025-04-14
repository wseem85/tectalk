'use client';

import { useSide } from '../side-context';

export default function ControlViewTopics({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSide();
  return isOpen ? children : null;
}
