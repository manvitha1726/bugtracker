import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetIssueById} from "../Features/IssueSlice";
import { useNavigate } from 'react-router-dom';
import Comments from "../comments/Comments";

import './IssueForm.css';

function DisplayIssue() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { dataById, loading, error} = useSelector((state) => state.issues);
    const {selectedProjectId,selectedIssueId} = useSelector((state) => state.selectedFields);

    useEffect(() => {
      dispatch(GetIssueById(selectedIssueId));
    }, [selectedIssueId]);
    
    const initialFormData = {
        selectedProjectId:"",
        issueName: "",
        issueType: "",
        moduleName: "",
        description: "",
        summary: "",
        identfiedemp: "",
        dateidentified: "",
        priority: "",
        targetdate: "",
        actualdate: "",
        assignTo: "",
        progressreport: "",
        ressummary: "",
        stepsToReproduce: "",
        testingType: "",
        iterationNumber: "",
        status: "",
        linkToPast: "",
        images: "",
        seviority: '',
        
    };

    if(dataById.length!==0){
        initialFormData.issueName = dataById[0].issueName;
        initialFormData.issueType=dataById[0].issueType;
        initialFormData.moduleName=dataById[0].moduleName;
        initialFormData.description =dataById[0].description;
        initialFormData.summary = dataById[0].summary;
        initialFormData.identfiedemp = dataById[0].identfiedemp;
        initialFormData.dateidentified = dataById[0].dateidentified;
        initialFormData.priority = dataById[0].priority;
        initialFormData.targetdate = dataById[0].targetdate;
        initialFormData.actualdate = dataById[0].actualdate;
        initialFormData.assignTo = dataById[0].assignTo;
        initialFormData.progressreport = dataById[0].progressreport;
        initialFormData.ressummary = dataById[0].ressummary
        initialFormData.stepsToReproduce = dataById[0].stepsToReproduce;
        initialFormData.testingType = dataById[0].testingType;
        initialFormData.iterationNumber = dataById[0].iterationNumber;
        initialFormData.status = dataById[0].status;
        initialFormData.linkToPast = dataById[0].linkToPast;
        initialFormData.images = dataById[0].images;
        initialFormData.seviority = dataById[0].seviority;
        initialFormData.selectedProjectId=dataById[0].selectedProjectId;

       
    }
    const NavigateBackClick = () => {
      // navigate(`/projects/${selectedProjectId}/`);
      console.log("selected pj id : -", selectedProjectId);
      navigate(`/projects/${selectedProjectId}/view-all-issues`)
    };
    
    if(loading){
        return <h2>Loading.........</h2>
    }
    if(error !== null){
        return <h2>Oops something went wrong...</h2>
    }
  
    return (
      <div>
        <form className="container" >
        <h3 className="text-center"> View Issue:{initialFormData.issueName}</h3><br/>
        <div className="row">
           <div className="col-25">
              <label className="form-label" htmlFor="name">Issue Name</label>
              <input className="fixedwidth" type="text" id="name" name="name" disabled value={initialFormData.issueName} />
          </div>
          <div className="col-50">
            <label  className="form-label" htmlFor="IssueType" >IssueType</label>
            <select disabled id="IssueType" >
              <option value={initialFormData.issueType} >{initialFormData.issueType}</option>
            </select>
            </div>
            <div className="col-50">
            <label  className="form-label" htmlFor="IssueType" >Severity</label>
            <select disabled id="IssueType" >
              <option value={initialFormData.seviority} >{initialFormData.seviority}</option>
            </select>
            </div>
        </div>


      <div className="row">
      <div className="col-25">
          <label className="form-label" htmlFor="moduleName">Module Name</label>
          <input className="fixedwidth" type="text" id="moduleName" name="moduleName" disabled value={initialFormData.moduleName} />
          </div>
          <div className="col-75">
          <label className="form-label" htmlFor="identifiedemp">Identfied Employee</label>
          <input className="fixedwidth" type="text" disabled id="identfiedemp" name="identfiedemp" value={initialFormData.identfiedemp} />
          </div>
      </div>

      <div className="row">
      <div className="col-25">
          <label className="form-label" htmlFor="dateidentified">Date Identified</label>
          <input className="fixedwidth" type="text" disabled id="dateidentified" name="dateidentified" value={initialFormData.dateidentified} />
          </div>
          <div className="col-75">
          <label className="form-label" htmlFor="targetdate">Target Date</label>
          <input className="fixedwidth" type="text" disabled id="targetdate" name="targetdate" value={initialFormData.targetdate}/>
          </div>
      </div>


      <div className="row">
      <div className="col-25">
          <label className="form-label" htmlFor="actualdate">Actual Date</label>
          <input className="fixedwidth" type="text" disabled id="actualdate" name="actualdate" value={initialFormData.actualdate}/>
          </div>
          <div className="col-75">
          <label className="form-label" htmlFor="assignTo">AssignTo</label>
          <input className="fixedwidth" type="text" disabled id="assignTo" name="assignTo" value={initialFormData.assignTo} />
          </div>
      </div>

      <div className="row">
      <div className="col-25">
          <label className="form-label" htmlFor="progressreport">Progress Report</label>
          <input className="fixedwidth" type="text" disabled id="progressreport" name="progressreport" value={initialFormData.progressreport} />
          </div>
          <div className="col-75">
          <label className="form-label" htmlFor="ressummary">Ressummary</label>
          <input className="fixedwidth" type="text" disabled id="ressummary" name="ressummary" value={initialFormData.ressummary} />
          </div>
      </div>

      <div className="row">
      <div className="col-25">
          <label className="form-label" htmlFor="stepsToReproduce">Steps To Reproduce</label>
          <input className="fixedwidth" type="text" disabled id="stepsToReproduce" name="stepsToReproduce" value={initialFormData.stepsToReproduce} />
          </div>
          <div className="col-75">
        <label className="form-label" htmlFor="iterationNumber">Iteration Number</label>
        <input className="fixedwidth" type="text" id="iterationNumber" name="iterationNumber" disabled value={initialFormData.iterationNumber} />
        </div>
      </div>

      <div className="row">
      <div className="col">
        <label className="form-label" htmlFor="description">Description</label>
        <textarea id="description" name="Description" disabled value={initialFormData.description} />
        </div>
      </div>
      <div className="row">
        <div className="col">
        <label className="form-label" htmlFor="status">Status</label>
        <textarea id="status" name="status" disabled value={initialFormData.status} />
        </div>
      </div>

      

      <center>
          <img src= {initialFormData.images} alt="img"/><br/>
          
      </center>
        </form>
        <Comments selectedIssueId={selectedIssueId}/>
        <button onClick={NavigateBackClick} >Close</button>
      </div>
    );
  }
  
  export default DisplayIssue;
