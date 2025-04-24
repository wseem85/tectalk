import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
// import { Button } from '@nextui-org/react';
import CommentCreateForm from './comment-create-form';
import { fetchCommentsByPostId } from '@/app/lib/data';
import LocalTime from '../local-time';

interface CommentShowProps {
  commentId: string;
  postId: string;
  avatar: string;
}

export default async function CommentShow({
  commentId,
  postId,
  avatar,
}: CommentShowProps) {
  const comments = await fetchCommentsByPostId(postId);

  const comment = comments.find((c) => c.comment_id === commentId);

  if (!comment) {
    return null;
  }

  const children = comments.filter((c) => c.parent_id === commentId);

  const renderedChildren = children.map((child) => {
    return (
      <CommentShow
        key={child.comment_id}
        commentId={child.comment_id}
        postId={postId}
        avatar={avatar}
      />
    );
  });

  return (
    <div className="p-4 border mt-2 mb-1">
      <div className="flex gap-3">
        <Image
          src={comment.user_avatar || ''}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <div className="flex gap-4">
            <p className="text-sm font-medium text-gray-600">
              {comment.user_name}
            </p>
            <LocalTime utcDate={comment.created_at} />
          </div>
          <p className="text-gray-900">{comment.text}</p>

          <CommentCreateForm
            avatar={avatar}
            postId={postId}
            parentId={comment.comment_id}
          />
        </div>
      </div>
      <div className="pl-4">{renderedChildren}</div>
    </div>
  );
}
