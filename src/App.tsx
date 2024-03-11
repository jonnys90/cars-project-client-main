import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import CLayout from "./layout/Layout.component";
import Router from "./routes/router";

function App() {
  return (
    <Fragment>
      <CLayout>
        <ToastContainer />
        <Router />
      </CLayout>
    </Fragment>
  );
}

export default App;
