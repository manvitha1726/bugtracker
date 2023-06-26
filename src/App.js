import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Components/Home';
import ProjectScreen from './Components/ProjectScreen';
import IssueStatusBar from './Components/IssueStatusBar';
import IssueForm from './Components/IssueForm';
import DisplayIssue from './Components/DisplayIssue';
import EditIssueForm from './Components/EditIssueForm';
import IssueLandingPage from './Components/IssueLandingPage';
import Mainpage from './Components/Mainpage';
import ImagePopup from './Components/ImagePopup';
import EditIssueForm1 from './Components/EditIssueForm1';

const App = ({selectedProjectId,selectedIssueId}) => {

  return (
    <div>
      
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectScreen/>}/>
          <Route path={`/projects/${selectedProjectId}`} element={<Mainpage/>}/>
          <Route path={`/projects/${selectedProjectId}/AddIssue`} element={<IssueForm/>}/>
          <Route path={`/projects/${selectedProjectId}/display-issue${selectedIssueId}`} element={<DisplayIssue/>}/>
          <Route path={`/projects/${selectedProjectId}/EditIssue${selectedIssueId}`}element={<EditIssueForm />}/>
          <Route path={`/projects/${selectedProjectId}/my-view`} element={<IssueLandingPage />}/>
          <Route path={`/projects/${selectedProjectId}/view-all-issues`} element={<IssueStatusBar />}/>
        </Routes>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedProjectId: state.selectedFields.selectedProjectId,
  selectedIssueId: state.selectedFields.selectedIssueId,
});


export default connect(mapStateToProps)(App);

