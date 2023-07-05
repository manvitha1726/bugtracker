import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetIssueById} from "../Features/IssueSlice";
import { useNavigate } from 'react-router-dom';
import Comments from "../comments/Comments";
import EmployeeDropdown from "./EmployeeDropdown";

import './IssueForm.css';
import ImageCarouselModal from "./ImageCarouselModal.js";
import { GetEmployeeById } from "../Features/EmployeeSlice";

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
        // issueName: "",
        shortDescription: '',
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
        category: '',
        iterationNumber: "",
        status: "",
        linkToParent: "",
        images: "",
        seviority: '',
        
    };

    if(dataById.length!==0){
        initialFormData.shortDescription = dataById[0].shortDescription;
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
        initialFormData.category = dataById[0].category;
        initialFormData.iterationNumber = dataById[0].iterationNumber;
        initialFormData.status = dataById[0].status;
        initialFormData.linkToParent = dataById[0].linkToParent;
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
          {/* <h3 className="text-center">{`Issue : ${initialFormData.}`}</h3><br /> */}
          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="shortDescription">Short Description</label>
              <input  className="form-control" type="text" id="shortDescription" name="shortDescription" value={initialFormData.shortDescription} disabled/>
            </div>

            <div className="col-75">
            <label className="form-label" htmlFor="moduleName">Module Name</label>
              <input className="form-control" type="text" id="moduleName" name="moduleName" value={initialFormData.moduleName} disabled/>
            </div> 
          </div>

          <div className="row">
            <div className="col-3">
              <label className="form-label" htmlFor="IssueType">Issue Type</label>
              <select id="IssueType" className="IssueStatusBar-background-color" disabled>
                <option value={initialFormData.issueType}>{initialFormData.issueType}</option>
              </select>
            </div>

            <div className="col-3">
              <label className="form-label" htmlFor="status">Status</label>
              <select id="status" className="IssueStatusBar-background-color" disabled>
                <option value={initialFormData.status}>{initialFormData.status}</option>
              </select>
            </div>

            <div className="col-3">
              <label className="form-label" htmlFor="priority">Priority</label>
              <select id="priority" className="IssueStatusBar-background-color" disabled>
                <option value={initialFormData.priority}>{initialFormData.priority}</option>
              </select>
            </div>
          
            <div className="col-3">
                  <label className="form-label" htmlFor="assignTo">Assigned To</label>
                  {/* <input className="form-control" type="text" id="assignTo" name="assignTo" value={initialFormData.assignTo} disabled/> */}
                  {/* <EmployeeDropdown empid={initialFormData.assignTo} /> */}
                  <select className="IssueStatusBar-background-color">
                    <option>{initialFormData.assignTo}</option>
                  </select>
                </div>
          </div>

          <div className="row">
            <div class="col-3">
              <label className="form-label" htmlFor="identifiedemp">Identfied By</label>
              {/* <input className="fixedwidth" type="text" id="identfiedemp" name="identfiedemp" value={initialFormData.identfiedemp} disabled/> */}
              {/* <EmployeeDropdown empid={initialFormData.identfiedemp} /> */}
              <select className="IssueStatusBar-background-color">
                    <option>{initialFormData.assignTo}</option>
                  </select>
            </div>
            <div class="col-3">
                <label className="form-label" htmlFor="seviority">Seviority</label>
                <select id="seviority" className="IssueStatusBar-background-color" disabled >
                  <option value={initialFormData.seviority}>{initialFormData.seviority}</option>
                </select>
            </div>
            <div className="col-3">
              <label className="form-label" htmlFor="testingtype">Testing Type</label>
              <select id="testingtype" className="IssueStatusBar-background-color" disabled>
                <option value={initialFormData.testingType}>{initialFormData.testingType}</option>
              </select>
            </div>
            <div className="col-3">
              <label className="form-label" htmlFor="testingtype">Category Name</label>
              <select id="testingtype" className="IssueStatusBar-background-color" disabled>
                <option value={initialFormData.category}>{initialFormData.category}</option>
              </select>
            </div>
          </div>

            <div className="row">
              <div className="col-25">
                <label className="form-label" htmlFor="dateidentified">Identified Date</label>
                <input className="form-control" type="text" id="dateidentified" name="dateidentified" value={initialFormData.dateidentified.substring(0,10)} disabled />
              </div>
              <div className="col-75">
                  <label className="form-label" htmlFor="targetdate">Target Resolution Date</label>
                  {initialFormData.targetdate!=null ? <input className="form-control" type="text" id="targetdate" name="targetdate" value={initialFormData.targetdate.substring(0,10)} disabled/>:
                  <input className="form-control" type="text" id="targetdate" name="targetdate" value={initialFormData.targetdate} disabled/>}
              </div>
            </div>


          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="iterationNumber">Iteration Number</label>
              <input type="number" id="iterationNumber" className="form-control" name="iterationNumber" value={initialFormData.iterationNumber} disabled />
            </div>
            <div className="col-75">
              <label className="form-label" htmlFor="linkToParent">Link To Parent:</label>
              <input className="form-control" type="text" id="linkToParent" name="linkToParent" value={initialFormData.linkToParent} disabled/>
            </div>
          </div>

          <div className="row">
            <div className="col">
            <label className="form-label" htmlFor="stepsToReproduce">Steps To Reproduce</label>
            <textarea type="text" id="stepsToReproduce" name="stepsToReproduce" value={initialFormData.stepsToReproduce} disabled />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea id="description" placeholder="Description" name="description" value={initialFormData.description} disabled />
            </div>
          </div>


          <label className="form-label">Uploaded attachments</label>
          <ImageCarouselModal images={initialFormData.images} />
        </form>
        
        <div style={{margin:"10%"}}>
          <Comments selectedIssueId={selectedIssueId}/>
        </div>
        <center><button className="button-background-color" onClick={NavigateBackClick}>Close</button></center>
      </div>
    );
}
  export default DisplayIssue;