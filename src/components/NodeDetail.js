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
import {
  PatchPlusFill,
  PlusCircleDotted,
  PlusCircleFill,
  XOctagon,
} from "react-bootstrap-icons";
const NodeDetail = ({ item }) => {
  const { height, width } = useWindowDimensions();
  const [show, setShow] = useState(false);
  var [detailPosition, setDetailPosition] = useState({
    x: width - width * 0.25,
    y: 10,
  });
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
              <XOctagon color="#f72a51" />
            ) : (
              <PatchPlusFill color="#f72a51" size={20} />
            )}
          </p>
        </Card.Header>
        {show ? (
          <Card.Body className="node-details-card-body-hei">
            <p className="node-details-card-body">
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
            <Card.Title className="node-details-item-name">
              {item.title || item.name || item.seller || item.buyer || ""}
            </Card.Title>
            <p className="mb-2 text-white">
              {item.shortDescription
                ? item.shortDescription.substring(0, 100)
                : item.Description
                ? item.Description.substring(0, 100)
                : ""}
            </p>
            {item.status != undefined ? (
              <p className="mb-2 text-white">{`Status: ${item.status}`}</p>
            ) : null}
            <br />
            Sequence Number
            <br />
            <p className="dashedBorder node-details-borders">
              {item.sequenceNumber || "NA"}
            </p>
            Company SubType
            <br />
            <p className="dashedBorder node-details-borders">
              {" "}
              {item.companySubType || "NA"}{" "}
            </p>
            Value Chain
            <br />
            <p className="dashedBorder node-details-borders">
              {item.valueChain || "NA"}
            </p>
            Value Chain SubType
            <br />
            <p className="dashedBorder node-details-borders">
              {item.valueChainSubType || "NA"}
            </p>
            Line Of Business
            <p className="dashedBorder node-details-borders">
              {item.lineOfBusiness || "NA"}
            </p>
            Line Of Business SubType
            <br />
            <p className="dashedBorder node-details-borders">
              {item.lineOfBusinessSubType || "NA"}
            </p>
          </Card.Body>
        ) : null}
      </Card>
      {/* </OverlayTrigger> */}
    </Draggable>
  );
};

export default NodeDetail;
