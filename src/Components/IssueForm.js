import React, { useEffect, useState } from "react";
import { AddNewIssue } from "../Features/IssueSlice";
import { useDispatch ,useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import EmployeeDropdown from "./EmployeeDropdown";
import AddEmployee from "./AddEmployee";
import ImageUpload from "./ImageUpload/ImageUpload";
import validateForm from './formValidation';
import { getProjectNameProjectId } from "../Features/ProjectsSlice";
import './IssueForm.css';
import './Home.css';

function IssueForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projectId = useSelector((state) => state.selectedFields.selectedProjectId);
  const projObj= useSelector((state) => state.projects);
  const initialFormData = {
    projectId: `${projectId}`,
    category: 'Data Base',
    // issueName: "",
    shortDescription: '',
    issueType: "",
    moduleName: "",
    description: "",
    // summary: "",
    identfiedemp: "",
    priority: "P1",
    // targetdate: "",
    assignTo: "",
    // progressreport: "",
    // stepsToReproduce: "",
    testingType: "Smoke Testing",
    // iterationNumber: "",
    seviority: 'S1',
    linkToParent: null,
    images: ""
  
  };

  const [val1, setVal1] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [selectedIssue, setSelectedIssue] = useState("Bug");
  const [selectedSeviority, setSelectedSeviority] = useState("S1");
  const [selectedTesting, setSelectedTesting] = useState("Smoke Testing");
  const [selectedCategory, setSelectedCategory] = useState("Database");
  const [selectedPriority, setSelectedPriority] = useState('Low');
  const [selectedAssignedEmployee, setSelectedAssignedEmployee] = useState(0);
  const [IdentifiedEmployee, setIdentifiedEmployee] = useState(0);
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
    dispatch(getProjectNameProjectId());
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

  const handleCategorySelection = (event) => {
    setSelectedCategory(event.target.value);
    setFormData((prevFormData) => ({ ...prevFormData, category: event.target.value }));
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
      
            moduleName:formData.moduleName,
            description:formData.description,
            shortDescription:formData.shortDescription,
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
        <h4 style={{alignContent:"flex-start"}}>{projObj.projectname}</h4><br/>
        <div class="row">
            <div class="col-25">
                <label  className="form-label" for="shortDescription">Short Description</label>
                <input type="text" id="shortDescription" name="shortDescription" value={formData.shortDescription} onChange={handleChange} placeholder="Short Description about Issue"/>
                <div className="validations">
                      {errors.shortDescription && <span>{errors.shortDescription}</span>}
                </div>
            </div>
            <div className="col-75">
                  <label className="form-label" for="moduleName">Module Name</label>
                  <input  type="text" id="moduleName" name="moduleName" value={formData.moduleName} placeholder="Module where issue has occured" onChange={handleChange} />
                  <div className="validations">
                    {errors.moduleName && <span>{errors.moduleName}</span>}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
              <label className="form-label">Issue Type</label> 
                <select className="IssueStatusBar-background-color" id="IssueType" value={selectedIssue} onChange={handleIssueSelection} required>
                    <option value="Bug">Bug</option>
                    <option value="Defect">Defect</option>
                </select>
          </div>
          <div class="col-4">
            <label className="form-label">Identified Employee</label>
            <EmployeeDropdown isIdentifiedEmp={true} val={val1} callBackFunc={setIdentifiedEmployee} prjID={projectId} />
          </div>
          <div class="col-4">
          <label className="form-label" htmlFor="priority">Priority</label>
                  <select id="IssueType" className="IssueStatusBar-background-color" value={selectedPriority} onChange={handleSelectedPriority} required>
                  <option value="P1">P1</option>
                  <option value="P2">P2</option>
                  <option value="P3">P3</option>
                  </select>
          </div>
          
        </div>
        <div class="row">
          <div class="col-4">
          <label className="form-label" htmlFor="testingType">Testing Type</label>
                <select id="testingType" className="IssueStatusBar-background-color" value={selectedTesting} onChange={handleTestingSelection}>
                  <option value="Smoke Testing">Smoke Testing</option>
                  <option value="Regression Testing">Regression Testing</option>
                </select>
          </div>
          <div class="col-4">
          <label className="form-label" htmlFor="assignTo">Assign To</label>
                <br/>
                <EmployeeDropdown val={val1} callBackFunc={setSelectedAssignedEmployee} />
          </div>
          <div className="col-4">
              <label className="form-label" htmlFor="priority">Seviority</label>
              <select id="seviority" className="IssueStatusBar-background-color" value={selectedSeviority} onChange={handleSelectedSeviority} required>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
                <option value="S4">S4</option>
              </select>
              </div>
        </div>
        <div className="row">
            <div className="col-4">
            <label className="form-label">Category Name</label><br></br> 
                    <select className="IssueStatusBar-background-color" id="IssueType"  value={selectedCategory} onChange={handleCategorySelection} required>
                        <option value="Data Base">Data Base</option>
                        <option value="API">API</option>
                        <option value="UI">UI</option>  
                    </select>
            </div>
          
            <div className="col-4">
                    <AddEmployee func={setVal1} projectId={projectId} /> 
            </div>
        </div>
        <br></br>

        <div  className="col-4">
              <label className="form-label" htmlFor="linkToParent">Link To Parent:</label>
              <input type="text" id="linkToParent" name="linkToParent" value={formData.linkToParent} onChange={handleChange} />
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
            <button className='button-background-color' type="submit" onClick={handleSubmit}>Add Issue</button> 
        </center>
        
        </form>
        <center>
            <button className="button-background-color" onClick={NavigateBackClick1}>Cancel</button>
        </center>
        </>
        );

}
      

export default IssueForm;