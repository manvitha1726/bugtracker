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
    priority: "Low",
    targetdate: "",
    assignTo: "",
    progressreport: "",
    stepsToReproduce: "",
    testingType: "Smoke Testing",
    iterationNumber: "",
    seviority: 'S1',
    linkToPast: null,
    images: ""
  
  };

  const [val1, setVal1] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [selectedIssue, setSelectedIssue] = useState("Bug");
  const [selectedSeviority, setSelectedSeviority] = useState("S1");
  const [selectedTesting, setSelectedTesting] = useState("Smoke Testing");
  const [selectedPriority, setSelectedPriority] = useState('Low');
  const [selectedAssignedEmployee, setSelectedAssignedEmployee] = useState();
  const [IdentifiedEmployee, setIdentifiedEmployee] = useState();
  const [attachedFiles, setAttachedFiles] = useState('');
  const [errors,setErrors]= useState({});
  const [issues,setIssues]= useState([]);

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, assignTo: `${selectedAssignedEmployee}` }));
    // setFormData((prevFormData) => ({ ...prevFormData, assignTo: `${selectedAssignedEmployee}` }));
  }, [selectedAssignedEmployee]);

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, identfiedemp: `${IdentifiedEmployee}` }));
  }, [IdentifiedEmployee]);
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
  const handleSelectedSeviority = (event) => {
    setSelectedSeviority(event.target.value);
    setFormData((prevFormData) => ({ ...prevFormData, seviority: event.target.value }));
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
        <div class="row">
    <div class="col-25">
      <label  className="form-label" for="inputEmail4">Issue Name</label> 
      <input type="text" className="form-control" id="inputEmail4" name="issueName" onChange={handleChange} placeholder="Issue Name"/>
    </div>
    <div class="col-75">
    <label className="form-label" for="inputEmail4">Module Name</label> 
      <input type="text" className="form-control" id="inputEmail4" name="moduleName" onChange={handleChange} placeholder="Module Name"/>
    </div>
    </div>
      <div class="row">
        <div class="col-3">
            <label className="form-label">Issue Type</label> 
              <select className="drop" id="IssueType" value={selectedIssue} onChange={handleIssueSelection} required>
                      <option value="Bug">Bug</option>
                      <option value="Defect">Defect</option>
                    </select>
        </div>
        <div class="col-3">
          <label className="form-label">Identified Employee</label>
          <EmployeeDropdown val={val1} callBackFunc={setIdentifiedEmployee} prjID={projectId} />
                <div className="validations">
                  {errors.identfiedemp && <span>{errors.identfiedemp}</span>}
                </div>
        </div>
        <div class="col-3">
        <label className="form-label" htmlFor="priority">Priority</label>
                <select id="IssueType" value={selectedPriority} onChange={handleSelectedPriority} required>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
        </div>
        <div className="col-3">
            <label className="form-label" htmlFor="priority">Seviority</label>
            <select id="seviority" value={selectedSeviority} onChange={handleSelectedSeviority} required>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
              <option value="S4">S4</option>
            </select>
          </div>
      </div>
        <div class="row">
    <div className="col-25">
           <label className="form-label" htmlFor="targetdate">Target Date</label> 
          <input type="date" className="form-control" id="targetdate" name="targetdate" value={formData.targetdate} onChange={handleChange}/>
          <div className="validations">
            {errors.targetdate && <span>{errors.targetdate}</span>}
          </div>
          </div>
  </div>

        <div className="row">
          <div className="col-25">
            <label className="form-label" htmlFor="progressreport">Progress Report</label> 
            <input type="text" className="form-control" id="progressreport" placeholder="Progress Report" name="progressreport" value={formData.progressreport} onChange={handleChange}/>
            <div className="validations">
              {errors.progressreport && <span>{errors.progressreport}</span>}
            </div>
          </div>
          <div className="col-75">
            <label className="form-label" htmlFor="stepsToReproduce">Steps To Reproduce</label>
            <input type="text" className="form-control" id="stepsToReproduce" placeholder="StepsTo Reproduce" name="stepsToReproduce" value={formData.stepsToReproduce} onChange={handleChange}/>
            <div className="validations">
              {errors.stepsToReproduce && <span>{errors.stepsToReproduce}</span>}
            </div>
            </div>
        </div>

        <div className="row">
            <div className="col-25">
                <label className="form-label" htmlFor="iterationNumber">Iteration Number</label> 
              <input type="number" className="form-control" id="iterationNumber"  name="iterationNumber" placeholder="Iteration Number" value={formData.iterationNumber} onChange={handleChange} />
            
              <div className="validations">
                  {errors.iterationNumber && <span>{errors.iterationNumber}</span>}
              </div>
            </div>
            
            &nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="col-50">
                <label className="form-label" htmlFor="testingType">Testing Type</label>
                <select id="testingType" style={{ height:" 30%"}} value={selectedTesting} onChange={handleTestingSelection}>
                  <option value="Smoke Testing">Smoke Testing</option>
                  <option value="Regression Testing">Regression Testing</option>
                </select>
            </div>
            <div className="col-50">
                <label className="form-label" htmlFor="assignTo">Assigned To</label>
                <br/>
                <EmployeeDropdown val={val1} callBackFunc={setSelectedAssignedEmployee} />
              <AddEmployee func={setVal1} projectId={projectId} />
                
            </div>
        </div>
        <br/><br/>

        <div className="row">
          {/* <div className="col-25">
            <label className="form-label" htmlFor="summary">Summary</label>
          </div> */}
          <div className="col">
            <textarea cols={90} id="summary" placeholder="Summary" name="summary" value={formData.summary} onChange={handleChange} required />
            <div className="validations">
              {errors.summary && <span>{errors.summary}</span>}
            </div>
            </div>
        </div>
      
        <div className="row">
          {/* <div className="col-25">
            <label className="form-label" htmlFor="summary">Summary</label>
          </div> */}
          <div className="col">
            <textarea cols={90} id="description" placeholder="Description" name="description" value={formData.Description} onChange={handleChange}/>
            <div className="validations">
              {errors.description && <span>{errors.description}</span>}
            </div>
          </div>
        </div>
        
        <div className="row" style={{display:'flex', flexDirection:'row'}}>
            <label className="form-label" htmlFor="images">Upload Image</label>
            <ImageUpload callBackFunc={setAttachedFiles} />
        </div>

        <center>
            <button type="submit" onClick={handleSubmit}>Add Issue</button> 
            &nbsp;&nbsp;
            <button onClick={NavigateBackClick1}>Cancel</button>
        </center>
        </form>
        </>
        );

}
      

export default IssueForm;