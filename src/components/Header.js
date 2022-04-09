import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row, Image, Form, Spinner } from "react-bootstrap";
import _ from "lodash";

function App() {
  return (
    <div className="App">
      <div className="headerSection">
        <div className="flex-row">
          <Image height="55px" src="/imgs/logo.png" />
          <h2 className="company-name">InsuranceGIG</h2>
        </div>
        <div className="flex-row-align-center">
          <p className="header-text">Marketplace</p>
          <span className="dot"></span>
          <p className="header-text">Knowledge Graph</p>
        </div>
        <div className="header-tab-pill-container ">
          <button className="header-button header-button-active">
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
