import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
import SelectSearch from "react-select-search";
import { filterData, getAllData } from "../data";
// import MultiSelect from "react-multiple-select-dropdown-lite";
// import "react-multiple-select-dropdown-lite/dist/index.css";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time
import useWindowDimensions from "../hooks/useWindowDimensions";
import {
  PatchPlusFill,
  PlusCircleDotted,
  PlusCircleFill,
  XOctagon,
  FullscreenExit,
  Fullscreen,
} from "react-bootstrap-icons";
const NodeDetail = ({
  item,
  show,
  setShow,
  sellers,
  buyers,
  wfdata,
  setAllData,
  allData,
  wfdataImp,
}) => {
  const { height, width } = useWindowDimensions();
  var [detailPosition, setDetailPosition] = useState({
    x: width - width * 0.26,
    y: 10,
  });
  let selPartners;
  let buyPartners;

  if (item?.id?.includes("workflowImplementationId")) {
    selPartners = sellers
      .map((s) => {
        if (s.workflowImplementation == item.name) {
          return s.seller;
        }
      })
      .filter(function (element) {
        return element != undefined;
      });
  }
  if (item?.id?.includes("workflowImplementationId")) {
    buyPartners = buyers
      .map((s) => {
        if (s.workflowImplementation == item.name) {
          return s.buyer;
        }
      })
      .filter(function (element) {
        return element != undefined;
      });
  }

  console.log(selPartners, buyPartners);

  const handleOnClickPartner = () => {
    if (allData.nodes.length < 30) {
      return;
    } else {
      const allNodes = { wfdata, wfdataImp, sellers, buyers };
      let updatedFilteredObj = {
        names: ["All"],
        wfStatus: ["All"],
        wfType: ["All"],
        partnerNames: [],
        busiType: ["All"],
        busiSubType: ["All"],
        valueChainType: ["All"],
        valueChainSubType: ["All"],
        companyType: ["All"],
        companySubType: ["All"],
      };
      if (item.id?.includes("seller")) {
        updatedFilteredObj.partnerNames.push(item.seller);
      }
      if (item.id?.includes("buyer")) {
        updatedFilteredObj.partnerNames.push(item.buyer);
      }
      let { workflowdata, workflowimpdata, sellerdata, buyerdata } = filterData(
        allNodes,
        updatedFilteredObj
      );
      let data = getAllData(
        workflowdata,
        workflowimpdata,
        sellerdata,
        buyerdata
      );
      setAllData(data.workflowdata);
    }
  };

  return (
    <Draggable
      position={detailPosition}
      onStop={(e, data) => setDetailPosition({ x: data.x, y: data.y })}
    >
      <Card className="infoCardDetails node-details-card">
        <Card.Header className="infoCardDetailsHeader">
          <p>Node Detail</p>
          <p onClick={() => setShow(!show)}>
            {show ? (
              <Container
                style={{
                  background: "red",
                  paddingTop: "1px",
                  paddingBottom: "3px",
                  paddingLeft: "6px",
                  paddingRight: "6px",
                }}
              >
                <FullscreenExit color="#fff" />
              </Container>
            ) : (
              <div>
                <Container
                  style={{
                    background: "#6c4197",
                    paddingTop: "1px",
                    paddingBottom: "3px",
                    paddingLeft: "6px",
                    paddingRight: "6px",
                  }}
                >
                  <Fullscreen color="#fff" />
                </Container>
              </div>
            )}
          </p>
        </Card.Header>
        {show ? (
          <Card.Body className="node-details-card-body-hei">
            {item.id?.includes("seller") || item.id?.includes("buyer") ? (
              <p
                className="node-details-card-body special-text"
                onClick={handleOnClickPartner}
              >
                {" "}
                {item.id?.includes("sellerId")
                  ? "Seller"
                  : item.id?.includes("buyer")
                  ? "Buyer"
                  : ""}
              </p>
            ) : (
              <p className="node-details-card-body">
                {item.id?.includes("workflowId")
                  ? "WorkFlow"
                  : item.id?.includes("workflowImplementationId")
                  ? "WorkFlow Imp"
                  : item.id?.includes("m-1")
                  ? "Master"
                  : ""}
              </p>
            )}
            <Card.Title className="node-details-item-name">
              {item.title ||
                item.Title ||
                item.name ||
                item.seller ||
                item.buyer ||
                ""}
            </Card.Title>
            <p className="mb-2 text-white">
              {item.shortDescription
                ? item.shortDescription
                : item.Description
                ? item.Description
                : ""}
            </p>
            {item.id?.includes("workflowId") && (
              <div className="mt-4">
                Workflow Type
                <br />
                <p className="dashedBorder node-details-borders">
                  {" "}
                  {item.workflowType || "NA"}
                </p>
                Single Or Bundled
                <br />
                <p className="dashedBorder node-details-borders">
                  {" "}
                  {item.singleOrbundled || "NA"}
                </p>
              </div>
            )}
            {(item.id?.includes("sellerId") || item.id?.includes("buyer")) && (
              <div className="mt-4">
                Line Of Business
                <br />
                <p className="dashedBorder node-details-borders">
                  {item.lineOfBusiness || "NA"}
                </p>
                Insurance Value Chain
                <br />
                <p className="dashedBorder node-details-borders">
                  {item.valueChain || "NA"}
                </p>
                Line Of Business SubType
                <br />
                <p className="dashedBorder node-details-borders">
                  {item.lineOfBusinessSubType || "NA"}
                </p>
              </div>
            )}
            {item.id?.includes("workflowImplementationId") && (
              <div className="mt-4">
                Status
                <br />
                <p className="dashedBorder node-details-borders">
                  {item.status || "NA"}
                </p>
                Sellers
                <br />
                <p className="dashedBorder node-details-borders">
                  {selPartners.length == 0 ? "NA" : selPartners.join()}
                </p>
                Buyers
                <br />
                <p className="dashedBorder node-details-borders">
                  {buyPartners.length == 0 ? "NA" : buyPartners.join()}
                </p>
              </div>
            )}
          </Card.Body>
        ) : null}
      </Card>
      {/* </OverlayTrigger> */}
    </Draggable>
  );
};

export default NodeDetail;
