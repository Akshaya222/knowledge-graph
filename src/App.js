import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAllData } from "./data";
import useWindowDimensions from "./hooks/useWindowDimensions";
import Multiselect from "multiselect-react-dropdown";
import {
  Container,
  Card,
  Form,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
import SelectSearch from "react-select-search";
import ExpandableGraph from "./components/Graph";
import Filter from "./components/Filter";
import NodeDetail from "./components/NodeDetail";
// import MultiSelect from "react-multiple-select-dropdown-lite";
// import "react-multiple-select-dropdown-lite/dist/index.css";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time
var _ = require("lodash");

function App() {
  const [allData, setAllData] = useState([]);
  const [wfdata, setWfData] = useState([]);
  const [wfdataImp, setWfdataImp] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [item, setItem] = useState({});
  const [unchangedData, setUnchangedData] = useState([]);
  const { height, width } = useWindowDimensions();
  const [names, setNames] = useState([]);
  var [detailPosition, setDetailPosition] = useState({
    x: width - width * 0.25,
    y: 10,
  });
  var [labelPosition, setLabelPosition] = useState({
    x: width - 1.3 * (width / 2),
    y: height - height * 0.3,
  });
  var [filterPosition, setFilterPosition] = useState({
    x: 0 + width * 0.03,
    y: 10,
  });
  const options = [
    { name: "All", value: "all" },
    { name: "Swedish", value: "sv" },
    { name: "English", value: "en" },
  ];

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
    setUnchangedData(data.workflowdata);
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
        <div>
          <Container style={{ position: "absolute" }}>
            <Filter
              wfdata={wfdata}
              wfdataImp={wfdataImp}
              sellers={sellers}
              buyers={buyers}
              setAllData={setAllData}
              unchangedData={unchangedData}
            />
          </Container>
          <Container style={{ position: "absolute" }}>
            <NodeDetail item={item} />
          </Container>
          <Container style={{ position: "absolute", cursor: "move" }}>
            <Draggable
              position={labelPosition}
              onStop={(e, data) => setLabelPosition({ x: data.x, y: data.y })}
            >
              <Card
                style={{
                  width: "40%",
                  // margin: "0.8rem",
                  color: "#fff",
                  border: "0.5px solid #8D8D8D",
                  borderRadius: "60px",
                  alignContent: "center",
                  paddingLeft: "30px",
                  cursor: "move",
                }}
                className="labelCardDetails justify-content-center"
              >
                {" "}
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-disabled">
                      Node Type and their color
                    </Tooltip>
                  }
                >
                  <div
                    class="row align-items-center"
                    style={{ margin: "30px -60px 30px 5px" }}
                  >
                    <div
                      class="col justify-content-center align-items-center"
                      style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        display: "block",
                        textAlign: "center",
                      }}
                    >
                      <div
                        class="justify-content-center align-items-center"
                        style={{
                          marginLeft: "auto",
                          marginRight: "auto",
                          display: "block",
                          textAlign: "center",
                        }}
                      >
                        <div
                          class="row justify-content-center align-items-center"
                          style={{
                            width: "25px",
                            height: "25px",
                            marginLeft: "8px",
                            transform: "matrix(0.85, -0.53, 0.53, 0.85, 0, 0)",
                            background:
                              "transparent radial-gradient(closest-side at 52% 21%, #C448E3 0%, #6F2D80 100%) 0% 0% no-repeat padding-box",
                            opacity: 1,
                            borderRadius: "18px",

                            // mar
                          }}
                        ></div>
                      </div>
                      <div class="row" style={{ textAlign: "center" }}>
                        Workflow
                      </div>
                    </div>
                    <div
                      class="col justify-content-center align-items-center"
                      style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        display: "block",
                        textAlign: "center",
                      }}
                    >
                      <div
                        class="justify-content-center align-items-center"
                        style={{
                          marginLeft: "auto",
                          marginRight: "auto",
                          display: "block",
                          textAlign: "center",
                        }}
                      >
                        <div
                          class="row justify-content-center align-items-center"
                          style={{
                            width: "25px",
                            height: "25px",
                            marginLeft: "8px",
                            transform: "matrix(0.85, -0.53, 0.53, 0.85, 0, 0)",
                            background:
                              "transparent radial-gradient(closest-side at 52% 21%, #C4981F 100%, #C4981F 100%) 0% 0% no-repeat padding-box",
                            opacity: 1,
                            borderRadius: "18px",

                            // mar
                          }}
                        ></div>
                      </div>
                      <div class="row" style={{ textAlign: "center" }}>
                        Implementation
                      </div>
                    </div>
                    <div
                      class="col"
                      style={
                        {
                          // // width: "18px",
                          // // height: "18px",
                          // // transform: "matrix(0.85, -0.53, 0.53, 0.85, 0, 0)",
                          // background:
                          //   "transparent radial-gradient(closest-side at 39% 26%, #7348CB 0%, #402081 100%) 0% 0% no-repeat padding-box",
                          // opacity: 1,
                          // borderRadius: "18px",
                        }
                      }
                    >
                      <div
                        class="row justify-content-center"
                        style={{
                          width: "25px",
                          height: "25px",
                          marginLeft: "0px",
                          transform: "matrix(0.85, -0.53, 0.53, 0.85, 0, 0)",
                          background:
                            "transparent radial-gradient(closest-side at 39% 26%, #7348CB 0%, #402081 100%) 0% 0% no-repeat padding-box",
                          opacity: 1,
                          borderRadius: "18px",
                        }}
                      ></div>
                      <div class="row">Buyer</div>
                    </div>
                    <div class="col">
                      <div
                        class="row"
                        style={{
                          width: "25px",
                          height: "25px",
                          marginLeft: "-1 px",
                          background:
                            "transparent radial-gradient(closest-side at 35% 30%, #E8805F 0%, #B92E11 100%) 0% 0% no-repeat padding-box",
                          opacity: 1,
                          borderRadius: "18px",
                        }}
                      ></div>
                      <div class="row">Seller</div>
                    </div>
                  </div>
                </OverlayTrigger>
                {/* </Card.Body> */}
              </Card>
              {/* </OverlayTrigger> */}
            </Draggable>{" "}
          </Container>
          <Container className="kg">
            <ExpandableGraph graphData={allData} setItem={setItem} />
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
