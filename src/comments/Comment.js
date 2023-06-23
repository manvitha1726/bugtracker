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
    activeComment.commentId=== comment.commentId &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.commentId === comment.commentId &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.commentedOn) > fiveMinutes;
  const canDelete =
   replies.length === 0 && !timePassed;
  const canReply = true;
  const canEdit = !timePassed;
  const replyId = parentId ? parentId : comment.commentId ;
  const createdAt = new Date(comment.commentedOn).toLocaleDateString();
  return (
    <div key={comment.commentId} className="comment">
      <div className="comment-image-container">
        <img src="user-icon.png"/>
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.empId}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.comment1}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.comment1} 
            handleSubmit={(text) => updateComment(text, comment.commentId)}
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
                setActiveComment({ id: comment.commentId, type: "replying" })
              }
            >
              Reply
            </div>
          )} 
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.commentId, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.commentId)}
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
                key={reply.commentId}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.commentId}
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