import React, { useState } from "react";
import { ArrowClockwise, ZoomIn, ZoomOut } from "react-bootstrap-icons";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time
import useWindowDimensions from "../hooks/useWindowDimensions";
var _ = require("lodash");

const Zoom = ({ prunedTree, containerRef }) => {
  var [zoomValue, setZoomValue] = useState(500);
  const { height, width } = useWindowDimensions();
  var [zoomPosition, setZoomPosition] = useState({
    x: 0 + width * 0.22,
    y: 10,
  });

  return (
    <Draggable
      position={zoomPosition}
      onStop={(e, data) => setZoomPosition({ x: data.x, y: data.y })}
    >
      <Card
        style={{
          // width: "30%",
          margin: "0.8rem",
          color: "#fff",
          border: "0.5px solid #8D8D8D",
          padding: "15px",
          // borderRadius: "50px",
          alignContent: "center",
          cursor: "move",
          // paddingLeft: "30px",
        }}
        className="zoomCardDetails justify-content-center"
      >
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id="tooltip-disabled">Reset</Tooltip>}
        >
          <ArrowClockwise
            style={{
              color: "#CACACA 0% 0% no-repeat padding-box",
              cursor: "pointer",
            }}
            onClick={() => {
              setZoomValue(500);
              const node = prunedTree.nodes[0];
              const distance = zoomValue; //200
              const distRatio =
                1 + distance / Math.hypot(node.x, node.y, node.z);
              // console.log(containerRef);
              containerRef.current.cameraPosition(
                {
                  x: node.x * distRatio,
                  y: node.y * distRatio,
                  z: node.z * distRatio,
                }, // new position
                node, // lookAt ({ x, y, z })
                3000 // ms transition duration
              );
            }}
          />
        </OverlayTrigger>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id="tooltip-disabled">ZoomIn</Tooltip>}
        >
          <ZoomIn
            style={{
              marginTop: "15px",
              color: "#CACACA 0% 0% no-repeat padding-box",
              cursor: "pointer",
            }}
            onClick={() => {
              const node = prunedTree.nodes[0];
              setZoomValue(zoomValue - 20);

              const distance = zoomValue; //200
              const distRatio =
                1 + distance / Math.hypot(node.x, node.y, node.z);
              // console.log(containerRef);
              containerRef.current.cameraPosition(
                {
                  x: node.x * distRatio,
                  y: node.y * distRatio,
                  z: node.z * distRatio,
                }, // new position
                node, // lookAt ({ x, y, z })
                3000 // ms transition duration
              );
            }}
          />
        </OverlayTrigger>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id="tooltip-disabled">ZoomOut</Tooltip>}
        >
          <ZoomOut
            style={{
              marginTop: "15px",
              color: "#CACACA 0% 0% no-repeat padding-box",
              cursor: "pointer",
            }}
            onClick={() => {
              const node = prunedTree.nodes[0];
              setZoomValue(zoomValue + 20);

              const distance = zoomValue; //200
              const distRatio =
                1 + distance / Math.hypot(node.x, node.y, node.z);
              // console.log(containerRef);
              containerRef.current.cameraPosition(
                {
                  x: node.x * distRatio,
                  y: node.y * distRatio,
                  z: node.z * distRatio,
                }, // new position
                node, // lookAt ({ x, y, z })
                3000 // ms transition duration
              );
            }}
          />
        </OverlayTrigger>

        {/* </Card.Body> */}
      </Card>
    </Draggable>
  );
};

export default Zoom;
