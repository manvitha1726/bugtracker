import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeFetchWithAuthToken,APIMethods } from "./extensionMethods";
var url,method,data;

export const fetchEmployees = createAsyncThunk(
    "fetchEmployees", 
   (args, {rejectWithValue}) => {
        try{
            // const response = await fetch("https://bugtrackerwebapp123.azurewebsites.net/api/Employees/GetAllEmployees");
            // const result = await response.json();
            // return result;
            const response=makeFetchWithAuthToken(
                url="https://bugtrackerwebapp123.azurewebsites.net/api/Employees/GetAllEmployees",
                method=APIMethods.GET,
              );
              return response.error ? rejectWithValue("Found an error", response.error.response.data) : response;
        }
        catch(err){
            console.log(err.response.data);
            return rejectWithValue(err.message);
        }
        
});
//Get emp by Id
export const GetEmployeeById = createAsyncThunk(
    "getEmployeeById",
     (employeeId, {rejectWithValue}) => {
        try{
            // const response = await fetch(
            //     `https://bugtrackerwebapp123.azurewebsites.net/api/Employees/GetEmployeeById?empid=${employeeId}`
            // );
            // const result = await response.json();
            // return result;
            const response=makeFetchWithAuthToken(
                url= `https://bugtrackerwebapp123.azurewebsites.net/api/Employees/GetEmployeeById?empid=${employeeId}`,
                method=APIMethods.GET,
              );
              return response.error ? rejectWithValue("Found an error", response.error.response.data) : response;
            
        }
        catch(err){
            return rejectWithValue("Found an error", err.response.data);
        }
    }
)

export const GetEmployeeByProjectId = createAsyncThunk(
    "GetEmployeeByProjectId",
    (projectId, {rejectWithValue}) => {
        try{
            // console.log("proj - id inside slice :   ", projectId);
            // const response = await fetch(
            //     `https://bugtrackerwebapp123.azurewebsites.net/api/Employees/GetEmployeeByProjectId?projectid=${projectId}`
            // );
            // const result = await response.json();
            // return result;
            const response=makeFetchWithAuthToken(
                url= `https://bugtrackerwebapp123.azurewebsites.net/api/Employees/GetEmployeeByProjectId?projectid=${projectId}`,
                method = APIMethods.GET,
              );
              return response.error ? rejectWithValue("Found an error", response.error.response.data) : response;
        }
        catch(err){
            return rejectWithValue("Found an error", err.response.data);
        }
    }
)

export const addEmployees = createAsyncThunk(
    "addEmployees", 
   (employeeData, {rejectWithValue}) => {
    //const response = await fetch()
    try{
        // // console.log("empdata from slice",employeeData);
        // const response = fetch(`https://bugtrackerwebapp123.azurewebsites.net/api/Employees/AddEmployee`, {  
        //   method: 'POST', 
        //   headers: {
        //     "Content-Type" : "application/json",
        //   },
        //   mode: 'cors', 
        //   body: JSON.stringify(employeeData) // body data type must match "Content-Type" header
        // })
        // const result = await response.json();
        // // console.log(result);
        // return result;
        const response=makeFetchWithAuthToken(
            url= `https://bugtrackerwebapp123.azurewebsites.net/api/Employees/AddEmployee`,
            method = APIMethods.POST,
            data=employeeData
          );
          return response.error ? rejectWithValue("Found an error", response.error.response.data) : response;
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