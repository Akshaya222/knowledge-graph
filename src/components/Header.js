import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row, Image, Form, Spinner } from "react-bootstrap";
import _ from "lodash";

function App() {
  return (
    <div className="App">
      <div className="headerSection">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Image height="55px" src="/imgs/logo.png" />
          <h2 style={{ color: "#000", marginLeft: "10px", marginTop: "2px" }}>
            InsuranceGIG
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <p style={{ color: "#b090f0", marginTop: "0.6rem" }}>Marketplace</p>
          <span className="dot"></span>
          <p style={{ color: "#b090f0", marginTop: "0.6rem" }}>
            Knowledge Graph
          </p>
        </div>
        <div style={{ backgroundColor: "rgba(229, 229, 229, 0.4)" }}>
          <button
            className="header-button"
            style={{ background: "#6605f7", color: "white" }}
          >
            Workflow
          </button>
          <button className="header-button">Partner</button>
          <button className="header-button">Line of Business</button>
        </div>
      </div>
    </div>
  );
}

export default App;
