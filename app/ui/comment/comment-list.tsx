import CommentShow from './comment-show';

import { fetchCommentsByPostId } from '@/app/lib/data';

// TODO: Get a list of comments from somewhere
export default async function CommentList({
  postId,
  avatar,
}: {
  postId: string;
  avatar: string;
}) {
  const comments = await fetchCommentsByPostId(postId);

  const topLevelComments = comments.filter(
    (comment) => comment.parent_id === null
  );

  //   return null;
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.comment_id}
        commentId={comment.comment_id}
        postId={postId}
        avatar={avatar}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">
        {comments.length === 0
          ? 'No Comments Yet'
          : `All ${comments.length} comments`}
      </h1>
      {renderedComments}
    </div>
  );
}
