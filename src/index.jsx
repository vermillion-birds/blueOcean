/* eslint-disable import/extensions */
// Bring React in to build a component.
import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth0ProviderWithHistory from './login/auth0-provider-with-history.jsx';
import AccountPage from './login/AccountPage.jsx';
import Landing from './login/Landing.jsx';
import UserSignUp from './login/UserSignUp.jsx';
// Import from react-dom the ability to create a root render
import App from './App.jsx';
import './assets/index.css';

// create the root of the app by selection where the app should be mounted in the dom
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Auth0ProviderWithHistory>
      <Switch>
        <Route path="/user" component={AccountPage} />
        <Route path="/createUser" component={UserSignUp} />
        <Route path="/" component={App} />
      </Switch>
    </Auth0ProviderWithHistory>
  </Router>,
);
