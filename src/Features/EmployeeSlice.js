import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchEmployees = createAsyncThunk(
    "fetchEmployees", 
    async (args, {rejectWithValue}) => {
        try{
            const response = await fetch("https://issuetrackingapp123.azurewebsites.net/api/employees/getallemployees");
            const result = await response.json();
            return result;
        }
        catch(err){
            console.log(err.response.data);
            return rejectWithValue(err.message);
        }
        
});
//Get emp by Id
export const GetEmployeeById = createAsyncThunk(
    "getEmployeeById",
    async (employeeId, {rejectWithValue}) => {
        try{
            const response = await fetch(
                `https://issuetrackingapp123.azurewebsites.net/api/employees/getemployeebyid?empid=${employeeId}`
            );
            const result = await response.json();
            return result;
        }
        catch(err){
            return rejectWithValue("Found an error", err.response.data);
        }
    }
)

export const GetEmployeeByProjectId = createAsyncThunk(
    "GetEmployeeByProjectId",
    async (projectId, {rejectWithValue}) => {
        try{
            // console.log("proj - id inside slice :   ", projectId);
            const response = await fetch(
                `https://issuetrackingapp123.azurewebsites.net/api/employees/getemployeebyprojectid?projectid=${projectId}`
            );
            const result = await response.json();
            return result;
        }
        catch(err){
            return rejectWithValue("Found an error", err.response.data);
        }
    }
)

export const addEmployees = createAsyncThunk(
    "addEmployees", 
    async (employeeData, {rejectWithValue}) => {
    //const response = await fetch()
    try{
        console.log("empdata from slice",employeeData);
        const response = fetch(`https://issuetrackingapp123.azurewebsites.net/api/employees/addemployee`, {  
          method: 'POST', 
          headers: {
            "Content-Type" : "application/json",
          },
          mode: 'cors', 
          body: JSON.stringify(employeeData) // body data type must match "Content-Type" header
        })
        const result = await response.json();
        console.log(result);
        return result;
   }catch(err){
    return rejectWithValue("Found an error!",err.response.data)
  }
})

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        isLoading: false,
        data: null,
        isError: false,

    },
    extraReducers: (builder) => {
        builder.addCase(fetchEmployees.pending, 
            (state, action) => {
                state.isLoading = true;
        });
        builder.addCase(fetchEmployees.fulfilled, 
            (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
        });
        builder.addCase(fetchEmployees.rejected, 
            (state, action) => {
                console.log("Error : ", action.payload);
                state.isError =  true;
        });
        builder.addCase(GetEmployeeByProjectId.pending, 
            (state, action) => {
                state.isLoading = true;
        });
        builder.addCase(GetEmployeeByProjectId.fulfilled, 
            (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
        });
        builder.addCase(GetEmployeeByProjectId.rejected, 
            (state, action) => {
                console.log("Error : ", action.payload);
                state.isError =  true;
        });
        // builder.addCase(addEmployees.pending,
        //     (state, action) => {
        //         state.isLoading = true;
        // });
        builder.addCase(addEmployees.fulfilled, 
            (state, action) => {
                state.isLoading = false;
                console.log("action",action)
                state.data.push(action.payload);
        });
        // builder.addCase(addEmployees.rejected, 
        //     (state, action) => {
        //         console.log("Error : ", action.payload);
        //         state.isError =  true;
        // });
    }
})

export default employeeSlice.reducer;