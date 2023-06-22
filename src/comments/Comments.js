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

const Comments = (selectedIssueId) => {
  const dispatch = useDispatch();
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const { data, loading, error } = useSelector((state) => state.comments);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [rootComments,setRootComments]=useState([]);

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.ParentCommentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.CommentedOn).getTime() - new Date(b.CommentedOn).getTime()
      );
  const addComment = (text, parentId) => {
    const newComment={
        Comment :text,
        ParentCommentId:parentId,
        username: "",
        EmpId: "",
        IssueId :selectedIssueId
    }
    createCommentApi(newComment)
    setActiveComment(null);
    // .then((comment) => {
    //   setBackendComments([comment, ...backendComments]);
    //   setActiveComment(null);
    // });
  };

  const updateComment = (text,commentId) => {
    dispatch(updateCommentApi(text,commentId))
    setActiveComment(null);
    // .then(() => {
    //   const updatedBackendComments = backendComments.map((backendComment) => {
    //     if (backendComment.id === commentId) {
    //       return { ...backendComment, body: text };
    //     }
    //     return backendComment;
    //   });
    //   setBackendComments(updatedBackendComments);
    //   setActiveComment(null);
    // });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      dispatch(deleteCommentApi(commentId));
    //   .then(() => {
    //     const updatedBackendComments = backendComments.filter(
    //       (backendComment) => backendComment.id !== commentId
    //     );
    //     setBackendComments(updatedBackendComments);
    //   });
    }
  };

  useEffect(() => {
   dispatch(getCommentsApi(selectedIssueId))
   setBackendComments(data);
  }, []);

   useEffect(() => {
     const rootComments1 = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  setRootComments(rootComments1);
  setDataLoaded(true);
  }, [data]);
  
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
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
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