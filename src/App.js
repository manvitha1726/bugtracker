import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Components/Home';
import ProjectScreen from './Components/ProjectScreen';
import IssueForm from './Components/IssueForm';
import DisplayIssue from './Components/DisplayIssue';
import EditIssueForm from './Components/EditIssueForm';
import Mainpage from './Components/Mainpage';
import IssueStatusBar from './Components/IssueStatusBar';
import Header from './Components/Header';
import { useMsal, useMsalAuthentication } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import { useState } from 'react';
const App = ({selectedProjectId,selectedIssueId}) => {
  useMsalAuthentication(InteractionType.Redirect);
  const [m_strUser, setm_strUser] = useState("");
  function Render() {
    const { accounts } = useMsal();
    try {
      const username = accounts[0].username;
      setm_strUser(username);
    }
    catch (e) {
    }
  }

  if (m_strUser != "")
  {
  return (
    <div>
       <Router>
          <Header/>
          {/* <hr/> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectScreen/>}/>
            <Route path={`/projects/${selectedProjectId}`} element={<Mainpage/>}/>
            <Route path={`/projects/${selectedProjectId}/AddIssue`} element={<IssueForm/>}/>
            <Route path={`/projects/${selectedProjectId}/display-issue${selectedIssueId}`} element={<DisplayIssue/>}/>
            <Route path={`/projects/${selectedProjectId}/EditIssue${selectedIssueId}`}element={<EditIssueForm />}/>
            <Route path={`/projects/${selectedProjectId}/MyView`} element={<Mainpage />}/>
            <Route path={`/projects/${selectedProjectId}/ViewIssues`} element={<Mainpage />}/>
            <Route path={`/projects/${selectedProjectId}/RoadMap`} element={<Mainpage/>}/>
            <Route path={`/projects/${selectedProjectId}/IssueStatus`} element={<IssueStatusBar/>}/>
          </Routes>
      </Router>
    </div>
  );
  }
  else
    return <>{Render()}<div>Please wait for authentication...</div></>

};

const mapStateToProps = (state) => ({
  selectedProjectId: state.selectedFields.selectedProjectId,
  selectedIssueId: state.selectedFields.selectedIssueId,
});


export default connect(mapStateToProps)(App);

