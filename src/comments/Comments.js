// import { useState, useEffect } from "react";
// import CommentForm from "./CommentForm";
// import Comment from "./Comment";
// import "./Comments.css"
// import {
//     getCommentsByIssueId as getCommentsApi,
//     AddNewComment as createCommentApi,
//     updateComment as updateCommentApi,
//     deleteComment as deleteCommentApi,
// } from "../Features/CommentsSlice";
// import { useDispatch, useSelector } from 'react-redux';

// const Comments = ({selectedIssueId}) => {
//   const dispatch = useDispatch();
//   const [backendComments, setBackendComments] = useState([]);
//   const [activeComment, setActiveComment] =    useState(null);
//   const { data, loading, error } = useSelector((state) => state.comments);
//   const [dataLoaded, setDataLoaded] = useState(false);
//   const [rootComments,setRootComments]=useState([]);

//   console.log(backendComments);
//   useEffect(() => {
//     dispatch(getCommentsApi(selectedIssueId))
//     setDataLoaded(true);
//     setBackendComments(data);
//    }, []);
 
//     useEffect(() => {
//       if(dataLoaded){
         
//           const rootComments1 = backendComments.filter(
//               (backendComment) => backendComment.parentCommentId === null
//           );
//         setRootComments(rootComments1);
//         console.log("root comments1",rootComments1);
//       }
//    }, [data]);
//   const getReplies = (commentId) =>
//      backendComments
//       .filter((backendComment) => backendComment.parentCommentId === commentId)
//       .sort(
//         (a, b) =>
//           new Date(a.CommentedOn).getTime() - new Date(b.CommentedOn).getTime()
//       ); 
       
//   const addComment = (text) => {
//     const data={
//         comment1 :text,
//         parentCommentId:null,
//         empId: 4,
//         issueId :selectedIssueId
//     } 
//     createCommentApi(data)
//     setActiveComment(null);
//   };

//   const updateComment = (text,commentId) => {
//     dispatch(updateCommentApi(text,commentId))
//     setActiveComment(null);
//   };
//   const deleteComment = (commentId) => {
//     if (window.confirm("Are you sure you want to remove comment?")) {
//       dispatch(deleteCommentApi(commentId));
//     }
//   };

  
//   if(loading){
//     return <h1>Loading...</h1>
//    }

//   if(error){
//     return <h2>Oops Something wrong..</h2>
//    }

// if(dataLoaded){
//   return (
//     <div className="comments">
//       <h3 className="comments-title">Comments</h3>
//       <div className="comment-form-title">Write comment</div>
//       <CommentForm submitLabel="Write" handleSubmit={addComment}/>
//       <div className="comments-container">
//       {console.log("root comments",rootComments)}  
//         {rootComments.map((rootComment) => (
//           <Comment
//             key={rootComment.commentId}
//             comment={rootComment}
//             replies={getReplies(rootComment.commentId)}
//             activeComment={activeComment}
//             setActiveComment={setActiveComment}
//             addComment={addComment}
//             deleteComment={deleteComment}
//             updateComment={updateComment}
//           />
//         ))}
//       </div>
//     </div>
//   );}
// };

// export default Comments;


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