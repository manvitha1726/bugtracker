import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetIssueById, GetIssueByProjectId} from "../Features/IssueSlice";
import './IssueForm.css';
import IssueTable from "./IssueTable";

const IssueLandingPage = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const { data, loading, error} = useSelector((state) => state.issues);
    const {selectedProjectId,selectedIssueId} = useSelector((state) => state.selectedFields);
    const [unassignedIssues, setUnassignedIssues] = useState([]);
    const [resolvedIssues, setResolvedIssues] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataDispatched, setDataDispatched] = useState(false);

    useEffect(() => {
      dispatch(GetIssueByProjectId(selectedProjectId));
      setDataDispatched(true)
    }, []);

    useEffect(() => {
        if(dataDispatched){
            const arr1 = data.filter(issue => (issue.assignTo === null || issue.assignTo === 0));
            setUnassignedIssues(arr1)
            const arr2 = data.filter(issue => issue.status === "Close");
            setResolvedIssues(arr2)
            console.log("arr2", arr2);

            {console.log("data in lp : ", data)}
            setDataLoaded(true);
        }
    }, [data])
    
    
    if(loading){
        return <h2>Loading.........</h2>
    }
    if(error !== null){
        return <h2>Oops something went wrong...</h2>
    }
    if(dataLoaded){
        return (
            <div>
                <IssueTable issuesList={unassignedIssues.slice(0, 5)} noOfIssues={unassignedIssues.length} tableName={'Unassigned'}  />
                <br /><br/>
                <IssueTable issuesList={resolvedIssues.slice(0, 5)} noOfIssues={resolvedIssues.length} tableName={'Resolved'} />
            </div>
        )
    }
}

export default IssueLandingPage