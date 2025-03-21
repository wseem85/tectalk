import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { lato } from '@/app/ui/font';

export default function AcmeLogo() {
  return (
    <div
      className={`${lato.className} flex flex-row items-center leading-none text-white`}
    >
      <p className="text-[44px]">
        <span>T</span>ec.<span>T</span>alk
      </p>
      <ChatBubbleLeftRightIcon className="h-12 w-12 text-lg " />
    </div>
  );
}
