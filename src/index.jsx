// Bring React in to build a component.
import React from "react";
// Import from react-dom the ability to create a root render
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from 'react-router-dom';
import  App from './App.jsx';
import Auth0ProviderWithHistory from './login/auth0-provider-with-history';
import './assets/index.css';



// create the root of the app by selection where the app should be mounted in the dom
const root = createRoot(document.getElementById("root"));

// render the root element with the provided component
root.render(<App />);
