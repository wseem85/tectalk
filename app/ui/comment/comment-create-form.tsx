'use client';

import { useActionState } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
// import { useFormState } from 'react-dom';
import { Textarea, Button, Avatar } from '@heroui/react';
// import FormButton from '@/components/common/form-button';
import { createComment } from '@/app/lib/actions';
import { CreateCommentFormState } from '@/app/lib/actions';
import { useParams } from 'next/navigation';

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
  const params = useParams();

  const slug = params.slug as string;
  const [state, formAction] = useActionState(
    createComment.bind(null, { postId, parentId, slug }),
    initialState
  );

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
      <div className="flex flex-col gap-2 border border-gray-300 p-3">
        <div className="flex gap-4 items-center ">
          <Avatar src={avatar} />
          <div className="space-y-2 px-1 flex-1">
            <Textarea
              name="text"
              label="Reply"
              placeholder="Enter your comment"
              isInvalid={!!state.errors.text}
              errorMessage={state.errors.text?.join(', ')}
            />

            {state.errors._form ? (
              <div className="p-2 bg-red-200 border rounded border-red-400">
                {state.errors._form?.join(', ')}
              </div>
            ) : null}
          </div>
        </div>
        <Button className="w-32" type="submit">
          Post Comment
        </Button>
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
