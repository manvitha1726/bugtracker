import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//Get all Issues action
export const getAllIssues = createAsyncThunk(
  "getIssues",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://issuetrackingapp.azurewebsites.net/api/Issues/FetchAllIsues"
      );
      const result = await response.json();
      return result;
    } catch (err) {
      return rejectWithValue("Found an error", err.response.data);
    }
  }
);
// Get Issue By IssueId
export const GetIssueById = createAsyncThunk(
    "getIssueById",
    async (issueId, {rejectWithValue}) => {
        try{
            const response = await fetch(
                `https://issuetrackingapp123.azurewebsites.net/api/issues/fetchissue?issueid=${issueId}`
            );
            const result = await response.json();
            return result;
        }
        catch(err){
            return rejectWithValue("Found an error", err.response.data);
        }
    }
)

//Get Issue By ProjectId
export const GetIssueByProjectId = createAsyncThunk(
  "getIssueByProjectId",
  async (projectId, {rejectWithValue}) => {
      try{ 
          const response = await fetch(
              `https://issuetrackingapp123.azurewebsites.net/api/issues/fetchissuesbyproject?projectid=${projectId}`
          );
          const result = await response.json();
          return result;
      }
      catch(err){
          return rejectWithValue("Found an error", err.response.data);
      }
  }
)
 
//Add Issuue
export const AddNewIssue = createAsyncThunk(
  "addIssue",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://issuetrackingapp123.azurewebsites.net/api/issues/addissue",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }
);

//Delete Issue
export const deleteIssue = createAsyncThunk(
  "deleteIssue",
  async (issueId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `delete issue api/${issueId}`,
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

//update Issue Status
export const updateIssueStatus = createAsyncThunk(
  "issues/updateIssueStatus",
  async ({ issueId,status}, { rejectWithValue }) => {  

    try {
      const response = await fetch(
        `https://issuetrackingapp123.azurewebsites.net/api/issues/updateissue?issueid=${issueId}&status=${status}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
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

//update Entire Issue
export const updateIssue = createAsyncThunk(
  "issues/updateIssue",
  async (formData, { rejectWithValue }) => {  
    console.log("data in slice",formData);
    try {
      const response = await fetch(
        `https://issuetrackingapp123.azurewebsites.net/api/issues/Updateentireissue`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify( formData ),
        }
      );
      
      const result = await response.json(); 
      return result;

    } catch (err) {
      console.log(err)
      return rejectWithValue(err);

    }
  }
);


export const Issues = createSlice({
  name: "Issues",
  initialState: {
    data: [],
    loading: false,
    error: null,
    dataById: []
  },
  reducers: {
 
  },
  extraReducers: {
    [getAllIssues.pending]: (state) => {
      state.loading = true;
    },
    [getAllIssues.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getAllIssues.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [GetIssueById.pending]: (state) => {
        state.loading = true;
      },
    [GetIssueById.fulfilled]: (state, action) => {
        state.loading = false;
        state.dataById = action.payload;
      },
    [GetIssueById.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      [GetIssueByProjectId.pending]: (state) => {
        state.loading = true;
      },
    [GetIssueByProjectId.fulfilled]: (state, action) => {
        state.loading = false;
        state.data = action.payload;
      },
    [GetIssueByProjectId.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    [AddNewIssue.fulfilled]: (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    [deleteIssue.pending]: (state) => {
      state.loading = true;
    },
    [deleteIssue.fulfilled]: (state, action) => {
      state.loading = false;
      const { issueId } = action.payload;
      if (issueId) {
        state.data = state.data.filter((post) => post.issueId !== issueId);
      }
    },
    [deleteIssue.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateIssueStatus.pending]: (state) => {
      state.loading = true;
    },
    [updateIssueStatus.fulfilled]: (state, action) => {
      console.log("updated status fulfilled", action.payload);
      state.loading = false;
      state.data = state.data.map((ele) =>
        ele.issueId === action.payload.issueId ? action.payload : ele
      );
    },
    [updateIssueStatus.rejected]: (state, action) => {
      state.loading = false;    
      state.error = action.payload.message;
    },
    [updateIssue.pending]: (state) => {
      state.loading = true;
    },
    [updateIssue.fulfilled]: (state, action) => {
      console.log("action", action)
      state.loading = false;
      console.log("state.data before",state.data)
      state.data = state.data.map((ele) =>
       ele.issueId === action.payload.issueId ? action.payload : ele  
      );
      //state.data.push(action.payload);
      console.log("state.data after",state.data)
    },
    [updateIssue.rejected]: (state, action) => {
      state.loading = false;    
      state.error = action.payload.message;
    },
  },
});

export default Issues.reducer;