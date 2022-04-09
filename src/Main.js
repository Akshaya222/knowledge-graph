import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row, Image, Form, Spinner } from "react-bootstrap";
import _ from "lodash";

function App() {
  return (
    <div className="App">
      <div className="headerSection">
        <Row>
          <Col xs={4}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Image height="55px" src="/imgs/logo.png" />
              <h2
                style={{ color: "#000", marginLeft: "10px", marginTop: "2px" }}
              >
                InsuranceGIG
              </h2>
            </div>
          </Col>
          <Col style={{ marginLeft: "50px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <p style={{ color: "#b090f0", marginTop: "7px" }}>Marketplace</p>
              <span className="dot"></span>
              <p style={{ color: "#b090f0", marginTop: "7px" }}>
                Knowledge Graph
              </p>
            </div>
          </Col>
          <Col xs={6} style={{ marginLeft: "50px" }}>
            <ul class="nav nav-pills mb-3 al" id="pills-tab" role="tablist">
              <li
                class="nav-item align-items-center justify-items-center justify-content-center align-content-center"
                role="presentation"
              >
                <button
                  class="nav-link   nav-text active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Workflow
                </button>
                <div
                  className="border-nav"
                  style={{ width: "20px", height: "10px" }}
                ></div>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link nav-text"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Partner
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link  nav-text"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  Line of Business
                </button>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
