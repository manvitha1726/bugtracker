import { useState } from "react";

function IssueForm() {
  const [formData, setFormData] = useState({issueName: "",issueType: "",summary: "",description:"", assign:"",TestingType:"",Screen:"",Link:""});
  const [issues,setIssues]= useState([]);
  const [selectedIssue, setSelectedIssue] = useState('');
  const [selectedTesting, setSelectedTesting] = useState('');
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleAddIssue = () =>{
      setIssues([...issues,formData]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Name: ${formData.name}, IssueType: ${formData.IssueType}, summary: ${formData.summary}`
    );
};

  return (
    <div>
       <div className="left-component" style={{ width: '75%' }}>
      <form onSubmit={handleAddIssue}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
      <br>
      </br>

      <label htmlFor="IssueType">IssueType</label>
      <select id="IssueType" value={selectedIssue} onChange={handleIssueSelection}>
        <option value="bug">Bug</option>
        <option value="Defect">Defect</option>
        {/* Add more options as needed */}
      </select>

      <br>
      </br>

      <label htmlFor="summary">Summary:</label>
      <textarea id="summary" name="summary" value={formData.summary} onChange={handleChange}/>

      <br>
      </br>

      <label htmlFor="description">Description:</label>
      <textarea id="description" name="description" value={formData.description} onChange={handleChange}/>
      <input type="file" multiple onChange={handleFileUpload} />


      <br>
      </br>

      <label htmlFor="assign">Assign:</label>
      <textarea id="assign" name="assign" value={formData.assign} onChange={handleChange}/>

      <br>
      </br>

      <label htmlFor="TestingType">TestingType</label>
      <select id="TestingType" value={selectedTesting} onChange={handleTestingSelection}>
        <option value="Open">Open</option>
        <option value="Inprogress">Inprogress</option>
        <option value="Hold">Hold</option>
        <option value="Closed">Closed</option>
        {/* Add more options as needed */}
      </select>

      <br>
      </br>

      <label htmlFor="Screen">Screen:</label>
      <input type="text" id="Screen" name="Screen" value={formData.Screen} onChange={handleChange}/>

      <br>
      </br>

      
      <label htmlFor="Iteration">Iteration:</label>
      <input type="text" id="Iteration" name="Iteration" value={formData.Iteration} onChange={handleChange}/>

      <br>
      </br>

      <label htmlFor="Link">Link:</label>
      <input type="text" id="Link" name="Link" value={formData.Iteration} onChange={handleChange}/>

      <br>
      </br>


      <button type="submit">Add Issue</button>
    </form>

    {
      issues.map((val,ind) => (
        <li>{val.email}</li>
      ))
    }
    </div>
    </div>
      );
    
}

export default IssueForm;