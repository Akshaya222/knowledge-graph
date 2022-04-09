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
// import MultiSelect from "react-multiple-select-dropdown-lite";
// import "react-multiple-select-dropdown-lite/dist/index.css";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time
import useWindowDimensions from "../hooks/useWindowDimensions";

const NodeDetail = ({ item }) => {
  const { height, width } = useWindowDimensions();
  var [detailPosition, setDetailPosition] = useState({
    x: width - width * 0.25,
    y: 10,
  });
  return (
    <Draggable
      position={detailPosition}
      onStop={(e, data) => setDetailPosition({ x: data.x, y: data.y })}
    >
      <Card
        style={{ width: "20%", margin: "0.8rem" }}
        className="infoCardDetails"
      >
        <Card.Header className="infoCardDetailsHeader">Node Detail</Card.Header>
        <Card.Body>
          <div
            style={{
              backgroundImage: "linear-gradient(90deg, #aa51bc, #6145cf)",
              color: "#fff",
              alignItems: "center",
              borderRadius: "8px",
            }}
          >
            <p style={{ color: "#fff", padding: "5px" }}>
              {item.id?.includes("workflowId")
                ? "WorkFlow"
                : item.id?.includes("workflowImplementationId")
                ? "WorkFlow Imp"
                : item.id?.includes("sellerId")
                ? "Seller"
                : item.id?.includes("buyer")
                ? "Buyer"
                : item.id?.includes("m-1")
                ? "Master"
                : ""}
            </p>
          </div>
          <Card.Title style={{ color: "white" }}>
            {item.title || item.name || ""}
          </Card.Title>
          <p className="mb-2 text-muted" style={{ color: "#888" }}>
            {item.Description || ""}
          </p>
          <p className="mb-2 text-muted" style={{ color: "#888" }}>
            {item.id ? item.id : "" || ""}
            {/* ShortDescription */}
          </p>
          <p
            className="mb-2 "
            style={{ color: "#888" }}
          >{`Workflow: ${item.workflowId}`}</p>
          <p
            className="mb-2 "
            style={{ color: "#888" }}
          >{`Status: ${item.status}`}</p>
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
    </Draggable>
  );
};

export default NodeDetail;
