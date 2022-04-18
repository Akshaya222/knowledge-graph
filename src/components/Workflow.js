import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { getAllData } from "../data";
import { Container } from "react-bootstrap";
import ExpandableGraph from "./Graph";
import Filter from "./Filter";
import NodeDetail from "./NodeDetail";
import Labels from "./Labels";
import Zoom from "./Zoom";
var _ = require("lodash");

function WorkFlow() {
  const [allData, setAllData] = useState({});
  const [wfdata, setWfData] = useState([]);
  const [wfdataImp, setWfdataImp] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [item, setItem] = useState({});
  const [prunedTree, setPrunedTree] = useState({});
  const [unchangedData, setUnchangedData] = useState({});
  const [show, setShow] = useState(false);
  const containerRef = useRef({});

  const fetchData = async () => {
    let workflowlist, workflowimpl, sellers, buyers;
    workflowlist = await axios.post(
      "https://api.insurancegig.com/workflowapi/api/workflow/list",
      {}
    );
    workflowlist = workflowlist.data;
    workflowimpl = await axios.post(
      "https://api.insurancegig.com/workflowapi/api/workflow/implementation",
      {}
    );
    workflowimpl = workflowimpl.data;
    sellers = await axios.post(
      "https://api.insurancegig.com/workflowapi/api/workflow/seller",
      {}
    );
    sellers = sellers.data;
    buyers = await axios.post(
      "https://api.insurancegig.com/workflowapi/api/workflow/buyer",
      {}
    );
    buyers = buyers.data;
    let data = getAllData(workflowlist, workflowimpl, sellers, buyers);
    setAllData(data.workflowdata);
    setUnchangedData(data.workflowdata);
    setWfData(data.wfdata);
    setWfdataImp(data.workflowimpdata);
    setSellers(data.sellerdata);
    setBuyers(data.buyerdata);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (Object.keys(allData).length == 0) {
    return (
      <div className="loader-container">
        <img src="imgs/loader.gif" />
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <Container className="position-absolute">
            <Zoom prunedTree={prunedTree} containerRef={containerRef} />
          </Container>
          <Container className="position-absolute">
            <Filter
              wfdata={wfdata}
              wfdataImp={wfdataImp}
              sellers={sellers}
              buyers={buyers}
              setAllData={setAllData}
              unchangedData={unchangedData}
            />
          </Container>
          <Container className="position-absolute">
            <NodeDetail
              item={item}
              show={show}
              setShow={setShow}
              wfdata={wfdata}
              allData={allData}
              setAllData={setAllData}
              wfdataImp={wfdataImp}
              sellers={sellers}
              buyers={buyers}
            />
          </Container>
          <Container className="position-absolute curser-move ">
            <Labels />
          </Container>
          <Container className="kg">
            <ExpandableGraph
              graphData={allData}
              setItem={setItem}
              prunedTree={prunedTree}
              setPrunedTree={setPrunedTree}
              containerRef={containerRef}
              setShow={setShow}
              show={show}
            />
          </Container>
        </div>
      </div>
    );
  }
}

export default WorkFlow;
