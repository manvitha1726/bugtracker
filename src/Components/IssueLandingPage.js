import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetIssueByProjectId} from "../Features/IssueSlice";
import './IssueForm.css';
import IssueTable from "./IssueTable";
import {GetIssuesByTimePeriod} from "../Features/IssueSlice";

const IssueLandingPage = ({onItemClick}) => {
    const dispatch = useDispatch();
    const { data, loading, error} = useSelector((state) => state.issues);
    const {selectedProjectId,selectedIssueId} = useSelector((state) => state.selectedFields);
    const [unassignedIssues, setUnassignedIssues] = useState([]);
    const [resolvedIssues, setResolvedIssues] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataDispatched, setDataDispatched] = useState(false);
    const [fromDate, setFromDate] = useState(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
    const dataByTimePeriod = useSelector((state) => state.issues.dataByTimePeriod);

    const handleFromDateChange = (selectedDate) => {
        setFromDate(selectedDate);
      };
    
      const handleToDateChange = (selectedDate) => {
        setToDate(selectedDate);
      };

    useEffect(() => {
      dispatch(GetIssueByProjectId(selectedProjectId));
      setDataDispatched(true)
    }, []);

    useEffect(() => {
      if (fromDate && toDate) {
        const currentDate = new Date(toDate);
        currentDate.setDate(currentDate.getDate() + 1);
        const nextDay = currentDate.toLocaleDateString('en-CA');
        // console.log(nextDay)
        dispatch(GetIssuesByTimePeriod({selectedProjectId, fromDate, toDate: nextDay}));
      }
    }, [fromDate, toDate]);

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
        return (
            <div class="text-center my-auto">
              <br/><br/><br/><br/><br/><br/><br/><br/>
              <div class="spinner-border" role="status">
              </div>
              <br/>
              <span>Loading....</span>
            </div>
          )
    }
    if(error !== null){
        return <h2>Oops something went wrong...</h2>
    }
    if(dataLoaded){
        return (
            <div>
                <IssueTable issuesList={unassignedIssues.slice(0, 5)} noOfIssues={unassignedIssues.length} tableName={'Unassigned'} onItemClick={onItemClick} />
                <br /><br/>
                <IssueTable issuesList={resolvedIssues.slice(0, 5)} noOfIssues={resolvedIssues.length} tableName={'Resolved'} onItemClick={onItemClick}/>
                <br/><br/>
                <IssueTable tableName={'TimePeriod'} fromDate={fromDate} toDate={toDate} issuesList={dataByTimePeriod} handleFromDateChange={handleFromDateChange}  handleToDateChange={handleToDateChange} onItemClick={onItemClick}/>
            </div> 
        )
    }
}

export default IssueLandingPage 