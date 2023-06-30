import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//Get comments by issue Id 
export const getCommentsByIssueId = createAsyncThunk(
  "getCommentsByIssueId",
  async (selectedIssueId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://bugtrackerwebapp123.azurewebsites.net/api/comments/GetCommentByIssueId?IssueId=${selectedIssueId}`
        `https://bugtrackerwebapp123.azurewebsites.net/api/comments/GetCommentByIssueId?IssueId=${selectedIssueId}`
      );
      const result = await response.json();
      return result;
    } catch (err) {
      return rejectWithValue("Found an error", err.response.data);
    }
  }
);


//Add new Comment
export const AddNewComment = createAsyncThunk("addComment",async (data, { rejectWithValue }) => {
    try{
    const response = await fetch(
      "https://bugtrackerwebapp123.azurewebsites.net/api/comments/AddComment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode:'cors',
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }
  catch(err){
    return rejectWithValue("Found an error!",err.response.data)
  }
}
);

//Delete Comment
export const deleteComment = createAsyncThunk(
  "deleteComment",
  async (commentId,{ rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://bugtrackerwebapp123.azurewebsites.net/api/comments/DeleteComment?commentId=${commentId}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      return result;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

//update Comment
export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async (data, { rejectWithValue }) => {  

    try {
      const response = await fetch(
        `https://bugtrackerwebapp123.azurewebsites.net/api/comments/UpdateComment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();  
      console.log(result)   
      return result;

    } catch (err) {
      return rejectWithValue(err);
    }
  }
);



export const Comments = createSlice({
  name: "Comments",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
 
  },
  extraReducers: {
    [getCommentsByIssueId.pending]: (state) => {
      state.loading = true;
    },
    [getCommentsByIssueId.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getCommentsByIssueId.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [AddNewComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    [deleteComment.pending]: (state) => {
      state.loading = true;
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.loading = false;
      const { commentId } = action.payload;
      if (commentId) {
        state.data = state.data.filter((post) => post.commentId !==commentId );
      }
    },
    [deleteComment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
   
    [updateComment.pending]: (state) => {
      state.loading = true;
    },
    [updateComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = state.data.map((ele) =>
       ele.commentId === action.payload.commentId ? action.payload : ele  
      );
    },
    [updateComment.rejected]: (state, action) => {
      state.loading = false;    
      state.error = action.payload.message;
    },
  },
});

export default Comments.reducer;