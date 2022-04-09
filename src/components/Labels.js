import React, { useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import Draggable from "react-draggable"; // Both at the same time
var _ = require("lodash");

const Labels = () => {
  const { height, width } = useWindowDimensions();
  var [labelPosition, setLabelPosition] = useState({
    x: width - 1.3 * (width / 2),
    y: height - height * 0.3,
  });

  return (
    <Draggable
      position={labelPosition}
      onStop={(e, data) => setLabelPosition({ x: data.x, y: data.y })}
    >
      <Card
        style={{
          width: "40%",
          // margin: "0.8rem",
          color: "#fff",
          border: "1.5px solid white",
          borderRadius: "5px",
          alignContent: "center",
          // paddingLeft: "30px",
          cursor: "move",
        }}
        className="labelCardDetails justify-content-center"
      >
        {" "}
        <OverlayTrigger
          placement="right"
          overlay={
            <Tooltip id="tooltip-disabled">Node Type and their color</Tooltip>
          }
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              padding: "5px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img src="imgs/white-box.png" height="25px" />
              <span style={{ marginLeft: "4px" }}>Workflow</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: "15px",
                  width: "15px",
                  borderRadius: "50%",
                  background: "#d27dfa",
                }}
              ></div>
              <span style={{ marginLeft: "4px" }}>Implementation</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: "15px",
                  width: "15px",
                  borderRadius: "50%",
                  background: "transparent",
                  border: "0.5px solid green",
                }}
              ></div>
              <span style={{ marginLeft: "4px" }}>Buyer</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: "15px",
                  width: "15px",
                  borderRadius: "50%",
                  background: "transparent",
                  border: "0.5px solid red",
                }}
              ></div>
              <span style={{ marginLeft: "4px" }}>Sellar</span>
            </div>
          </div>
        </OverlayTrigger>
        {/* </Card.Body> */}
      </Card>
      {/* </OverlayTrigger> */}
    </Draggable>
  );
};

export default Labels;
