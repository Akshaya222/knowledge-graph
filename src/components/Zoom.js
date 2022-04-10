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
      <Card className="zoomCardDetails justify-content-center zoom-container">
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id="tooltip-disabled">Reset</Tooltip>}
        >
          <ArrowClockwise
            className="zoom-arrow-clock"
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
            className="zoom-zoomIn"
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
            className="zoom-zoomIn"
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
