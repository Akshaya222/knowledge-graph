import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  PureComponent,
  useCallback,
  createRef,
} from "react";
import { ArrowClockwise, ZoomIn, ZoomOut } from "react-bootstrap-icons";
import Multiselect from "multiselect-react-dropdown";
// import workflow, { nodes } from "./data/workflow";
import { withSize } from "react-sizeme";
import * as THREE from "three";
import {
  Container,
  Col,
  Row,
  Card,
  Form,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
// import BootstrapSelect from 'react-bootstrap-select-dropdown';
import SelectSearch from "react-select-search";
import Fuse from "fuse.js";
import SpriteText from "three-spritetext";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time
import useWindowDimensions from "./hooks/useWindowDimensions";
var _ = require("lodash");

const Active = () => {
  const [item, setItem] = useState({});
  const { height, width } = useWindowDimensions();
  console.log(width);
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
    { name: "Swedish", value: "sv" },
    { name: "English", value: "en" },
  ];
  return (
    <div>
      <div>
        <Container style={{ position: "absolute" }}>
          <Draggable
            position={filterPosition}
            onStop={(e, data) => setFilterPosition({ x: data.x, y: data.y })}

            // position={{ x: -500, y: 20 }}
          >
            <Card style={{ margin: "0.8rem" }} className="infoCardFilter">
              {/* <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-disabled">
                    Apply filter based on workflow name, type and status
                  </Tooltip>
                }
              > */}
              <Card.Header
                className="infoCardFilterHeader"
                style={{
                  // textAlign: "left",
                  font: "normal normal medium 22px/33px Poppins",
                  letterSpacing: "0px",
                  color: "#CACACA",
                  opacity: "1",
                }}
              >
                Filters
              </Card.Header>

              <Card.Body>
                <Form.Label
                  htmlFor="filterSelect"
                  style={{
                    marginTop: "10px",
                    textAlign: "left",
                    font: "normal normal normal 18px/29px Poppins",
                    letterSpacing: "0px",
                    color: "#CACACA",
                    opacity: "1",
                  }}
                >
                  Workflow Name
                </Form.Label>
                <Multiselect
                  options={[{ name: "All", id: "All" }]} // Options to display in the dropdown
                  // selectedValues={this.companyOptions} // Preselected value to persist in dropdown
                  // onSelect={this.onSelect} // Function will trigger on select event
                  // onRemove={this.onRemove} // Function will trigger on remove event
                  displayValue="namef" // Property name to display in the dropdown options
                />

                <SelectSearch
                  options={options}
                  search
                  // filterOptions={fuzzySearch}
                  // value={nameFilterValue}
                  // onChange={(value) => {
                  //   console.log(value);
                  //   setNameFilterValue(value);
                  // }}
                  placeholder="Choose Name"
                />

                <br />
                <Form.Label
                  htmlFor="filterSelectType"
                  style={{
                    textAlign: "left",
                    font: "normal normal normal 18px/29px Poppins",
                    letterSpacing: "0px",
                    color: "#CACACA",
                    opacity: "1",
                  }}
                >
                  Workflow Type
                </Form.Label>
                <div style={{ width: "200px" }}>
                  <Form.Select
                    aria-label="Choose Layout"
                    className="layoutOption"
                  >
                    <option>Choose Type</option>
                    <option value="1">NA</option>
                    {/* <option value="2">Partner Type</option>
                      <option value="3">Line of Business</option> */}
                  </Form.Select>{" "}
                </div>
                <br />
                <Form.Label
                  htmlFor="filterSelectType"
                  style={{
                    textAlign: "left",
                    font: "normal normal normal 18px/29px Poppins",
                    letterSpacing: "0px",
                    color: "#CACACA",
                    opacity: "1",
                  }}
                >
                  Workflow Status
                </Form.Label>
                <div style={{ width: "200px" }}>
                  <Form.Control
                    aria-label="Choose Layout"
                    className="layoutOption"
                    as="select"
                    // value={statusFilterValue}
                    // onChange={(e) => {
                    //   const value = e.target.value;

                    //   if (value !== statusFilterValue) {
                    //     setStatusFilterValue(value);
                    //   }
                    // }}
                  >
                    {/* <option>Choose Status</option> */}
                    <option value="All">All</option>
                    <option value="Live">Live</option>
                    <option value="Testing">Testing</option>
                    <option value="Introduced">Introduced</option>
                  </Form.Control>{" "}
                </div>
                <br />
                <Form.Label
                  htmlFor="filterSelect"
                  style={{
                    // marginTop: "10px",
                    textAlign: "left",
                    font: "normal normal normal 18px/29px Poppins",
                    letterSpacing: "0px",
                    color: "#CACACA",
                    opacity: "1",
                  }}
                >
                  Partner Name
                </Form.Label>
                <Multiselect
                  options={options} // Options to display in the dropdown
                  // selectedValues={this.companyOptions} // Preselected value to persist in dropdown
                  // onSelect={this.onSelect} // Function will trigger on select event
                  // onRemove={this.onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />

                <SelectSearch
                  options={options}
                  search
                  // filterOptions={fuzzySearch}
                  // value={companyFilterValue}
                  // onChange={(value) => {
                  //   console.log(value);
                  //   setCompanyFilterValue(value);
                  // }}
                  placeholder="Choose Name"
                />

                <Form.Label
                  htmlFor="filterSelect"
                  style={{
                    // marginTop: "10px",
                    textAlign: "left",
                    font: "normal normal normal 18px/29px Poppins",
                    letterSpacing: "0px",
                    color: "#CACACA",
                    opacity: "1",
                  }}
                >
                  Line of Business Type
                </Form.Label>
                <Multiselect
                  options={["NA"]} // Options to display in the dropdown
                  // selectedValues={this.companyOptions} // Preselected value to persist in dropdown
                  // onSelect={this.onSelect} // Function will trigger on select event
                  // onRemove={this.onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />
                <br />
                <Form.Label
                  htmlFor="filterSelect"
                  style={{
                    // marginTop: "10px",
                    textAlign: "left",
                    font: "normal normal normal 18px/29px Poppins",
                    letterSpacing: "0px",
                    color: "#CACACA",
                    opacity: "1",
                  }}
                >
                  Line of Business SubType
                </Form.Label>
                <Multiselect
                  options={["NA"]} // Options to display in the dropdown
                  // selectedValues={this.companyOptions} // Preselected value to persist in dropdown
                  // onSelect={this.onSelect} // Function will trigger on select event
                  // onRemove={this.onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />

                <Form.Label
                  htmlFor="filterSelect"
                  style={{
                    // marginTop: "10px",
                    textAlign: "left",
                    font: "normal normal normal 18px/29px Poppins",
                    letterSpacing: "0px",
                    color: "#CACACA",
                    opacity: "1",
                  }}
                >
                  Insurance Value Chain Type
                </Form.Label>
                <Multiselect
                  options={["NA"]} // Options to display in the dropdown
                  // selectedValues={this.companyOptions} // Preselected value to persist in dropdown
                  // onSelect={this.onSelect} // Function will trigger on select event
                  // onRemove={this.onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />
                <Form.Label
                  htmlFor="filterSelect"
                  style={{
                    // marginTop: "10px",
                    textAlign: "left",
                    font: "normal normal normal 18px/29px Poppins",
                    letterSpacing: "0px",
                    color: "#CACACA",
                    opacity: "1",
                  }}
                >
                  Technology Type
                </Form.Label>
                <Multiselect
                  options={["NA"]} // Options to display in the dropdown
                  // selectedValues={this.companyOptions} // Preselected value to persist in dropdown
                  // onSelect={this.onSelect} // Function will trigger on select event
                  // onRemove={this.onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />

                <br />
                <Button
                  variant="primary"
                  style={{
                    background:
                      "transparent linear-gradient(90deg, #AA51BC 0%, #6145CF 100%) 0% 0% no-repeat padding-box",
                    borderEadius: "4px",
                    borderColor: "None",
                    width: "100px",
                  }}
                  // onClick={() => {
                  //   var n_f_value = "";
                  //   var s_f_value = "";
                  //   var c_f_value = "";

                  //   if (nameFilterValue == "All") {
                  //     n_f_value = "";
                  //   } else {
                  //     n_f_value = nameFilterValue;
                  //   }
                  //   if (statusFilterValue == "All") {
                  //     s_f_value = "";
                  //   } else {
                  //     s_f_value = statusFilterValue;
                  //   }
                  //   if (companyFilterValue == "All") {
                  //     c_f_value = "";
                  //   } else {
                  //     c_f_value = companyFilterValue;
                  //   }
                  //   // setWf(_.cloneDeep(workflow));
                  //   // setPrunedTree(getPrunedTree());
                  //   prunedTree.nodes.map((n) => {
                  //     if (n.Type === "Maser" || !n.collapsed) {
                  //     } else {
                  //       n.hcolor = ncolors[n.Type];
                  //     }
                  //   });
                  //   prunedTree.links.map((l) => {
                  //     l.hcolor = "rgba(112, 112, 112,1)";
                  //   });
                  //   if (nameFilterValue !== "All") {
                  //     var n = wf.nodes.filter((itm) => {
                  //       return itm.id === n_f_value || itm.Type !== "Workflow";
                  //     });

                  //     var n_id = n.map((n_t) => n_t.id);

                  //     prunedTree.nodes.map((n) => {
                  //       if (!n_id.includes(n.id)) {
                  //         if (n.Type === "Maser" || !n.collapsed) {
                  //         } else {
                  //           n.hcolor = ntcolors[n.Type];
                  //         }
                  //       }
                  //     });
                  //     prunedTree.links.map((l) => {
                  //       if (
                  //         !n_id.includes(l.source.id) &&
                  //         !n_id.includes(l.target.id)
                  //       ) {
                  //         l.hcolor = "rgba(112, 112, 112,0.4)";
                  //       } else {
                  //         l.hcolor = "rgba(112, 112, 112,1)";
                  //         l.textHeight = 4;
                  //         l.textColor = "white";
                  //       }
                  //     });
                  //     // n_id.append()

                  //     // l = [];
                  //   }
                  //   if (statusFilterValue !== "All") {
                  //     var n_s = wf.nodes.filter((itm) => {
                  //       return itm.Status === s_f_value;
                  //     });

                  //     var n_s_id = n_s.map((n_t) => n_t.id);

                  //     prunedTree.nodes.map((n) => {
                  //       if (!n_s_id.includes(n.id)) {
                  //         if (n.Type === "Maser" || !n.collapsed) {
                  //         } else {
                  //           n.hcolor = ntcolors[n.Type];
                  //         }
                  //       }
                  //     });
                  //     prunedTree.links.map((l) => {
                  //       if (
                  //         !n_s_id.includes(l.source.id) &&
                  //         !n_s_id.includes(l.target.id)
                  //       ) {
                  //         l.hcolor = "rgba(112, 112, 112,0.4)";
                  //       } else {
                  //         // l.hcolor = "rgba(112, 112, 112,1)";
                  //         // l.textHeight = 4;
                  //         // l.textColor = "white";
                  //       }
                  //     });
                  //     // n_id.append()

                  //     // l = [];
                  //   }

                  //   if (companyFilterValue !== "All") {
                  //     // prunedTree.nodes.map((n) => {
                  //     //   if (n.collapsed) {
                  //     //     n.collapsed = !n.collapsed;
                  //     //   } else {

                  //     //   };
                  //     // });
                  //     // setPrunedTree(getPrunedTree());

                  //     var company_mapping = {
                  //       Relativity6: ["w1", "wi-1", "s-1"],
                  //       "Neural Metrics": ["s-2", "wi-2", "w-1"],
                  //       Sensible: ["s-3", "wi-3", "w-5"],
                  //       "Bold Penguin": ["s-4", "wi-4", "w-18"],
                  //       Heffernan: ["b-1", "b-2", "wi-1", "w-1", "wi-2"],
                  //       BTIS: ["b-3", "wi-3", "w-5"],
                  //       Hawksoft: ["b-4", "wi-4", "w-18"],
                  //     };

                  //     // prunedTree.nodes.map((n) => {
                  //     //   if (n.collapsed) {
                  //     //     n.collapsed = !n.collapsed;
                  //     //   } else {

                  //     //   };
                  //     // });
                  //     // setPrunedTree(getPrunedTree());

                  //     var n_c = wf.nodes.filter((itm) => {
                  //       return company_mapping[c_f_value].includes(itm.id);
                  //     });

                  //     var n_c_id = n_c.map((n_t) => n_t.id);

                  //     prunedTree.nodes.map((n) => {
                  //       if (!n_c_id.includes(n.id)) {
                  //         if (n.Type === "Maser") {
                  //         } else {
                  //           n.hcolor = ntcolors[n.Type];
                  //         }
                  //       }
                  //     });
                  //     prunedTree.links.map((l) => {
                  //       if (
                  //         !n_c_id.includes(l.source.id) &&
                  //         !n_c_id.includes(l.target.id)
                  //       ) {
                  //         l.hcolor = "rgba(112, 112, 112,0.4)";
                  //       } else {
                  //         // l.hcolor = "rgba(112, 112, 112,1)";
                  //         // l.textHeight = 4;
                  //         // l.textColor = "white";
                  //       }
                  //     });
                  //     // n_id.append()

                  //     // l = [];
                  //   }

                  //   setPrunedTree(getPrunedTree());
                  //   // setPrunedTree(getPrunedTree());

                  //   console.log(wf);
                  // }}
                >
                  Filter
                </Button>
                <Button
                  variant="primary"
                  style={{
                    background:
                      "transparent linear-gradient(90deg, #AA51BC 0%, #6145CF 100%) 0% 0% no-repeat padding-box",
                    borderEadius: "4px",
                    borderColor: "None",
                    width: "100px",
                    marginLeft: "10px",
                  }}
                  // onClick={refreshPage}
                >
                  Reset
                </Button>

                {/* <Card.Title>Filters</Card.Title>
                    
                    <Card.Subtitle className="mb-2 text-muted">
                      Card Subtitle
                    </Card.Subtitle>
                    <Card.Text>
                      Some quick example text to build on the card title and make
                      up the bulk of the card's content.
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
              {/* </OverlayTrigger> */}
            </Card>
          </Draggable>{" "}
        </Container>
        <Container style={{ position: "absolute" }}>
          <Draggable
            position={detailPosition}
            onStop={(e, data) => setDetailPosition({ x: data.x, y: data.y })}
          >
            <Card
              style={{ width: "20%", margin: "0.8rem" }}
              className="infoCardDetails"
            >
              <Card.Header className="infoCardDetailsHeader">
                Node Detail
              </Card.Header>
              <Card.Body>
                <div
                  style={{
                    backgroundImage: "linear-gradient(90deg, #aa51bc, #6145cf)",
                    color: "#fff",
                    alignItems: "center",
                    borderRadius: "8px",
                  }}
                >
                  <p style={{ color: "#fff", padding: "5px" }}> {item.Type}</p>
                </div>
                <Card.Title style={{ color: "white" }}>{item.Title}</Card.Title>
                <p className="mb-2 text-muted" style={{ color: "#888" }}>
                  {item.Description}
                </p>
                <p className="mb-2 text-muted" style={{ color: "#888" }}>
                  {item.id}
                  {/* ShortDescription */}
                </p>
                <p
                  className="mb-2 "
                  style={{ color: "#888" }}
                >{`Workflow: ${item.Workflow}`}</p>
                <p
                  className="mb-2 "
                  style={{ color: "#888" }}
                >{`Status: ${item.Status}`}</p>
                <br />
                Sequence Number: {item.sequenceNumber || "NA"}
                <br />
                Company SubType: {item.companySubType || "NA"}
                <br />
                Value Chain: {item.valueChain || "NA"}
                <br />
                Value Chain SubType: {item.valueChainSubType || "NA"}
                <br />
                Line Of Business: {item.lineOfBusiness || "NA"}
                <br />
                Line Of Business SubType: {item.lineOfBusinessSubType || "NA"}
                <br />
              </Card.Body>
            </Card>
            {/* </OverlayTrigger> */}
          </Draggable>{" "}
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
      </div>
    </div>
  );
};

export default Active;
