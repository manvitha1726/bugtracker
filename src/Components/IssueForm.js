import React, { useEffect, useState } from "react";
import { AddNewIssue } from "../Features/IssueSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import EmployeeDropdown from "./EmployeeDropdown";
import AddEmployee from "./AddEmployee";
import ImageUpload from "./ImageUpload/ImageUpload";
import './IssueForm.css';

function IssueForm({ projectId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const NavigateBackClick1 = () => {
    navigate(`/projects/`);
  };

  const NavigateToIssues = () => {
    navigate(`/projects/`);
}

const initialFormData = {
  projectId: `${projectId}`,
  issueName: "",
  issueType: "",
  moduleName: "",
  description: "",
  summary: "",
  identfiedemp: "",
  dateidentified: "",
  priority: "Low",
  targetdate: "",
  assignTo: "",
  progressreport: "",
  stepsToReproduce: "",
  testingType: "Smoke Testing",
  iterationNumber: "",
  status: "Open",
  linkToPast: null,
  images: ""
  };

  const [val1, setVal1] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [selectedIssue, setSelectedIssue] = useState("Bug");
  const [selectedTesting, setSelectedTesting] = useState("Smoke Testing");
  const [selectedPriority, setSelectedPriority] = useState('Low');
  const [selectedAssignedEmployee, setSelectedAssignedEmployee] = useState(1);
  const [attachedFiles, setAttachedFiles] = useState('');

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, assignTo: `${selectedAssignedEmployee}` }));
  }, [selectedAssignedEmployee]);

  useEffect(() => {
    console.log("image from form: ", attachedFiles);
    setFormData((prevFormData) => ({ ...prevFormData, images: attachedFiles }));
  }, [attachedFiles]);

  useEffect(() => {
    // console.log("issue type : ", selectedIssue);
    setFormData((prevFormData) => ({ ...prevFormData,  issueType: selectedIssue}));
    }, [selectedIssue])

  const handleFileUpload = (event) => {
    const files = event.target.files;
    setAttachedFiles([...attachedFiles, ...files]);
  };

  const handleIssueSelection = (event) => {
    setSelectedIssue(event.target.value);
    setFormData((prevFormData) => ({ ...prevFormData, issueType: event.target.value }));
  };

  const handleTestingSelection = (event) => {
    setSelectedTesting(event.target.value);
    setFormData((prevFormData) => ({ ...prevFormData, testingType: event.target.value }));
  };

  const handleSelectedPriority = (event) => {
    setSelectedPriority(event.target.value);
    setFormData((prevFormData) => ({ ...prevFormData, priority: event.target.value }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Before submit form data", formData);
    dispatch(AddNewIssue(formData))
    .then((response) => {
      console.log("After Issue form submitted response is : ",response);
      // if(response.payload == true|| response == true){
      //         NavigateToIssues();
      // }
      // NavigateToIssues();
      // func(response);
    })
    .catch(error => {
        console.error('Error updating bug status:', error);
      });
  };
 return (
  <>
        <form className="container">
        <h3 className="text-center">Enter Issue Details:</h3><br/>
        <div className="row">
          <div className="col-25">
            <label className="form-label" htmlFor="issueName">Issue Name</label>
          </div>
          <div className="col-75">
            <input className="fixedwidth" type="text" id="issueName" name="issueName" value={formData.issueName} onChange={handleChange} required />
          </div>
        </div>
      
        <div className="row">
          <div className="col-25">
            <label className="form-label" htmlFor="IssueType">Issue Type</label>
          </div>
          <div className="col-75">
            <select id="IssueType" value={selectedIssue} onChange={handleIssueSelection} required>
              <option value="Bug">Bug</option>
              <option value="Defect">Defect</option>
            </select>
          </div>
        </div>
      
        <div className="row">
          <div className="col-25">
            <label className="form-label" htmlFor="moduleName">Module Name</label>
          </div>
          <div className="col-75">
            <input className="fixedwidth" type="text" id="moduleName" name="moduleName" value={formData.moduleName} onChange={handleChange} required />
          </div>
        </div>
      
        <div className="row">
          <div className="col-25">
            <label className="form-label" htmlFor="summary">Summary</label>
          </div>
          <div className="col-75">
            <textarea className="fixedwidthtext" id="summary" name="summary" value={formData.summary} onChange={handleChange} required />
          </div>
        </div>
      
        <div className="row">
          <div className="col-25">
            <label className="form-label" htmlFor="identfiedemp">Identfied Employee ID</label>
          </div>
          <div className="col-75">
            <input className="fixedwidth" type="text" id="identfiedemp" name="identfiedemp" value={formData.identfiedemp} onChange={handleChange} required />
          </div>
        </div>
      
        <div className="row">
          <div className="col-25">
            <label className="form-label" htmlFor="dateidentified">Identified Date</label>
          </div>
          <div className="col-75">
            <input className="fixedwidth" type="date" id="dateidentified" name="dateidentified" value={formData.dateidentified} onChange={handleChange} required />
          </div>
        </div>
      
        <div className="row">
          <div className="col-25">
            <label className="form-label" htmlFor="priority">Priority</label>
          </div>
          <div className="col-75">
            <select id="IssueType" value={selectedPriority} onChange={handleSelectedPriority} required>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

      <div className="row">
        <div className="col-25">
          <label className="form-label" htmlFor="targetdate">Target Date</label>
        </div>
        <div className="col-75">
          <input className="fixedwidth" type="date" id="targetdate" name="targetdate" value={formData.targetdate} onChange={handleChange}/>
        </div>
      </div>

      <div className="row">
          <div className="col-25">
              <label className="form-label" htmlFor="assignTo">Assigned To</label>
          </div>
         
          <div className="col-75">
            <EmployeeDropdown val={val1} callBackFunc={setSelectedAssignedEmployee} />
            <br /><br />
            <AddEmployee func={setVal1} projectId={projectId} />
            {/* {console.log("emp selected", selectedAssignedEmployee)} */}
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label className="form-label" htmlFor="progressreport">Progress Report</label>
          </div>
          <div className="col-75">
            <input className="fixedwidth" type="text" id="progressreport" name="progressreport" value={formData.progressreport} onChange={handleChange}/>
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label className="form-label" htmlFor="stepsToReproduce">Steps To Reproduce</label>
          </div>
          <div className="col-75">
            <input className="fixedwidth" type="text" id="stepsToReproduce" name="stepsToReproduce" value={formData.stepsToReproduce} onChange={handleChange}/>
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label className="form-label" htmlFor="description">Description</label>
          </div>
          <div className="col-75">
            <textarea className="fixedwidthtext" id="description" name="description" value={formData.Description} onChange={handleChange}/>
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label className="form-label" htmlFor="testingType">Testing Type</label>
          </div>
          <div className="col-75">
            <select id="testingType" value={selectedTesting} onChange={handleTestingSelection}>
              <option value="Smoke Testing">Smoke Testing</option>
              <option value="Regression Testing">Regression Testing</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label className="form-label" htmlFor="iterationNumber">Iteration Number</label>
          </div>
          <div className="col-75">
          <input type="number" id="iterationNumber"  name="iterationNumber" value={formData.iterationNumber} onChange={handleChange} />
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label className="form-label" htmlFor="images">Upload Image</label>
          </div>
          
          <div className="col-75">
            {/* <input className="fixedwidth" type="file" multiple onChange={handleFileUpload} /> */}
            <ImageUpload callBackFunc={setAttachedFiles} />
          </div>
        </div>

        <button type="submit" onClick={handleSubmit}>Add Issue</button> 
        </form>
        &nbsp;&nbsp;
               <button onClick={NavigateBackClick1}>Cancel</button>
        </>
        );

        }

        export default IssueForm;

