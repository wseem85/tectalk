import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { lato } from '@/app/ui/font';

export default function TecTalkLogo() {
  return (
    <div
      className={`${lato.className} flex flex-row  gap-2 leading-none text-white`}
    >
      <p className="text-[44px]">
        <span>T</span>ec.<span>T</span>alk
      </p>
      <ChatBubbleLeftRightIcon className="h-9 w-9 text-lg self-start " />
    </div>
  );
}
