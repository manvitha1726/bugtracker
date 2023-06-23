import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import "./Comments.css"
import {
    getCommentsByIssueId as getCommentsApi,
    AddNewComment as createCommentApi,
    updateComment as updateCommentApi,
    deleteComment as deleteCommentApi,
} from "../Features/CommentsSlice";
import { useDispatch, useSelector } from 'react-redux';

const Comments = ({selectedIssueId}) => {
  const dispatch = useDispatch();
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const { data, loading, error } = useSelector((state) => state.comments);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [rootComments,setRootComments]=useState([]);

  useEffect(() => {
    dispatch(getCommentsApi(selectedIssueId))
    setDataLoaded(true);
    setBackendComments(data);
    console.log("backend comments",data);
   }, []);
 
    useEffect(() => {
      if(dataLoaded){
         
          const rootComments1 = backendComments.filter(
              (backendComment) => backendComment.parentCommentId === null
          );
        setRootComments(rootComments1);
        console.log("root comments1",rootComments1);
      }
   }, [data]);
  const getReplies = (commentId) =>
     backendComments
      .filter((backendComment) => backendComment.parentCommentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.CommentedOn).getTime() - new Date(b.CommentedOn).getTime()
      ); 
       
  const addComment = (text) => {
    const data={
        comment1 :text,
        parentCommentId:null,
        empId: 4,
        issueId :selectedIssueId
    }
    createCommentApi(data)
    setActiveComment(null);
  };

  const updateComment = (text,commentId) => {
    dispatch(updateCommentApi(text,commentId))
    setActiveComment(null);
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      dispatch(deleteCommentApi(commentId));
    }
  };

  
  if(loading){
    return <h1>Loading...</h1>
   }

  if(error){
    return <h2>Oops Something wrong..</h2>
   }

if(dataLoaded){
  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment}/>
      <div className="comments-container">
      {console.log("root comments",rootComments)}  
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.commentId}
            comment={rootComment}
            replies={getReplies(rootComment.commentId)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
          />
        ))}
      </div>
    </div>
  );}
};

export default Comments;