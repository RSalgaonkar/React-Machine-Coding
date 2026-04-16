import { useState } from 'react';
import type { CommentNode } from '../../types';
import { addReplyToTree } from '../../utils/comments';

function CommentItem({
  comment,
  onReply,
}: {
  comment: CommentNode;
  onReply: (parentId: string, text: string) => void;
}) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleSubmit = () => {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText.trim());
    setReplyText('');
    setShowReply(false);
  };

  return (
    <div className="mt-4">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="font-semibold text-slate-900">{comment.author}</div>
        <p className="mt-1 text-slate-700">{comment.text}</p>

        <button
          onClick={() => setShowReply((prev) => !prev)}
          className="mt-3 rounded-xl bg-slate-800 px-3 py-2 text-sm text-white"
        >
          Reply
        </button>

        {showReply && (
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
            />
            <button
              onClick={handleSubmit}
              className="rounded-xl bg-blue-600 px-4 py-2 text-white"
            >
              Submit
            </button>
          </div>
        )}
      </div>

      {comment.children.length > 0 && (
        <div className="ml-6 border-l border-dashed border-slate-300 pl-4">
          {comment.children.map((child) => (
            <CommentItem key={child.id} comment={child} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function NestedComments({
  initialComments,
}: {
  initialComments: CommentNode[];
}) {
  const [comments, setComments] = useState<CommentNode[]>(initialComments);

  const handleReply = (parentId: string, text: string) => {
    const reply: CommentNode = {
      id: crypto.randomUUID(),
      author: 'You',
      text,
      children: [],
    };

    setComments((prev) => addReplyToTree(prev, parentId, reply));
  };

  return (
    <div>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onReply={handleReply} />
      ))}
    </div>
  );
}