import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ProfileDataProvider } from "./contexts/ProfileDataContext";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

ReactDOM.render(
    <Router>
      <CurrentUserProvider>
        <ProfileDataProvider>
          <App />
        </ProfileDataProvider>
      </CurrentUserProvider>
    </Router>,
  document.getElementById("root")
);

reportWebVitals();
