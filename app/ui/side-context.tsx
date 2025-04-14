// components/side-context.tsx
'use client';

import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';
import { createContext, useContext, useState } from 'react';
import { boolean } from 'zod';

type SideContextType = {
  isOpen: boolean;
  closeSide: () => void;
  setIsOpen: (isOpen: boolean) => void;
};

const SideContext = createContext<SideContextType | undefined>(undefined);

export function SideProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SideContext.Provider
      value={{
        isOpen: isOpen,
        closeSide: () => setIsOpen(false),
        setIsOpen: setIsOpen,
      }}
    >
      {children}
    </SideContext.Provider>
  );
}

export function useSide() {
  const context = useContext(SideContext);

  if (!context) {
    throw new Error('useSide must be used within a SideProvider');
  }
  return context;
}
