'use client';
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from '@heroicons/react/24/solid';
import { Button } from '@heroui/button';
import { useSide } from '../side-context';

export default function ShowTopicsButton() {
  const { isOpen, setIsOpen } = useSide();

  return (
    <Button
      color={`${isOpen ? 'default' : 'primary'}`}
      className="rounded-none my-2 flex justify-center items-center gap-2"
      onPress={() => setIsOpen(!isOpen)}
    >
      <span>{isOpen ? 'Hide Topics' : 'Show All Topics'}</span>
      {isOpen ? (
        <ArrowUpCircleIcon className="w-4 h-4 " />
      ) : (
        <ArrowDownCircleIcon className="w-4 h-4 " />
      )}
    </Button>
  );
}
