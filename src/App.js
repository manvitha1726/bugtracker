// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import './App.css'
// import {Projects,Create} from './Features/Projects'
// import {AddEmployee,DisplayEmployees} from './Features/Employees'
// import IssueStatusBar from './Components/IssueStatusBar'
// import Dummy from './Components/Dummy'
// import ProjectScreen from './Components/ProjectScreen'
// function App() {
//   return (
//     <div className="d-flex pt-5 pb-2 pl-5">
//       {/* <Projects/> */}
//       {/* <Create/>  */}
//       {/* <AddEmployee/> */}
//       {/* <DisplayEmployees/> */}
//       {/* <IssueStatusBar/> */}
//       {/* <Dummy ProjectId={1}/>  */}
//       <ProjectScreen/>
//     </div> 
//   )
//   } 
// export default App 
import {React,useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import ProjectScreen from './Components/ProjectScreen';
import IssueStatusBar from './Components/IssueStatusBar';
import IssueForm from './Components/IssueForm';
import DisplayIssue from './Components/DisplayIssue';
import EditIssueForm from './Components/EditIssueForm';
import Header from './Components/Header';
import Footer from './Components/Footer';

const App = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedIssueId, setselectedIssueId] = useState(null);
  const handleProjectClick = (projectId) => {
        setSelectedProjectId(projectId);
         };
  const handleViewIconClick=(issueId)=>{
    setselectedIssueId(issueId);
  }
  const handleEditIconClick=(issueId)=>{
    setselectedIssueId(issueId);
  }
  console.log(selectedIssueId)
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectScreen onProjectClick={handleProjectClick}/>} />
        <Route path={`/projects/${selectedProjectId}`} element={<IssueStatusBar  ProjectId={selectedProjectId} handleViewIconClick={handleViewIconClick} handleEditIconClick={handleEditIconClick}/>} />
        <Route path={`/projects/${selectedProjectId}/AddIssue`} element={<IssueForm />} />
        <Route path={`/projects/${selectedProjectId}/ViewIssue${selectedIssueId}`} element={<DisplayIssue selectedIssueId={selectedIssueId} />} />
        <Route path={`/projects/${selectedProjectId}/EditIssue${selectedIssueId}`} element={<EditIssueForm  issueId={selectedIssueId} />} />
        {/* <Route path={`/projects/${selectedProjectId}/ViewIssue`} element={<DisplayIssue selectedIssueId={selectedIssueId} />} /> */} 
      </Routes>
    </Router>
    <div className='footerposition'>
      <Footer/>
    </div> 
    </div>
  );
};

export default App;
