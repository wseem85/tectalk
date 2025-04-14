'use client';
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from '@heroicons/react/24/solid';
import { Button } from '../button';
import { useSide } from '../side-context';

export default function ShowTopicsButton() {
  const { isOpen, setIsOpen } = useSide();

  return (
    <Button
      className={`w-full ${
        isOpen ? 'bg-gray-100' : 'bg-blue-200'
      }  rounded-none my-2 flex justify-center items-center gap-2`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span>{isOpen ? 'Hide Topics' : 'Show Topics'}</span>
      {isOpen ? (
        <ArrowUpCircleIcon className="animate-bounce" />
      ) : (
        <ArrowDownCircleIcon className="animate-bounce" />
      )}
    </Button>
  );
}
