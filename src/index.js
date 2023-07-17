import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './app/Store'
import { Provider } from 'react-redux'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication,EventType} from '@azure/msal-browser';
import { msalConfig } from './auth/authConfig';
import { MsalProvider } from '@azure/msal-react';

const msalInstance = new PublicClientApplication(msalConfig);
// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event) => {
  if (
      (event.eventType === EventType.LOGIN_SUCCESS ||
          event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
          event.eventType === EventType.SSO_SILENT_SUCCESS) &&
      event.payload.account
  ) {
      msalInstance.setActiveAccount(event.payload.account);
  }
});


// Use the same publicClientApplication instance provided to MsalProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MsalProvider instance={msalInstance}>
    <Provider store={store}>
        <App/>
    </Provider>
  </MsalProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 