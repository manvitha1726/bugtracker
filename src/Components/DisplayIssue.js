import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetIssueById} from "../Features/IssueSlice";
import { useNavigate } from 'react-router-dom';
import Comments from "../comments/Comments";
import EmployeeDropdown from "./EmployeeDropdown";

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
      navigate(`/projects/${selectedProjectId}/ViewIssues`)
    };
    
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
  

    return (
      <div className="main_container">
        <form className="container">
          <h3 className="text-center">{`Issue : ${initialFormData.issueName}`}</h3><br />
          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="name">Issue Name</label>
              <input  className="form-control" type="text" id="name" name="issueName" value={initialFormData.issueName} disabled/>
            </div>

            <div className="col-75">
            <label className="form-label" htmlFor="moduleName">Module Name</label>
              <input className="form-control" type="text" id="moduleName" name="moduleName" value={initialFormData.moduleName} disabled/>
            </div> 
          </div>

          <div className="row">
            <div className="col-3">
              <label className="form-label" htmlFor="IssueType">Issue Type</label>
              <select id="IssueType" disabled>
                <option value={initialFormData.issueType}>{initialFormData.issueType}</option>
              </select>
            </div>

            <div className="col-3">
              <label className="form-label" htmlFor="status">Status</label>
              <select id="status" disabled>
                <option value={initialFormData.status}>{initialFormData.status}</option>
              </select>
            </div>

            <div className="col-3">
              <label className="form-label" htmlFor="priority">Priority</label>
              <select id="priority" disabled>
                <option value={initialFormData.priority}>{initialFormData.priority}</option>
              </select>
            </div>
          

            <div className="col-3">
              <label className="form-label" htmlFor="testingtype">Testing Type</label>
              <select id="testingtype" disabled>
                <option value={initialFormData.testingType}>{initialFormData.testingType}</option>
              </select>
            </div>
          </div>

            <div className="row">
              <div className="col-25">
                <label className="form-label" htmlFor="dateidentified">Identified Date</label>
                <input className="form-control" type="text" id="dateidentified" name="dateidentified" value={initialFormData.dateidentified} disabled />
              </div>
              <div className="col-75">
                  <label className="form-label" htmlFor="targetdate">Target Resolution Date</label>
                  <input className="form-control" type="text" id="targetdate" name="targetdate" value={initialFormData.targetdate} disabled/>
              </div>
            </div>

            <div className="row">
                <div className="col-25">
                  <label className="form-label" htmlFor="actualdate">Actual Resolution Date</label>
                  <input className="form-control" type="text" id="actualdate" name="actualdate" value={initialFormData.actualdate} disabled/>
                </div>

                <div className="col-75">
                  <label className="form-label" htmlFor="assignTo">Assigned To</label>
                  {/* <input className="form-control" type="text" id="assignTo" name="assignTo" value={initialFormData.assignTo} disabled/> */}
                  <EmployeeDropdown empid={initialFormData.assignTo} />
                </div>
            </div>

            <div className="row">
                <div className="col-25">
                  <label className="form-label" htmlFor="progressreport">Progress Report</label>
                  <input className="form-control" type="text" id="progressreport" name="progressreport" value={initialFormData.progressreport} disabled />
                </div>
                <div className="col-75">
                  <label className="form-label" htmlFor="stepsToReproduce">Steps To Reproduce</label>
                  <input className="form-control" type="text" id="stepsToReproduce" name="stepsToReproduce" value={initialFormData.stepsToReproduce} disabled />
                </div>
            </div>

          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="iterationNumber">Iteration Number</label>
              <input type="number" id="iterationNumber" className="form-control" name="iterationNumber" value={initialFormData.iterationNumber} disabled />
            </div>
            <div className="col-75">
              <label className="form-label" htmlFor="linkToPast">Link To Past:</label>
              <input className="fixedwidth" type="text" id="linkToPast" name="linkToPast" value={initialFormData.linkToPast} disabled/>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label className="form-label" htmlFor="summary">Summary</label>
              <textarea placeholder="Summary" id="summary" name="summary" value={initialFormData.summary} disabled/>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea id="description" placeholder="Description" name="description" value={initialFormData.description} disabled />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="identifiedemp">Identfied By</label>
              {/* <input className="fixedwidth" type="text" id="identfiedemp" name="identfiedemp" value={initialFormData.identfiedemp} disabled/> */}
              <EmployeeDropdown empid={initialFormData.identfiedemp} />
            </div>
            <div className="col-3">
                <label className="form-label" htmlFor="seviority">Seviority</label>
                <select id="seviority" disabled >
                  <option value={initialFormData.seviority}>{initialFormData.seviority}</option>
                </select>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label className="form-label" htmlFor="ressummary">Ressolution Summary</label>
              <textarea  id="ressummary" name="ressummary" value={initialFormData.ressummary} disabled/>
            </div>
          </div>

          <center><img src={initialFormData.images} alt="Uploaded Image" /></center><br />

        </form>
        <div style={{margin:"10%"}}>
          <Comments selectedIssueId={selectedIssueId}/>
        </div>
        <center><button onClick={NavigateBackClick}>Close</button></center>
      </div>
    );
}
  export default DisplayIssue;