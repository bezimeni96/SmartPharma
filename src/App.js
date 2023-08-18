import React from "react";
import { BrowserRouter } from "react-router-dom";

import Sidebar from "./components/sidebar";
import PublicRoutes from "./routes/routes";

import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar>
          <PublicRoutes />
        </Sidebar>
      </BrowserRouter>
    </div>
  );
};

export default App;
