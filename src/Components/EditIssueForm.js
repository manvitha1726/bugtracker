import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetIssueById, updateIssue } from "../Features/IssueSlice";
import './IssueForm.css';
import { useNavigate } from "react-router-dom";
function EditIssueForm() {
  const dispatch = useDispatch();
  const { dataById, loading, error } = useSelector((state) => state.issues);
  const issueId = useSelector((state) => state.selectedFields.selectedIssueId);
  const navigate = useNavigate();

  const initialFormData = {
    issueId: issueId,
    projectId: "",
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
    images: ""
  };
  console.log('initialformdata',initialFormData)
  const [formData, setFormData] = useState([]);
 
  console.log('formdata',formData)
  const [selectedIssue, setSelectedIssue] = useState();
  const [selectedTesting, setSelectedTesting] = useState();
  const [selectedPriority, setSelectedPriority] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [dataDispatched, setDataDispatched] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false);
  const {selectedProjectId} = useSelector((state) => state.selectedFields);

  useEffect(() => {
    console.log('issueId', issueId, dataById);
    dispatch(GetIssueById(issueId));
    setDataDispatched(true)

  }, [issueId]);
  // useEffect(() => {
  //   console.log('formdata', formData);
   
  //   setSelectedIssue(formData.issueType);
    
  // }, [formData]);
  useEffect(() => {
    if(dataDispatched){
      console.log('dataById', dataById);
      initialFormData.issueName = dataById[0].issueName;
      initialFormData.issueType = dataById[0].issueType;
      initialFormData.moduleName = dataById[0].moduleName;
      initialFormData.description = dataById[0].description;
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
      initialFormData.projectId = dataById[0].projectId;
      initialFormData.images = dataById[0].images;
      setFormData(initialFormData);
      // setSelectedIssue(dataById[0].issueType);
      setDataLoaded(true)
    }
    
  }, [dataById]);
  
  

  // if (dataById.length !== 0) {
    
  // } 
  // Define the form state
 

  const handleFileUpload = (event) => {
    const files = event.target.files;
    setAttachedFiles([...attachedFiles, ...files]);
  };

  const handleIssueSelection = (event) => {
    setSelectedIssue(event.target.value);
    console.log("selectedissue", selectedIssue)
  };
  const handleStatusSelection = (event) => {
    setSelectedStatus(event.target.value);
  }

  const handleTestingSelection = (event) => {
    setSelectedTesting(event.target.value);
  };

  const handleSelectedPriority = (event) => {
    setSelectedPriority(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // const handleIssueNameChange = (event) => {
  //   const { name, value } = event.target;
  //   initialFormData.issueName = value
  // }

  const NavigateBackClick = () => {
    // navigate(`/projects/${selectedProjectId}/`);
    // console.log("selected pj id : -", selectedProjectId);
    navigate(`/projects/${selectedProjectId}/view-all-issues`)
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Obj given to update issue", formData)
    dispatch(updateIssue(formData));

  };

  if (error !== null) {
    return <h2>Oops something went wrong...</h2>
  }

  if (loading) {
    console.log("formdata", loading, formData)
    return <h2>Loading.........</h2>
  } 
  if(dataLoaded)
  {
    return (
      <div className="main_container">
        {/* {console.log('inside return', loading, formData, initialFormData)} */}
        <form className="container" onSubmit={handleSubmit}>
          <h3 className="text-center">{`Edit Issue Details: ${formData.issueName}`}</h3><br />
          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="name">Issue Name</label></div>
            <div className="col-75">
              <input className="fixedwidth" type="text" id="name" name="issueName" value={formData.issueName} onChange={handleChange} />
            </div></div>


          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="IssueType">Issue Type</label></div>
            <div className="col-75">
              <select id="IssueType" value={selectedIssue} onChange={handleIssueSelection}>
                <option value="bug">Bug</option>
                <option value="Defect">Defect</option>
              </select>
            </div></div>

          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="moduleName">Module Name</label></div>
            <div className="col-75">
              <input className="fixedwidth" type="text" id="moduleName" name="moduleName" value={formData.moduleName} onChange={handleChange} />
            </div></div>

          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="summary">Summary</label></div>
            <div className="col-75">
              <textarea id="summary" name="summary" className="fixedwidthtext" value={formData.summary} onChange={handleChange} />
            </div></div>

          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="identifiedemp">Identfied By</label></div>
            <div className="col-75">
              <input className="fixedwidth" type="text" id="identfiedemp" name="identfiedemp" value={formData.identfiedemp} onChange={handleChange} />
            </div></div>

          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="dateidentified">Identified Date</label></div>
            <div className="col-75">
              <input className="fixedwidth" type="text" id="dateidentified" name="dateidentified" value={formData.dateidentified} onChange={handleChange} />
            </div></div>


          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="priority">Priority</label></div>
            <div className="col-75">
              <select id="IssueType" value={selectedPriority} onChange={handleSelectedPriority}>
                <option value="bug">Low</option>
                <option value="Defect">Medium</option>
                <option value="Defect">High</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="targetdate">Target Resolution Date</label></div>
            <div className="col-75">
              <input className="fixedwidth" type="text" id="targetdate" name="targetdate" value={formData.targetdate} onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="actualdate">Actual Resolution Date</label></div>
            <div className="col-75">
              <input className="fixedwidth" type="text" id="actualdate" name="actualdate" value={formData.actualdate} onChange={handleChange} />
            </div></div>

          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="assignTo">Assigned To</label></div>
            <div className="col-75">
              <input className="fixedwidth" type="text" id="assignTo" name="assignTo" value={formData.assignTo} onChange={handleChange} />
            </div></div>

          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="progressreport">Progress Report</label></div>
            <div className="col-75">
              <input className="fixedwidth" type="text" id="progressreport" name="progressreport" value={formData.progressreport} onChange={handleChange} />
            </div></div>

          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="ressummary">Ressolution Summary</label></div>
            <div className="col-75">
              <input className="fixedwidth" type="text" id="ressummary" name="ressummary" value={formData.ressummary} onChange={handleChange} />
            </div></div>

          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="stepsToReproduce">Steps To Reproduce</label></div>
            <div className="col-75">
              <input className="fixedwidth" type="text" id="stepsToReproduce" name="stepsToReproduce" value={formData.stepsToReproduce} onChange={handleChange} />
            </div></div>

          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="description">Description</label></div>
            <div className="col-75">
              <textarea id="description" name="description" className="fixedwidthtext" value={formData.description} onChange={handleChange} />
            </div></div>

          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="status">Status</label></div>
            <div className="col-75">
              <select id="status" value={selectedStatus} onChange={handleStatusSelection}>
                <option value="Open">Open</option>
                <option value="In Progress">Inprogress</option>
                <option value="Hold">Hold</option>
                <option value="Close">Closed</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="testingtype">Testing Type</label></div>
            <div className="col-75">
              <select id="testingtype" value={selectedTesting} onChange={handleTestingSelection}>
                <option value="Smoke Testing">Smoke Testing</option>
                <option value="Regression Testing">Regression Testing</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="iterationNumber">Iteration Number</label></div>
            <div className="col-75">
              <textarea id="iterationNumber" name="iterationNumber" className="fixedwidthtext" value={formData.iterationNumber} onChange={handleChange} />
            </div></div>

          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="linkToPast">Link To Past:</label></div>
            <div className="col-75">
              <input className="fixedwidth" type="text" id="linkToPast" name="linkToPast" value={formData.linkToPast} onChange={handleChange} />
            </div></div>


          <div>
            <div className="col-25">
              <label className="form-label" htmlFor="images">Upload Image</label></div>
            <div className="col-75">
              <input className="fixedwidth" type="file" multiple onChange={handleFileUpload} />
            </div> </div>

          <center><img src={formData.images} alt="Uploaded Image" /></center><br />

          <button type="submit">Save Changes</button>
        </form>
        <button onClick={NavigateBackClick}>Close</button>
      </div>
    );
  }
}



export default EditIssueForm;