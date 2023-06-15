import { React,useState } from "react";
import { AddNewIssue } from "../Features/IssueSlice";
import {useDispatch} from "react-redux";

function IssueForm() {
  const dispatch = useDispatch();

  const initialFormData = {
    issueName: "",
    issueType: "",
    moduleName: "",
    description: "",
    summary: "",
    identifiedemp: "",
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
    comments: [],
  };

    const [formData, setFormData] = useState(initialFormData);
    const [selectedIssue, setSelectedIssue] = useState('');
    const [selectedTesting, setSelectedTesting] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('');
    const [attachedFiles, setAttachedFiles] = useState([]);

    const handleFileUpload = (event) => {
        const files = event.target.files;
        setAttachedFiles([...attachedFiles, ...files]);
    };

    const handleIssueSelection = (event) => {
        setSelectedIssue(event.target.value);
    }

    const handleTestingSelection = (event) => {
        setSelectedTesting(event.target.value);
    }

    const handleSelectedPriority = (event) => {
        setSelectedPriority(event.target.value);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    // const handleAddIssue = () =>{
    //     setIssues([...issues, formData]);
    //     alert(`Name: ${formData.issueName}, IssueType: ${formData.issueType}, summary: ${formData.summary}`
    //     );

    // };
    const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(AddNewIssue(formData))
        .unwrap()
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error(error);
        });
      setFormData({ ...initialFormData }); 
      setAttachedFiles([]);
    };

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
      <div className="row-container">
          <label className="form-label" htmlFor="name">Name</label>
          <input className="form-input" type="text" id="name" name="name" value={formData.issueName} onChange={handleChange}/>
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
          <label className="form-label" htmlFor="identfiedemp">identfiedemp</label>
          <input className="form-input" type="text" id="identfiedemp" name="identfiedemp" value={formData.identifiedemp} onChange={handleChange}/>
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
        <textarea id="description" name="Description" value={formData.Description} onChange={handleChange}/>
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
        <label className="form-label" htmlFor="iterationNumber">Assign</label>
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
      
      <div className="row-container">
          <label className="form-label" htmlFor="Iteration">Iteration:</label>
          <input className="form-input" type="text" id="Iteration" name="Iteration" value={formData.IterationNumber} onChange={handleChange}/>
      </div>

       <div>
        <label className="form-label" htmlFor="images">Upload Image</label>
        <input className="form-input" type="file" multiple onChange={handleFileUpload} />
      </div> 


      <button type="submit">Add Issue</button>
    </form>
    </div>

);
}

export default IssueForm;