import React, { useEffect, useState } from "react";
import { AddNewIssue } from "../Features/IssueSlice";
import { useDispatch ,useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import EmployeeDropdown from "./EmployeeDropdown";
import AddEmployee from "./AddEmployee";
import ImageUpload from "./ImageUpload/ImageUpload";
import validateForm from './formValidation';
import { getAllProjects } from "../Features/ProjectsSlice";
import './IssueForm.css';

function IssueForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projectId = useSelector((state) => state.selectedFields.selectedProjectId);
  const projObj= useSelector((state) => state.projects);
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
  const [IdentifiedEmployee, setIdentifiedEmployee] = useState();
  const [attachedFiles, setAttachedFiles] = useState('');
  const [errors,setErrors]= useState({});
  const [issues,setIssues]= useState([]);

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, assignTo: `${selectedAssignedEmployee}` }));
    setFormData((prevFormData) => ({ ...prevFormData, assignTo: `${selectedAssignedEmployee}` }));
  }, [selectedAssignedEmployee]);

  useEffect(() => {
    console.log("image from form: ", attachedFiles);
    setFormData((prevFormData) => ({ ...prevFormData, images: attachedFiles }));
  }, [attachedFiles]);

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData,  issueType: selectedIssue}));
    }, [selectedIssue])

  useEffect(() => {
    dispatch(getAllProjects());
    console.log("projects data",projObj.data);
  }, []);

  const NavigateBackClick1 = () => {
    navigate(`/projects/${projectId}`);
  };

  const NavigateToIssues = () => {
    navigate(`/projects/${projectId}`);
  }

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
    const validationData={
            issueName:formData.issueName,
            moduleName:formData.moduleName,
            summary:formData.summary,
            identfiedemp:formData.identfiedemp,
            dateidentified:formData.dateidentified,
            targetdate:formData.targetdate,
            progressreport:formData.progressreport,
            stepsToReproduce:formData.stepsToReproduce,
            description:formData.description,
            iterationNumber:formData.iterationNumber
    }
    event.preventDefault();
    console.log("Before submit validation data", validationData);
    const formErrors = validateForm(
      validationData
    );
    console.log("form errors",formErrors)
    if (formErrors){
      setErrors(formErrors);
      return;
    }
    setIssues([...issues, formData]);
    dispatch(AddNewIssue(formData))
    .then((response) => {
      console.log("After Issue form submitted response is : ",response);
      NavigateToIssues();
    })
    .catch(error => {
        console.error('Error updating bug status:', error);
      });
  };
 return (
  <>
        <form className="container">
        <h3 className="text-center">Enter Issue Details: {projObj.data[projectId-1].projectname}</h3><br/>
        <div className="row">
          <div className="col-25">
            <label className="form-label" htmlFor="issueName">Issue Name</label>
          </div>
          <div className="col-75">
            <input className="fixedwidth" type="text" id="issueName" name="issueName" value={formData.issueName} onChange={handleChange} required />
            <div className="validations">
          {errors.issueName && <span>{errors.issueName}</span>}
          </div>
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
            <div className="validations">
              {errors.moduleName && <span>{errors.moduleName}</span>}
            </div>
          </div>
        </div>
      
        <div className="row">
          <div className="col-25">
            <label className="form-label" htmlFor="summary">Summary</label>
          </div>
          <div className="col-75">
            <textarea className="fixedwidthtext" id="summary" name="summary" value={formData.summary} onChange={handleChange} required />
            <div className="validations">
              {errors.summary && <span>{errors.summary}</span>}
            </div>
          </div>
        </div>
      
        <div className="row">
          <div className="col-25">
            <label className="form-label" htmlFor="identfiedemp">Identfied Employee ID</label>
          </div>
          <div className="col-75">
            <EmployeeDropdown val={val1} callBackFunc={setIdentifiedEmployee} prjID={projectId} />
            <div className="validations">
              {errors.identfiedemp && <span>{errors.identfiedemp}</span>}
            </div>
          </div>
        </div>
      
        <div className="row">
          <div className="col-25">
            <label className="form-label" htmlFor="dateidentified">Identified Date</label>
          </div>
          <div className="col-75">
            <input className="fixedwidth" type="date" id="dateidentified" name="dateidentified" value={formData.dateidentified} onChange={handleChange} required />
            <div className="validations">
            {errors.dateidentified && <span>{errors.dateidentified}</span>}
</div>
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
          <div className="validations">
{errors.targetdate && <span>{errors.targetdate}</span>}
</div>
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
            <div className="validations">
{errors.progressreport && <span>{errors.progressreport}</span>}
</div>
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label className="form-label" htmlFor="stepsToReproduce">Steps To Reproduce</label>
          </div>
          <div className="col-75">
            <input className="fixedwidth" type="text" id="stepsToReproduce" name="stepsToReproduce" value={formData.stepsToReproduce} onChange={handleChange}/>
            <div className="validations">
{errors.stepsToReproduce && <span>{errors.stepsToReproduce}</span>}
</div>
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label className="form-label" htmlFor="description">Description</label>
          </div>
          <div className="col-75">
            <textarea className="fixedwidthtext" id="description" name="description" value={formData.Description} onChange={handleChange}/>
            <div className="validations">
{errors.description && <span>{errors.description}</span>}
</div>
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
          <div className="validations">
{errors.iterationNumber && <span>{errors.iterationNumber}</span>}
</div>
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
        &nbsp;&nbsp;
               <button onClick={NavigateBackClick1}>Cancel</button>
        </form>
       
        </>
        );

        }
      

        export default IssueForm;
      
