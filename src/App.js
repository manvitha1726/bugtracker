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
import { useIsAuthenticated, MsalProvider, useMsal, useMsalAuthentication, AuthenticatedTemplate } from '@azure/msal-react';
import { InteractionType, EventType } from '@azure/msal-browser';
import { useState } from 'react';
const App = ({ selectedProjectId, selectedIssueId }) => {
  const { accounts, instance } = useMsal();
  useMsalAuthentication(InteractionType.Redirect)
  const [user, set_User] = useState("");
  function Render() {
    // instance.loginRedirect({scopes:["api://459e8baf-c40b-4f40-ba86-d8e4dcfbc7dd/access_has_user"]})
    // .then((res)=>{sessionStorage.setItem('access_token',res.accessToken);})
    // const isAuth = useIsAuthenticated();
    // console.log("isAuth",isAuth)
    
    try {
      // console.log("accounts", accounts);
      set_User(accounts[0].username);
      const accessTokenRequest = {
        scopes: ["api://459e8baf-c40b-4f40-ba86-d8e4dcfbc7dd/access_has_user"],
        account: accounts[0],
      };
      instance
        .acquireTokenSilent(accessTokenRequest)
        .then((accessTokenResponse) => {
          // Acquire token silent success
          let accessToken = accessTokenResponse.accessToken;
          console.log("logging token",accessToken);
          sessionStorage.setItem('access_token', accessToken);
        })
        .catch((error) => {
          //Acquire token silent failure
          console.log(error);
        });
        
    }
    catch (e) {
    }
  }

  if (user != "") {
    return (
      <div>
        <Router>
          <Header />
          {/* <hr/> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectScreen />} />
            <Route path={`/projects/${selectedProjectId}`} element={<Mainpage />} />
            <Route path={`/projects/${selectedProjectId}/AddIssue`} element={<IssueForm />} />
            <Route path={`/projects/${selectedProjectId}/display-issue${selectedIssueId}`} element={<DisplayIssue />} />
            <Route path={`/projects/${selectedProjectId}/EditIssue${selectedIssueId}`} element={<EditIssueForm />} />
            <Route path={`/projects/${selectedProjectId}/MyView`} element={<Mainpage />} />
            <Route path={`/projects/${selectedProjectId}/ViewIssues`} element={<Mainpage />} />
            <Route path={`/projects/${selectedProjectId}/RoadMap`} element={<Mainpage />} />
            <Route path={`/projects/${selectedProjectId}/IssueStatus`} element={<IssueStatusBar />} />
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