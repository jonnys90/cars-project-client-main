import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import CLayout from "./layout/Layout.component";
import Router from "./routes/router";

function App() {
  return (
    <CLayout>
      <ToastContainer position="top-left" />
      <Router />
    </CLayout>
  );
}

export default App;
