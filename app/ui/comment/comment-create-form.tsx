'use client';

import { useActionState } from 'react';
import { useEffect, useRef, useState } from 'react';

// import { useFormState } from 'react-dom';
// import {  Button, Avatar } from '@heroui/react';
import { Textarea } from '@heroui/react';
import { Button } from '@heroui/button';
// import FormButton from '@/components/common/form-button';
import { createComment } from '@/app/lib/actions';
import { CreateCommentFormState } from '@/app/lib/actions';
import { useParams } from 'next/navigation';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
  avatar?: string;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
  avatar,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const initialState: CreateCommentFormState = { errors: {} };
  const [inputValue, setInputValue] = useState('');
  const params = useParams();

  const slug = params.slug as string;
  const [state, formAction, isPending] = useActionState(
    createComment.bind(null, { postId, parentId, slug }),
    initialState
  );
  useEffect(() => {
    if (state.errors.text && inputValue.length >= 3) {
      state.errors.text = undefined;
    }
  }, [inputValue, state.errors]);
  useEffect(() => {
    if (state.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [state, startOpen]);

  const form = (
    <form action={formAction} ref={ref}>
      <div className=" flex flex-col gap-2 border border-gray-300 p-1 sm:p-3">
        {/* <Avatar size="sm" src={avatar} /> */}
        <div className="  flex gap-2 sm:gap-4 items-center ">
          <div className=" sm:space-y-2 sm:px-1 flex-1">
            <Textarea
              name="text"
              variant="flat"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              // label="Reply"
              placeholder="Write your comment"
              isInvalid={!!state.errors.text}
              errorMessage={state.errors.text?.join(', ')}
            />

            {state.errors._form ? (
              <div className="p-2 bg-red-200 border rounded border-red-400">
                {state.errors._form?.join(', ')}
              </div>
            ) : null}
          </div>
          <Button
            size="sm"
            className=" w-8 bg-transparent disabled:opacity-40  "
            type="submit"
            isLoading={isPending}
            disabled={inputValue.length < 3}
          >
            {!isPending && (
              <PaperAirplaneIcon className="h-6 w-6 text-primary " />
            )}
          </Button>
        </div>
      </div>
    </form>
  );

  return (
    <div>
      <Button size="sm" variant="light" onClick={() => setOpen(!open)}>
        Reply
      </Button>
      {open && form}
    </div>
  );
}
