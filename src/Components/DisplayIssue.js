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
        initialFormData.selectedProjectId=dataById[0].selectedProjectId;

       
    }
    const NavigateBackClick = () => {
      // navigate(`/projects/${selectedProjectId}/`);
      // console.log("selected pj id : -", selectedProjectId);
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
        <button style={{position:'absolute', right:'23%', top:'10%'}} onClick={NavigateBackClick} >Close</button>

        <form className="container" >
        <h3 className="text-center"> View Issue:{initialFormData.issueName}</h3><br/>

        <div className="row">
           <div className="col-25">
              <label className="form-label" htmlFor="name">Issue Name</label>
          </div>
          <div className="col-75">
              <input className="fixedwidth" type="text" id="name" name="name" disabled value={initialFormData.issueName} />
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label  className="form-label" htmlFor="IssueType" >IssueType</label>
          </div>
          <div className="col-75">
            <select disabled id="IssueType" >
              <option value={initialFormData.issueType} >{initialFormData.issueType}</option>
            </select>
            </div>
        </div>

      <div className="row">
      <div className="col-25">
          <label className="form-label" htmlFor="moduleName">moduleName</label>
      </div>
      <div className="col-75">
          <input className="fixedwidth" type="text" id="moduleName" name="moduleName" disabled value={initialFormData.moduleName} />
          </div>
      </div>

      <div className="row">
      <div className="col-25">
        <label className="form-label" htmlFor="summary">Summary</label>
      </div>
      <div className="col-75">
        <textarea id="summary" name="summary" disabled value={initialFormData.summary} />
        </div>
      </div>

      <div className="row">
      <div className="col-25">
          <label className="form-label" htmlFor="identifiedemp">identfiedemp</label>
      </div>
      <div className="col-75">
          <input className="fixedwidth" type="text" disabled id="identfiedemp" name="identfiedemp" value={initialFormData.identfiedemp} />
          </div>
      </div>

      <div className="row">
      <div className="col-25">
          <label className="form-label" htmlFor="dateidentified">dateidentified</label>
      </div>
      <div className="col-75">
          <input className="fixedwidth" type="text" disabled id="dateidentified" name="dateidentified" value={initialFormData.dateidentified} />
          </div>
      </div>

      <div className="row">
      <div className="col-25">
          <label className="form-label" htmlFor="targetdate">targetdate</label>
      </div>
      <div className="col-75">
          <input className="fixedwidth" type="text" disabled id="targetdate" name="targetdate" value={initialFormData.targetdate}/>
          </div>
      </div>

      <div className="row">
      <div className="col-25">
          <label className="form-label" htmlFor="actualdate">actualdate</label>
      </div>
      <div className="col-75">
          <input className="fixedwidth" type="text" disabled id="actualdate" name="actualdate" value={initialFormData.actualdate}/>
          </div>
      </div>

      <div className="row">
      <div className="col-25">
          <label className="form-label" htmlFor="assignTo">assignTo</label>
      </div>
      <div className="col-75">
          <input className="fixedwidth" type="text" disabled id="assignTo" name="assignTo" value={initialFormData.assignTo} />
          </div>
      </div>

      <div className="row">
      <div className="col-25">
          <label className="form-label" htmlFor="progressreport">progressreport</label>
      </div>
      <div className="col-75">
          <input className="fixedwidth" type="text" disabled id="progressreport" name="progressreport" value={initialFormData.progressreport} />
          </div>
      </div>

      <div className="row">
      <div className="col-25">
          <label className="form-label" htmlFor="ressummary">ressummary</label>
      </div>
      <div className="col-75">
          <input className="fixedwidth" type="text" disabled id="ressummary" name="ressummary" value={initialFormData.ressummary} />
          </div>
      </div>

      <div className="row">
      <div className="col-25">
          <label className="form-label" htmlFor="stepsToReproduce">stepsToReproduce</label>
      </div>
      <div className="col-75">
          <input className="fixedwidth" type="text" disabled id="stepsToReproduce" name="stepsToReproduce" value={initialFormData.stepsToReproduce} />
          </div>
      </div>

      <div className="row">
      <div className="col-25">
        <label className="form-label" htmlFor="description">Description</label>
      </div>
      <div className="col-75">
        <textarea id="description" name="Description" disabled value={initialFormData.description} />
        </div>
      </div>

      <div className="row">
      <div className="col-25">
        <label className="form-label" htmlFor="iterationNumber">iterationNumber</label>
      </div>
      <div className="col-75">
        <textarea id="iterationNumber" name="iterationNumber" disabled value={initialFormData.iterationNumber} />
        </div>
      </div>

      <div className="row">
      <div className="col-25">
        <label className="form-label" htmlFor="status">status</label>
      </div>
      <div className="col-75">
        <textarea id="status" name="status" disabled value={initialFormData.status} />
        </div>
      </div>
      <div className="row">
      <div className="col-25">
          <label className="form-label" htmlFor="linkToPast">linkToPast:</label>
      </div>
      <div className="col-75">
          <a href="#">{initialFormData.linkToPast}  + 1</a>
          </div>
      </div>
      <div className="row">
      <div className="col-25">
          <label className="form-label" htmlFor="Iteration">Iteration:</label>
      </div>
      <div className="col-75">
          <input className="fixedwidth" disabled type="text" id="Iteration" name="Iteration" value={initialFormData.IterationNumber} />
      </div>
      </div>
      <center>
          <img src= {initialFormData.images} alt="img"/><br/>
          
      </center>
        </form>
        <div style={{margin:"10%"}}>
          <Comments selectedIssueId={selectedIssueId}/>
        </div>
      </div>
    );
  }
  
  export default DisplayIssue;
