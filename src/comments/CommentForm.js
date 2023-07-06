
import {useState} from 'react';
import '../Components/Home.css';

const CommentForm=({handleSubmit,submitLabel,hasCancelButton=false,initialText="",handleCancel})=>{
   const [text,setText]=useState(initialText);
   const isTextareaDisabled=text.length===0;
   const onSubmit=(event)=>{
    event.preventDefault()
    handleSubmit(text);
    setText("");
   }
   return(
    <form onSubmit={onSubmit}>
      <textarea className="comment-form-textarea"
      value={text} 
      onChange={(e)=>setText(e.target.value)}/>
      <button className="button-background-color" disabled={isTextareaDisabled}>{submitLabel}</button>
      {hasCancelButton && (
        <button type="button" className="comment-form-cancel-button button-background-color" onClick={handleCancel}>
          Cancel
        </button>
      )  
       }
    </form>
   )
}
export default CommentForm;  