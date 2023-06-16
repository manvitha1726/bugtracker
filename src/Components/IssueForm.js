import { React,useState } from "react";
import { AddNewIssue } from "../Features/IssueSlice";
import {useDispatch} from "react-redux";
import './IssueForm.css';

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

    const [issues,setIssues]= useState([]);
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
        console.log("selected",selectedIssue)
    }

    const handleTestingSelection = (event) => {
        setSelectedTesting(event.target.value);
    }

    const handleSelectedPriority = (event) => {
        setSelectedPriority(event.target.value);
    }

    const handleAddIssue = () =>{
      setIssues([...issues, formData]);
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

      <form className="container" onSubmit={handleAddIssue}>

      
      <div className="row">
      <div className="col-25 ">
          <label htmlFor="name">Name</label>
        </div>
        <div className="col-75">
          <input className="fixedwidth" type="text" id="name" name="name" value={formData.issueName} onChange={handleChange}/>
        </div>
      </div>
    

      <div className="row">
      
      <div className="col-25"> 
        <label  htmlFor="IssueType">IssueType</label>
      </div>
      <div className="col-75">
        <select className="fixedwidth" id="IssueType" value={selectedIssue} onChange={handleIssueSelection}>

        <option value="bug">Bug</option>

        <option value="Defect">Defect</option>

      </select>
      </div>

      </div>

      <div className="row">
        <div className="col-25"> 
          <label htmlFor="moduleName">moduleName</label>
        </div>
        <div className="col-75">
          <input className="fixedwidth" type="text" id="moduleName" name="moduleName" value={formData.moduleName} onChange={handleChange}/>
        </div>
      </div>

      <div className="row">
        <div className="col-25"> 
          <label htmlFor="summary">Summary</label>
        </div>  
        <div className="col-75">
          <textarea className="fixedwidthtext" id="summary" name="summary" value={formData.summary} onChange={handleChange}/>
        </div>
      </div>

      <div className="row">
      <div className="col-25"> 
          <label htmlFor="identfiedemp">identfiedemp</label>
          </div>
          <div className="col-75"> 
          <input className="fixedwidth" type="text" id="identfiedemp" name="identfiedemp" value={formData.identifiedemp} onChange={handleChange}/>
          </div>
      </div>

      <div className="row">
      <div className="col-25"> 
        
          <label htmlFor="dateidentified">dateidentified</label>
          </div>
          <div className="col-75"> 
          <input className="fixedwidth" type="text" id="dateidentified" name="dateidentified" value={formData.dateidentified} onChange={handleChange}/>
          </div>
      </div>

      <div className="row">
      <div className="col-25"> 
        <label htmlFor="priority">priority</label> 
         </div>  
         <div className="col-75">
        <select className="fixedwidth" id="IssueType" value={selectedPriority} onChange={handleSelectedPriority}>

            <option value="bug">Low</option>

            <option value="Defect">Medium</option>

            <option value="Defect">High</option>

        </select>
        </div>

      </div>

      <div className="row">
      <div className="col-25"> 
          <label htmlFor="targetdate">targetdate</label>
          </div>
        <div className="col-75">
          <input className="fixedwidth" type="text" id="targetdate" name="targetdate" value={formData.targetdate} onChange={handleChange}/>
        </div>
      </div>

      <div className="row">
      <div className="col-25"> 
          <label  htmlFor="actualdate">actualdate</label>
          </div>
          <div className="col-75">
          <input className="fixedwidth" type="text" id="actualdate" name="actualdate" value={formData.actualdate} onChange={handleChange}/>
          </div>
      </div>

      <div className="row">
      <div className="col-25"> 
          <label htmlFor="assignTo">assignTo</label>
          </div>
          <div className="col-75">
          <input className="fixedwidth" type="text" id="assignTo" name="assignTo" value={formData.assignTo} onChange={handleChange}/>
          </div>
      </div>

      <div className="row">
      <div className="col-25"> 
          <label htmlFor="progressreport">progressreport</label>
          </div>
          <div className="col-75">
          <input className="fixedwidth" type="text" id="progressreport" name="progressreport" value={formData.assignTo} onChange={handleChange}/>
          </div>
      </div>

      <div className="row">
      <div className="col-25"> 
          <label htmlFor="ressummary">ressummary</label>
          </div>
          <div className="col-75">
          <input className="fixedwidth" type="text" id="ressummary" name="ressummary" value={formData.ressummary} onChange={handleChange}/>
          </div>
      </div>

      <div className="row">
      <div className="col-25"> 
          <label htmlFor="stepsToReproduce">stepsToReproduce</label>
          </div>
          <div className="col-75">
          <input className="fixedwidth" type="text" id="stepsToReproduce" name="stepsToReproduce" value={formData.stepsToReproduce} onChange={handleChange}/>
          </div>
      </div>

      <div className="row">
      <div className="col-25"> 
        <label htmlFor="description">Description</label>
        </div>
        <div className="col-75">
        <textarea className="fixedwidthtext" id="description" name="Description" value={formData.Description} onChange={handleChange}/>
        </div>
      </div>

      <div className="row">
      <div className="col-25"> 
        <label className="fixedwidth" htmlFor="testingType">testingType</label>
      </div>
      <div className="col-75">
        <select className="fixedwidth" id="testingType" value={selectedTesting} onChange={handleTestingSelection}>

            <option value="Open">Open</option>

            <option value="Inprogress">Inprogress</option>

            <option value="Hold">Hold</option>

            <option value="Closed">Closed</option>

            {/* Add more options as needed */}

        </select>
        </div>
      </div>

      <div className="row">
      <div className="col-25">
        <label  htmlFor="iterationNumber">Assign</label>
      </div>
      <div className="col-75">
        <textarea className="fixedwidthtext" id="iterationNumber" name="iterationNumber" value={formData.iterationNumber} onChange={handleChange}/>
        </div>
      </div>

      <div className="row">
      <div className="col-25">
        <label htmlFor="status">status</label>
        </div>
        <div className="col-75">
        <textarea className="fixedwidthtext" id="status" name="status" value={formData.status} onChange={handleChange}/>
        </div>
      </div>

      <div className="row">
      <div className="col-25">
          <label  htmlFor="linkToPast">linkToPast:</label>
        </div>
        <div className="col-75">
          <input className="fixedwidth" type="text" id="linkToPast" name="linkToPast" value={formData.linkToPast} onChange={handleChange}/>
        </div>
      </div>

     

      <div className="row">
      <div className="col-25">
          <label  htmlFor="Iteration">Iteration:</label>
        </div>
        <div className="col-75">
          <input className="fixedwidth" type="text" id="Iteration" name="Iteration" value={formData.IterationNumber} onChange={handleChange}/>
          </div>
      </div>


       <div className="row">
       <div className="col-25">
        <label  htmlFor="images">Upload Image</label>
        </div>
        <div className="col-75">
        <input className="fixedwidth" type="file" multiple onChange={handleFileUpload} />
        </div>
      </div>

      <div class="row">
      <button type="submit">Add Issue</button>
      </div>
    </form>

    </div>

);
}

export default IssueForm;