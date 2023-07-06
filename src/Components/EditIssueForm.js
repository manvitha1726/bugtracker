import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetIssueById, updateIssue } from "../Features/IssueSlice";
import './IssueForm.css';
import { useNavigate } from "react-router-dom";
import EmployeeDropdown from "./EmployeeDropdown";
import ImageUpload from "./ImageUpload/ImageUpload";
import ImageCarouselModal from "./ImageCarouselModal.js";
import validateForm from './formValidation';

function EditIssueForm() {
  const dispatch = useDispatch();
  const { dataById, loading, error } = useSelector((state) => state.issues);
  const issueId = useSelector((state) => state.selectedFields.selectedIssueId);
  const navigate = useNavigate();

  const initialFormData = {
    issueId: issueId,
    category: '',
    projectId: "",
    shortDescription: "",
    issueType: "",
    moduleName: "",
    description: "",
    // summary: "",
    // identfiedemp: "",
    // dateidentified: "",
    priority: "",
    targetdate: "",
    // actualdate: "",
    assignTo: "",
    // progressreport: "",
    ressummary: "",
    stepsToReproduce: "",
    testingType: "",
    lastmodifydoneemp:1,
    // iterationNumber: "",
    status: "",
    images: ""
  };
  console.log('initialformdata',initialFormData)
  const [formData, setFormData] = useState(initialFormData);
 
  console.log('formdata',formData)
  const [selectedIssue, setSelectedIssue] = useState();
  const [selectedCategory, setSelectedCategory] = useState("Data Base");
  const [selectedTesting, setSelectedTesting] = useState();
  const [selectedPriority, setSelectedPriority] = useState();
  const [selectedAssignedEmployee, setSelectedAssignedEmployee] = useState();
  const [IdentifiedEmployee, setIdentifiedEmployee] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [selectedSeviority, setSelectedSeviority] = useState("S1");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [dataDispatched, setDataDispatched] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false);
  const {selectedProjectId} = useSelector((state) => state.selectedFields);
  const [errors,setErrors]= useState({});

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
      // console.log('dataById', dataById);
      initialFormData.shortDescription = dataById[0].shortDescription;
      initialFormData.issueType = dataById[0].issueType;
      initialFormData.moduleName = dataById[0].moduleName;
      initialFormData.description = dataById[0].description;
      // initialFormData.summary = dataById[0].summary;
      initialFormData.identfiedemp = dataById[0].identfiedemp;
      initialFormData.category = dataById[0].category;
      // initialFormData.dateidentified = dataById[0].dateidentified;
      initialFormData.priority = dataById[0].priority;
      initialFormData.targetdate = dataById[0].targetdate;
      // initialFormData.actualdate = dataById[0].actualdate;
      if(dataById[0].assignTo == null){
        initialFormData.assignTo = 0;
      }
      else{
        initialFormData.assignTo = dataById[0].assignTo;
      }
      // initialFormData.progressreport = dataById[0].progressreport;
      initialFormData.ressummary = dataById[0].ressummary
      initialFormData.stepsToReproduce = dataById[0].stepsToReproduce;
      initialFormData.testingType = dataById[0].testingType;
      // initialFormData.iterationNumber = dataById[0].iterationNumber;
      initialFormData.status = dataById[0].status;
      initialFormData.projectId = dataById[0].projectId;
      initialFormData.images = dataById[0].images;
      initialFormData.seviority = dataById[0].seviority;
      initialFormData.testingType = dataById[0].testingType;
      setFormData(initialFormData);
      setSelectedSeviority(dataById[0].seviority)
      setSelectedPriority(dataById[0].priority)
      setSelectedStatus(dataById[0].status)
      setSelectedTesting(dataById[0].testingType)
      setSelectedCategory(dataById[0].category);
      if(dataById[0].assignTo == null){
          setSelectedAssignedEmployee(0)
      }
      else{
          setSelectedAssignedEmployee(dataById[0].assignTo);
      }
      setIdentifiedEmployee(dataById[0].identfiedemp);
      // setSelectedIssue(dataById[0].issueType);
      if(dataById[0].assignTo == null){
        setSelectedAssignedEmployee(0)
    }
    else{
        setSelectedAssignedEmployee(dataById[0].assignTo);
    }
    setIdentifiedEmployee(dataById[0].identfiedemp);
      setDataLoaded(true)
    }
    
  }, [dataById]);
  
  

  // if (dataById.length !== 0) {
  // } 
  // Define the form state

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, assignTo: `${selectedAssignedEmployee}` }));
    // setFormData((prevFormData) => ({ ...prevFormData, assignTo: `${selectedAssignedEmployee}` }));
  }, [selectedAssignedEmployee]);

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, identfiedemp: `${IdentifiedEmployee}` }));
  }, [IdentifiedEmployee]);
 

  useEffect(() => {
    console.log("image from edit form: ", attachedFiles);
    setFormData((prevFormData) => ({ ...prevFormData, images: attachedFiles }));
  }, [attachedFiles]);

  const handleIssueSelection = (event) => {
    setSelectedIssue(event.target.value);
    console.log("selectedissue", selectedIssue)
    setFormData((prevFormData) => ({ ...prevFormData, issueType: event.target.value }));
  };
  const handleStatusSelection = (event) => {
    setSelectedStatus(event.target.value);
    setFormData((prevFormData) => ({ ...prevFormData, status: event.target.value }));
  }

  const handleTestingSelection = (event) => {
    setSelectedTesting(event.target.value);
    setFormData((prevFormData) => ({ ...prevFormData, testingType: event.target.value }));
  };

  const handleSelectedPriority = (event) => {
    setSelectedPriority(event.target.value);
    setFormData((prevFormData) => ({ ...prevFormData, priority: event.target.value }));
  };
  const handleSelectedSeviority = (event) => {
    setSelectedSeviority(event.target.value);
    setFormData((prevFormData) => ({ ...prevFormData, seviority: event.target.value }));
  }

  const handleCategorySelection = (event) => {
    setSelectedCategory(event.target.value);
    setFormData((prevFormData) => ({ ...prevFormData, category: event.target.value }));
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
    navigate(`/projects/${selectedProjectId}/ViewIssues`)
  };

  const handleSubmit = (event) => {
      const validationData={
            shortDescription:formData.shortDescription,
            moduleName:formData.moduleName,
            // summary:formData.summary,
            identfiedemp:formData.identfiedemp,
            // targetdate:formData.targetdate,
            // progressreport:formData.progressreport,
            stepsToReproduce:formData.stepsToReproduce,
            description:formData.description,
            // iterationNumber:formData.iterationNumber
    }

    event.preventDefault();
    console.log("Obj given to update issue", formData)
        const formErrors = validateForm(
      validationData
    );
    console.log("form errors",formErrors)
    if (formErrors){
      setErrors(formErrors);
      return;
    }
    dispatch(updateIssue(formData));

  };

  if (error !== null) {
    return <h2>Oops something went wrong...</h2>
  }

  if (loading) {
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

  if(dataLoaded)
  {
    return (
      <div className="main_container">
        {/* {console.log('inside return', loading, formData, initialFormData)} */}
        <form className="container" onSubmit={handleSubmit}>
          {/* <h3 className="text-center">{`Edit Issue Details: ${formData.issueName}`}</h3><br /> */}
          <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="shortDescription">Short Description</label>
              <input type="text" id="shortDescription" name="shortDescription" value={formData.shortDescription} onChange={handleChange} />
              <div className="validations">
                  {errors.shortDescription && <span>{errors.shortDescription}</span>}
                </div>
            </div>

            <div className="col-75">
            <label className="form-label" htmlFor="moduleName">Module Name</label>
              <input type="text" id="moduleName" name="moduleName" value={formData.moduleName} onChange={handleChange} />
              <div className="validations">
                  {errors.moduleName && <span>{errors.moduleName}</span>}
                </div>
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <label className="form-label" htmlFor="IssueType">Issue Type</label>
              <select id="IssueType" className="IssueStatusBar-background-color" value={selectedIssue} onChange={handleIssueSelection}>
                <option value="Bug">Bug</option>
                <option value="Defect">Defect</option>
              </select>
            </div>

            <div className="col-3">
              <label className="form-label" htmlFor="status">Status</label>
              <select id="status" className="IssueStatusBar-background-color" value={selectedStatus} onChange={handleStatusSelection}>
                <option value="Open">Open</option>
                <option value="In Progress">Inprogress</option>
                <option value="Hold">Hold</option>
                <option value="Close">Closed</option>
                {/* Add more options as needed */}
              </select>
            </div>

            <div className="col-3">
              <label className="form-label" htmlFor="priority">Priority</label>
              <select id="IssueType" className="IssueStatusBar-background-color" value={selectedPriority} onChange={handleSelectedPriority}>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
              </select>
            </div>
          
            <div className="col-3">
                  <label className="form-label" htmlFor="assignTo">Assigned To</label>
                  <EmployeeDropdown empid={formData.assignTo} callBackFunc={setSelectedAssignedEmployee} />
                </div>
            
          </div>

          <div className="row">
            <div className="col-3">
                <label className="form-label" htmlFor="seviority">Seviority</label>
                <select id="seviority" className="IssueStatusBar-background-color" value={selectedSeviority} onChange={handleSelectedSeviority} >
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                  <option value="S4">S4</option>
                </select>
            </div>

            <div className="col-3">
              <label className="form-label" htmlFor="testingtype">Testing Type</label>
              <select id="testingtype" className="IssueStatusBar-background-color" value={selectedTesting} onChange={handleTestingSelection}>
                <option value="Smoke Testing">Smoke Testing</option>
                <option value="Regression Testing">Regression Testing</option>
                {/* Add more options as needed */}
              </select>
            </div>
            
            <div className="col-3">
                <label className="form-label" htmlFor="category">Category Name</label>
                <select id="category" className="IssueStatusBar-background-color" value={selectedCategory} onChange={handleCategorySelection} >
                <option value="Data Base">DataBase</option>
                <option value="API">API</option>
                <option value="UI">UI</option>  
                </select>
            </div>
          </div>

          <div className="row">
              <div className="col-25">
                  <label className="form-label" htmlFor="targetdate">Target Resolution Date</label>
                  <input  type="date" id="targetRsolution" name="targetRsolution" value={formData.targetdate} onChange={handleChange} />
              </div>
            </div>

          {/* <div className="row">
            <div className="col-25">
              <label className="form-label" htmlFor="iterationNumber">Iteration Number</label>
              <input type="number" id="iterationNumber" name="iterationNumber" value={formData.iterationNumber} onChange={handleChange} />
            </div>
            <div className="col-75">
              <label className="form-label" htmlFor="linkToPast">Link To Parent:</label>
              <input type="text" id="linkToPast" name="linkToPast" value={formData.linkToPast} onChange={handleChange} />
            </div>
          </div> */} 

          <div className="row">
            <div className="col">
            <label className="form-label" htmlFor="stepsToReproduce">Steps To Reproduce</label>
            <textarea type="text" id="stepsToReproduce" name="stepsToReproduce" value={formData.stepsToReproduce} onChange={handleChange} />
            <div className="validations">
              {errors.stepsToReproduce && <span>{errors.stepsToReproduce}</span>}
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea id="description" placeholder="Description" name="description" value={formData.description} onChange={handleChange} />
              <div className="validations">
              {errors.description && <span>{errors.description}</span>}
            </div>
            </div>
          </div>

          <div className="row" style={{display:'flex', flexDirection:'row'}}>
            <label className="form-label" htmlFor="images">Upload Image</label>
            <ImageUpload callBackFunc={setAttachedFiles} />
          </div>

            <label className="form-label">Uploaded attachments</label>
            <ImageCarouselModal images={formData.images} />
            <br/><br/>

          <center>
            <button className='button-background-color' type="submit">Save Changes</button>&nbsp;&nbsp;
            <button className='button-background-color' onClick={NavigateBackClick}>Close</button>
          </center>
        </form>
      </div>
    );
  }
}



export default EditIssueForm;