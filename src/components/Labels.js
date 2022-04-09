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
            <Tooltip id="tooltip-disabled">Node Type and their color</Tooltip>
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
    </Draggable>
  );
};

export default Labels;
