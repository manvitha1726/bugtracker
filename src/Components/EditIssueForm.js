import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetIssueById,updateIssue} from "../Features/IssueSlice";

function EditIssueForm({ issueId }) {
    const dispatch = useDispatch();
    const { dataById, loading, error} = useSelector((state) => state.issues);
    useEffect(() => {
      dispatch(GetIssueById(issueId))
        .then((res) => {
          if (res.payload) {
            dispatch(GetIssueById(issueId));
          }
        })
        .catch((error) => {
          console.log('Error occurred during Issue dispatch', error);
        });
    }, []);
    
    
    const initialFormData = {
        issueId:issueId,
        projectId:"",
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
        status: ""
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
        initialFormData.projectId=dataById[0].projectId;

        
    }
    // Define the form state
    const [formData, setFormData] = useState(initialFormData);
    console.log('formdata',formData)
    const [selectedIssue, setSelectedIssue] = useState(formData.issueType);
    const [selectedTesting, setSelectedTesting] = useState(formData.testingType);
    const [selectedPriority, setSelectedPriority] = useState(formData.priority);
    const [attachedFiles, setAttachedFiles] = useState([]);
    
    const handleFileUpload = (event) => {
      const files = event.target.files;
      setAttachedFiles([...attachedFiles, ...files]);
    };
  
    const handleIssueSelection = (event) => {
      setSelectedIssue(event.target.value);
    };
  
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
  
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)
        dispatch(updateIssue(formData));
      
      };
    if(loading){
        return <h2>Loading.........</h2>
    }
    if(error !== null){
        return <h2>Oops something went wrong...</h2>
    }
    console.log("formdata",formData)

    if(dataById!=null){
    return (
      <div>
        <form className="form-container" onSubmit={handleSubmit}>
        <div className="row-container">
          <label className="form-label" htmlFor="name">Name</label>
          <input className="form-input" type="text" id="name" name="issueName" value={formData.issueName} onChange={handleChange}/>
            </div>


      <div className="row-container">
        <label  className="form-label" htmlFor="IssueType">IssueType</label>
        <select id="IssueType" value={selectedIssue} onChange={handleIssueSelection}>
        <option value="bug">Bug</option>
        <option value="Defect">Defect</option>
      </select>
      </div>

      <div className="row-container">
          <label className="form-label" htmlFor="moduleName">moduleName</label>
          <input className="form-input" type="text" id="moduleName" name="moduleName" value={formData.moduleName} onChange={handleChange}/>
      </div>

      <div className="row-container">
        <label className="form-label" htmlFor="summary">Summary</label>
        <textarea id="summary" name="summary" value={formData.summary} onChange={handleChange}/>
      </div>

      <div className="row-container">
          <label className="form-label" htmlFor="identifiedemp">identfiedemp</label>
          <input className="form-input" type="text" id="identfiedemp" name="identfiedemp" value={formData.identfiedemp} onChange={handleChange}/>
      </div>

      <div className="row-container">
          <label className="form-label" htmlFor="dateidentified">dateidentified</label>
          <input className="form-input" type="text" id="dateidentified" name="dateidentified" value={formData.dateidentified} onChange={handleChange}/>
      </div>


      <div className="row-container">
        <label className="form-label" htmlFor="priority">priority</label>    
        <select id="IssueType" value={selectedPriority} onChange={handleSelectedPriority}>
            <option value="bug">Low</option>
            <option value="Defect">Medium</option>
            <option value="Defect">High</option>
        </select>

      </div>

      <div className="row-container">
          <label className="form-label" htmlFor="targetdate">targetdate</label>
          <input className="form-input" type="text" id="targetdate" name="targetdate" value={formData.targetdate} onChange={handleChange}/>
      </div>

      <div className="row-container">
          <label className="form-label" htmlFor="actualdate">actualdate</label>
          <input className="form-input" type="text" id="actualdate" name="actualdate" value={formData.actualdate} onChange={handleChange}/>
      </div>

      <div className="row-container">
          <label className="form-label" htmlFor="assignTo">assignTo</label>
          <input className="form-input" type="text" id="assignTo" name="assignTo" value={formData.assignTo} onChange={handleChange}/>
      </div>

      <div className="row-container">
          <label className="form-label" htmlFor="progressreport">progressreport</label>
          <input className="form-input" type="text" id="progressreport" name="progressreport" value={formData.assignTo} onChange={handleChange}/>
      </div>

      <div className="row-container">
          <label className="form-label" htmlFor="ressummary">ressummary</label>
          <input className="form-input" type="text" id="ressummary" name="ressummary" value={formData.ressummary} onChange={handleChange}/>
      </div>

      <div className="row-container">
          <label className="form-label" htmlFor="stepsToReproduce">stepsToReproduce</label>
          <input className="form-input" type="text" id="stepsToReproduce" name="stepsToReproduce" value={formData.stepsToReproduce} onChange={handleChange}/>
      </div>

      <div className="row-container">
        <label className="form-label" htmlFor="description">Description</label>
        <textarea id="description" name="Description" value={formData.description} onChange={handleChange}/>
      </div>

      <div className="row-container">
        <label className="form-label" htmlFor="testingType">testingType</label>
        <select id="testingType" value={selectedTesting} onChange={handleTestingSelection}>
            <option value="Open">Open</option>
            <option value="Inprogress">Inprogress</option>
            <option value="Hold">Hold</option>
            <option value="Closed">Closed</option>
            {/* Add more options as needed */}
        </select>
      </div>

      <div className="row-container">
        <label className="form-label" htmlFor="iterationNumber">iterationNumber</label>
        <textarea id="iterationNumber" name="iterationNumber" value={formData.iterationNumber} onChange={handleChange}/>
      </div>

      <div className="row-container">
        <label className="form-label" htmlFor="status">status</label>
        <textarea id="status" name="status" value={formData.status} onChange={handleChange}/>
      </div>
      <div className="row-container">
          <label className="form-label" htmlFor="linkToPast">linkToPast:</label>
          <input className="form-input" type="text" id="linkToPast" name="linkToPast" value={formData.linkToPast} onChange={handleChange}/>
      </div>
      

       <div>
        <label className="form-label" htmlFor="images">Upload Image</label>
        <input className="form-input" type="file" multiple onChange={handleFileUpload} />
      </div> 
          
          <button type="submit">Save Changes</button>
        </form>
      </div>
    );
  }
  }
  
  export default EditIssueForm;
  