import CommentForm from "./CommentForm";
import "./Comments.css";
const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
}) => {
  const isEditing =
    activeComment &&
    activeComment.CommentId=== comment.CommentId &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.CommentId === comment.CommentId &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.CommentedOn) > fiveMinutes;
  const canDelete =
   replies.length === 0 && !timePassed;
  const canReply = true;
  const canEdit = !timePassed;
  const replyId = parentId ? parentId : comment.CommentId ;
  const createdAt = new Date(comment.CommentedOn).toLocaleDateString();
  return (
    <div key={comment.CommentId} className="comment">
      <div className="comment-image-container">
        <img src="/user-icon.png" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.EmpId}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.Comment}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.Comment} 
            handleSubmit={(text) => updateComment(text, comment.CommentId)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.CommentId, type: "replying" })
              }
            >
              Reply
            </div>
          )} 
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.CommentId, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.CommentId)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.CommentId}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.CommentId}
                replies={[]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;