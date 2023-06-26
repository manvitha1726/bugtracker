import {FaUser} from 'react-icons/fa';
import "./Comments.css" 
import CommentForm from "./CommentForm";
const Comment =({comment,replies,deleteComment,setActiveComment,activeComment,parentId = null,addComment,updateComment})=>{
  // console.log("replies",replies);
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.commentedOn) > fiveMinutes;
  const canDelete = !timePassed; 
  // const canDelete = true; 
  const canReply = true;
  const canEdit = !timePassed;
  // const createdAt = new Date(comment.commentedOn).toLocaleDateString();
  const createdAt = new Date(comment.commentedOn).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });
  
  const isEditing = activeComment && activeComment.id=== comment.commentId && activeComment.type === "editing";
  const isReplying = activeComment && activeComment.id === comment.commentId && activeComment.type === "replying";
  const replyId = parentId ? parentId : comment.commentId ;
  
  return(
    <div className="comment">
       <div className="comment-image-container">  
          <FaUser/>
      </div>

      <div className="comment-right-part">
         <div className="comment-content">
             <div className="comment-author">{comment.empId}</div>
          <div>{createdAt} </div>
        </div>
        {!isEditing &&<div className="comment-text">{comment.comment1}</div>} 
        {isEditing && (
          <CommentForm submitLabel="Update" hasCancelButton initialText={comment.comment1} handleSubmit={(text)=>updateComment(text,comment.commentId)} handleCancel={()=>{setActiveComment(null)}}/>
        )}
        <div className="comment-actions">
          {canReply && (<div className="comment-action" onClick={() =>setActiveComment({ id: comment.commentId, type: "replying" })}>Reply</div>)}
          {canEdit && (<div className="comment-action"  onClick={() =>setActiveComment({ id: comment.commentId, type: "editing" })}>Edit</div>)}
          {canDelete && (<div className="comment-action" onClick={()=>deleteComment(comment.commentId)}>Delete</div>)}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply" 
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length>0 && (
          <div className="replies">
            {replies.map((reply)=>(
              <Comment comment={reply} key={reply.commentId} replies={[]} deleteComment={deleteComment} addComment={addComment} 
              parentId={comment.commentId} activeComment={activeComment} setActiveComment={setActiveComment} updateComment={updateComment}/>
            ))}
          </div>
        )}
    </div>
    </div>
  );
};
export default Comment;