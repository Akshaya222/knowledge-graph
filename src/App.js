import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAllData } from "./data";
import useWindowDimensions from "./hooks/useWindowDimensions";
import ExpandableGraph from "./Graph";

function App() {
  const [allData, setAllData] = useState([]);
  const [wfdata, setWfData] = useState([]);
  const [wfdataImp, setWfdataImp] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [item, setItem] = useState({});
  const { height, width } = useWindowDimensions();

  const fetchData = async () => {
    let workflowlist, workflowimpl, sellers, buyers;
    workflowlist = await axios.post(
      "https://testapi.insurancegig.com/workflowapidev/api/workflow/list",
      {}
    );
    workflowlist = workflowlist.data;
    workflowimpl = await axios.post(
      "https://testapi.insurancegig.com/workflowapidev/api/workflow/implementation",
      {}
    );
    workflowimpl = workflowimpl.data;
    sellers = await axios.post(
      "https://testapi.insurancegig.com/workflowapidev/api/workflow/seller",
      {}
    );
    sellers = sellers.data;
    buyers = await axios.post(
      "https://testapi.insurancegig.com/workflowapidev/api/workflow/buyer",
      {}
    );
    buyers = buyers.data;
    let data = getAllData(workflowlist, workflowimpl, sellers, buyers);
    setAllData(data.workflowdata);
    setWfData(data.wfdata);
    setWfdataImp(data.workflowimpdata);
    setSellers(data.sellerdata);
    setBuyers(data.buyerdata);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (allData.length === 0) {
    return <p>Loading....</p>;
  } else {
    return (
      <div>
        <ExpandableGraph graphData={allData} setItem={setItem} />
      </div>
    );
  }
}

export default App;
