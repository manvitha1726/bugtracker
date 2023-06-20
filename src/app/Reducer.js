import { combineReducers } from "redux";
import projectsReducer from "../Features/ProjectsSlice";
import issuesReducer from '../Features/IssueSlice'
import employeeReducer from '../Features/EmployeeSlice'
import selectedFieldsReducer from '../Features/SelectedFieldsSlice';

export default combineReducers({
    projects:projectsReducer,
    issues:issuesReducer,
    employees:employeeReducer,
    selectedFields: selectedFieldsReducer,
})