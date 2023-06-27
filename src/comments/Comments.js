

import {React,useState,useEffect} from 'react'
import {getCommentsByIssueId as getCommentsApi,AddNewComment as createCommentApi,deleteComment as deleteCommentApi,updateComment as updateCommentApi} from "../Features/CommentsSlice";
import { useSelector,useDispatch } from 'react-redux';
import CommentForm from "./CommentForm";
import "./Comments.css"
import Comment from "./Comment";


const Comments=({selectedIssueId})=> {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const { data, loading, error } = useSelector((state) => state.comments);
  const dispatch=useDispatch();
  const rootComments = backendComments.filter((backendComment) => backendComment.parentCommentId === null);
  const getReplies = (commentId) =>
     backendComments
      .filter((backendComment) => backendComment.parentCommentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.CommentedOn).getTime() - new Date(b.CommentedOn).getTime()
      ); 
  const addComment=(text,parentId)=>{
    console.log("addComment",text,parentId);
    const data={
              comment1 :text,
              parentCommentId:parentId,
              empId: 5,
              issueId :selectedIssueId
          } 
    dispatch(createCommentApi(data));
    setActiveComment(null);
  };
  const deleteComment = (commentId) => {
        if (window.confirm("Are you sure you want to remove comment?")) {
          dispatch(deleteCommentApi(commentId));
        }
      };
  //console.log(backendComments);
  const updateComment=(text,commentId)=>{
    const data={
      comment1 :text,
     commentId:commentId
      } 
      dispatch(updateCommentApi(data)); 
      setActiveComment(null);
  }
  useEffect(() => {
    dispatch(getCommentsApi(selectedIssueId));
  }, [selectedIssueId]);
  
  useEffect(() => {
    if (data.length > 0) {
      setBackendComments(data);
    }
  }, [data]);
  
  return (
    <div className="comments">
      <h3 className="comments-title">Comment Section</h3>
      <div className="comment-form-title">Write Here!!</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment}/> 
      <div className="comments-container">
           {rootComments.map((rootcomment) =>(
           <Comment key={rootcomment.commentId} comment={rootcomment} replies={getReplies(rootcomment.commentId)} deleteComment={deleteComment}
           activeComment={activeComment}  setActiveComment={setActiveComment} addComment={addComment} updateComment={updateComment}/>
           ))}
           
      </div>
    </div>
  );
};
 
export default Comments 