import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { getAllData } from "./data";
import { Container } from "react-bootstrap";
import Header from "./components/Header/Header";
import WorkFlow from "./pages/Workflow";
import Partner from "./pages/Partner";
import LineOfBusiness from "./pages/LineOfBusiness";
var _ = require("lodash");

function App() {
  const [value, setValue] = useState(0);
  return (
    <div>
      <Header value={value} setValue={setValue} />
      {value == 0 && <WorkFlow />}
      {value == 1 && <Partner />}
      {value == 2 && <LineOfBusiness />}
    </div>
  );
}

export default App;
