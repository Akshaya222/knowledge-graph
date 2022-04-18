import React, { useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
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
      <Card className="labelCardDetails justify-content-center labelCard">
        {" "}
        <OverlayTrigger
          placement="right"
          overlay={
            <Tooltip id="tooltip-disabled">Node Type and their color</Tooltip>
          }
        >
          <div className="label-container">
            <div className="flex-row-align-center">
              <div
                className="label-circle"
                style={{
                  background: "rgba(119, 1, 216,1.0)",
                }}
              ></div>
              {/* <img src="imgs/white-box.png" height="25px" /> */}
              <span className="label-text">Workflow</span>
            </div>
            <div className="flex-row-align-center">
              <div
                className="label-circle"
                style={{
                  background: "rgb(255, 179, 215)",
                }}
              ></div>
              <span className="label-text">Implementation</span>
            </div>
            <div className="flex-row-align-center">
              <div
                className="label-circle"
                style={{
                  background: "transparent",
                  border: "1px solid green",
                }}
              ></div>
              <span className="label-text">Buyer</span>
            </div>
            <div className="flex-row-align-center">
              <div
                className="label-circle"
                style={{
                  background: "transparent",
                  border: "1px solid red",
                }}
              ></div>
              <span className="label-text">Sellar</span>
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
