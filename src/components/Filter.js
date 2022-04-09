import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import {
  Container,
  Card,
  Form,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
import SelectSearch from "react-select-search";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time
import { filterData, getAllData } from "../data";
import s from "react-multiple-select-dropdown-lite";

const Filter = ({
  wfdata,
  wfdataImp,
  sellers,
  buyers,
  setAllData,
  unchangedData,
}) => {
  const { height, width } = useWindowDimensions();
  const [filteredObj, setFilteredObj] = useState({
    names: [],
    wfStatus: [],
    wfType: [],
    partnerNames: [],
    busiType: [],
    busiSubType: [],
    valueChainType: [],
    valueChainSubType: [],
    companyType: [],
    companySubType: [],
  });
  var [filterPosition, setFilterPosition] = useState({
    x: 0 + width * 0.03,
    y: 10,
  });

  const allNodes = { wfdata, wfdataImp, sellers, buyers };

  let CNameoptions = wfdata.map((i) => i.title);
  CNameoptions = ["All"].concat(CNameoptions);

  var set;
  set = new Set(["All", ...wfdata.map((w) => w.workflowType)]);
  let wfTypeOptions = [...set];

  set = new Set(["All", ...wfdataImp.map((w) => w.status)]);
  let wfStatusOptions = [...set];

  let sellerNames = sellers.map((s) => s.seller);
  let buyerNames = buyers.map((b) => b.buyer);
  set = new Set(["All", ...sellerNames, ...buyerNames]);
  let partnerNamesOptions = [...set];

  let lineOfBusSellers = sellers
    .map((s) => {
      if (s.lineOfBusiness != null) {
        return s.lineOfBusiness;
      }
    })
    .filter(function (element) {
      return element !== undefined;
    });

  let lineofBusBuyers = buyers
    .map((b) => {
      if (b.lineOfBusiness != null) {
        return b.lineOfBusiness;
      }
    })
    .filter(function (element) {
      return element !== undefined;
    });
  set = new Set(["All", ...lineOfBusSellers, ...lineofBusBuyers]);
  let lineOfBusinessOptions = [...set];

  let lineOfBusSubTySellers = sellers
    .map((s) => {
      if (s.lineOfBusinessSubType != null) {
        return s.lineOfBusinessSubType;
      }
    })
    .filter(function (element) {
      return element !== undefined;
    });

  let lineofBusSubTyBuyers = buyers
    .map((b) => {
      if (b.lineOfBusinessSubType != null) {
        return b.lineOfBusinessSubType;
      }
    })
    .filter(function (element) {
      return element !== undefined;
    });
  set = new Set(["All", ...lineOfBusSubTySellers, ...lineofBusSubTyBuyers]);
  let lineOfBusSubTyOptions = [...set];

  let valueChainSell = sellers
    .map((s) => {
      if (s.valueChain != null) {
        return s.valueChain;
      }
    })
    .filter(function (element) {
      return element !== undefined;
    });

  let valueChainBuy = buyers
    .map((b) => {
      if (b.valueChain != null) {
        return b.valueChain;
      }
    })
    .filter(function (element) {
      return element !== undefined;
    });
  set = new Set(["All", ...valueChainBuy, ...valueChainSell]);
  let valueChainOptions = [...set];

  let valueChainSubSell = sellers
    .map((s) => {
      if (s.valueChainSubType != null) {
        return s.valueChainSubType;
      }
    })
    .filter(function (element) {
      return element !== undefined;
    });

  let valueChainSubBuy = buyers
    .map((b) => {
      if (b.valueChainSubType != null) {
        return b.valueChainSubType;
      }
    })
    .filter(function (element) {
      return element !== undefined;
    });
  set = new Set(["All", ...valueChainSubBuy, ...valueChainSubSell]);
  let valueChainSubOptions = [...set];

  //companyType  companySubType
  let companyTypeSell = sellers
    .map((s) => {
      if (s.companyType != null) {
        return s.companyType;
      }
    })
    .filter(function (element) {
      return element !== undefined;
    });

  let companyTypeBuy = buyers
    .map((b) => {
      if (b.companyType != null) {
        return b.companyType;
      }
    })
    .filter(function (element) {
      return element !== undefined;
    });
  set = new Set(["All", ...companyTypeBuy, ...companyTypeSell]);
  let companyTypeOptions = [...set];

  //companyType  companySubType
  let companySubTypeSell = sellers
    .map((s) => {
      if (s.companySubType != null) {
        return s.companySubType;
      }
    })
    .filter(function (element) {
      return element !== undefined;
    });

  let companySubTypeBuy = buyers
    .map((b) => {
      if (b.companySubType != null) {
        return b.companySubType;
      }
    })
    .filter(function (element) {
      return element !== undefined;
    });
  set = new Set(["All", ...companySubTypeBuy, ...companySubTypeSell]);
  let companySubTypeOptions = [...set];

  const handleOnchangeWfName = (selectedList, selectedItem) => {
    setFilteredObj({ ...filteredObj, names: selectedList });
  };
  const handleOnchangePartnerName = (selectedList, selectedItem) => {
    setFilteredObj({ ...filteredObj, partnerNames: selectedList });
  };

  const handleOnchangeWfType = (selectedList, selectedItem) => {
    setFilteredObj({ ...filteredObj, wfType: selectedList });
  };
  const handleOnchangeWfStatus = (selectedList, selectedItem) => {
    setFilteredObj({ ...filteredObj, wfStatus: selectedList });
  };
  const handleOnchangeBusiType = (selectedList, selectedItem) => {
    setFilteredObj({ ...filteredObj, busiType: selectedList });
  };
  const handleOnchangeBusiSubType = (selectedList, selectedItem) => {
    setFilteredObj({ ...filteredObj, busiSubType: selectedList });
  };
  const handleOnchangeValueChainType = (selectedList, selectedItem) => {
    setFilteredObj({ ...filteredObj, valueChainType: selectedList });
  };
  const handleOnchangeValueChainSubType = (selectedList, selectedItem) => {
    setFilteredObj({ ...filteredObj, valueChainSubType: selectedList });
  };
  const handleOnchangeCompanyType = (selectedList, selectedItem) => {
    setFilteredObj({ ...filteredObj, companyType: selectedList });
  };
  const handleOnchangeCompanySubType = (selectedList, selectedItem) => {
    setFilteredObj({ ...filteredObj, companySubType: selectedList });
  };
  return (
    <Draggable
      position={filterPosition}
      onStop={(e, data) => setFilterPosition({ x: data.x, y: data.y })}
    >
      <Card style={{ margin: "0.8rem" }} className="infoCardFilter">
        <Card.Header
          className="infoCardFilterHeader"
          style={{
            // textAlign: "left",
            font: "bold bold medium 22px/33px Poppins",
            letterSpacing: "1px",
            color: "#fff",
            fontSize: "22px",
            opacity: "1",
          }}
        >
          Select Filters
        </Card.Header>

        <Card.Body>
          <div
            style={{
              height: "75vh",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            <Form.Label
              htmlFor="filterSelect"
              style={{
                marginTop: "10px",
                textAlign: "left",
                font: "normal normal normal 18px/29px Poppins",
                letterSpacing: "0px",
                color: "#fff",
                opacity: "1",
              }}
            >
              Workflow Name
            </Form.Label>
            <Multiselect
              showCheckbox={true}
              isObject={false}
              options={CNameoptions} // Options to display in the dropdown
              // Preselected value to persist in dropdown
              displayValue="name" // Property name to display in the dropdown options
              onSelect={handleOnchangeWfName}
              onRemove={handleOnchangeWfName}
            />
            <br />
            <Form.Label
              htmlFor="filterSelectType"
              style={{
                marginTop: "10px",
                textAlign: "left",
                font: "normal normal normal 18px/29px Poppins",
                letterSpacing: "0px",
                color: "#fff",
                opacity: "1",
              }}
            >
              Workflow Type
            </Form.Label>
            <Multiselect
              showCheckbox={true}
              isObject={false}
              options={wfTypeOptions} // Options to display in the dropdown
              // Preselected value to persist in dropdown
              displayValue="Type" // Property name to display in the dropdown options
              onSelect={handleOnchangeWfType}
              onRemove={handleOnchangeWfType}
            />
            <br />
            <Form.Label
              htmlFor="filterSelectStatus"
              style={{
                marginTop: "10px",
                textAlign: "left",
                font: "normal normal normal 18px/29px Poppins",
                letterSpacing: "0px",
                color: "#fff",
                opacity: "1",
              }}
            >
              Workflow Status
            </Form.Label>
            <Multiselect
              showCheckbox={true}
              isObject={false}
              options={wfStatusOptions} // Options to display in the dropdown
              // Preselected value to persist in dropdown
              displayValue="Type" // Property name to display in the dropdown options
              onSelect={handleOnchangeWfStatus}
              onRemove={handleOnchangeWfStatus}
            />

            <br />
            <Form.Label
              htmlFor="filterSelect"
              style={{
                // marginTop: "10px",
                textAlign: "left",
                font: "normal normal normal 18px/29px Poppins",
                letterSpacing: "0px",
                color: "#fff",
                opacity: "1",
              }}
            >
              Partner Name
            </Form.Label>
            <Multiselect
              showCheckbox={true}
              isObject={false}
              options={partnerNamesOptions} // Options to display in the dropdown
              // selectedValues={this.companyOptions} // Preselected value to persist in dropdown
              onSelect={handleOnchangePartnerName} // Function will trigger on select event
              onRemove={handleOnchangePartnerName} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
            />
            <Form.Label
              htmlFor="filterBusinessType"
              style={{
                // marginTop: "10px",
                textAlign: "left",
                font: "normal normal normal 18px/29px Poppins",
                letterSpacing: "0px",
                color: "#fff",
                opacity: "1",
              }}
            >
              Line of Business Type
            </Form.Label>
            <Multiselect
              showCheckbox={true}
              isObject={false}
              options={lineOfBusinessOptions} // Options to display in the dropdown
              // selectedValues={this.companyOptions} // Preselected value to persist in dropdown
              onSelect={handleOnchangeBusiType} // Function will trigger on select event
              onRemove={handleOnchangeBusiType} // Function will trigger on remove event
              displayValue="Business Type" // Property name to display in the dropdown options
            />
            <br />
            <Form.Label
              htmlFor="filterBusinessSubType"
              style={{
                // marginTop: "10px",
                textAlign: "left",
                font: "normal normal normal 18px/29px Poppins",
                letterSpacing: "0px",
                color: "#fff",
                opacity: "1",
              }}
            >
              Line of Business SubType
            </Form.Label>
            <Multiselect
              showCheckbox={true}
              isObject={false}
              options={lineOfBusSubTyOptions} // Options to display in the dropdown
              // selectedValues={this.companyOptions} // Preselected value to persist in dropdown
              onSelect={handleOnchangeBusiSubType} // Function will trigger on select event
              onRemove={handleOnchangeBusiSubType} // Function will trigger on remove event
              displayValue="Sub Type" // Property name to display in the dropdown options
            />

            <Form.Label
              htmlFor="filterValueChain"
              style={{
                // marginTop: "10px",
                textAlign: "left",
                font: "normal normal normal 18px/29px Poppins",
                letterSpacing: "0px",
                color: "#fff",
                opacity: "1",
              }}
            >
              Value Chain Type
            </Form.Label>
            <Multiselect
              showCheckbox={true}
              isObject={false}
              options={valueChainOptions} // Options to display in the dropdown
              // selectedValues={this.companyOptions} // Preselected value to persist in dropdown
              onSelect={handleOnchangeValueChainType} // Function will trigger on select event
              onRemove={handleOnchangeValueChainType} // Function will trigger on remove event
              displayValue="value chain" // Property name to display in the dropdown options
            />
            <Form.Label
              htmlFor="filterValueSubType"
              style={{
                // marginTop: "10px",
                textAlign: "left",
                font: "normal normal normal 18px/29px Poppins",
                letterSpacing: "0px",
                color: "#fff",
                opacity: "1",
              }}
            >
              Value Chain Sub Type
            </Form.Label>
            <Multiselect
              showCheckbox={true}
              isObject={false}
              options={valueChainSubOptions} // Options to display in the dropdown
              // selectedValues={this.companyOptions} // Preselected value to persist in dropdown
              onSelect={handleOnchangeValueChainSubType} // Function will trigger on select event
              onRemove={handleOnchangeValueChainSubType} // Function will trigger on remove event
              displayValue="value chain sub" // Property name to display in the dropdown options
            />
            <Form.Label
              htmlFor="filterCompanyType"
              style={{
                // marginTop: "10px",
                textAlign: "left",
                font: "normal normal normal 18px/29px Poppins",
                letterSpacing: "0px",
                color: "#fff",
                opacity: "1",
              }}
            >
              Company Type
            </Form.Label>
            <Multiselect
              isObject={false}
              showCheckbox={true}
              options={companyTypeOptions} // Options to display in the dropdown
              // selectedValues={this.companyOptions} // Preselected value to persist in dropdown
              onSelect={handleOnchangeCompanyType} // Function will trigger on select event
              onRemove={handleOnchangeCompanySubType} // Function will trigger on remove event
              displayValue="company type" // Property name to display in the dropdown options
            />
            <Form.Label
              htmlFor="filterCompanySubType"
              style={{
                // marginTop: "10px",
                textAlign: "left",
                font: "normal normal normal 18px/29px Poppins",
                letterSpacing: "0px",
                color: "#fff",
                opacity: "1",
              }}
            >
              Company Sub Type
            </Form.Label>
            <Multiselect
              showCheckbox={true}
              isObject={false}
              options={companySubTypeOptions} // Options to display in the dropdown
              // selectedValues={this.companyOptions} // Preselected value to persist in dropdown
              onSelect={handleOnchangeCompanySubType} // Function will trigger on select event
              onRemove={handleOnchangeCompanySubType} // Function will trigger on remove event
              displayValue="company sub type" // Property name to display in the dropdown options
            />
          </div>

          <br />
          <Button
            variant="primary"
            style={{
              background: "#47127D",
              borderRadius: "4px",
              borderColor: "None",
              width: "100px",
              border: "none",
              outline: "none",
            }}
            onClick={() => {
              let updatedFilteredObj = filteredObj;
              if (filteredObj.names.length == 0) {
                updatedFilteredObj.names.push("All");
              }
              if (filteredObj.partnerNames.length == 0) {
                updatedFilteredObj.partnerNames.push("All");
              }
              if (filteredObj.wfStatus.length == 0) {
                updatedFilteredObj.wfStatus.push("All");
              }
              if (filteredObj.wfType.length == 0) {
                updatedFilteredObj.wfType.push("All");
              }
              if (filteredObj.busiType.length == 0) {
                updatedFilteredObj.busiType.push("All");
              }
              if (filteredObj.busiSubType.length == 0) {
                updatedFilteredObj.busiSubType.push("All");
              }
              if (filteredObj.valueChainType.length == 0) {
                updatedFilteredObj.valueChainType.push("All");
              }
              if (filteredObj.valueChainSubType.length == 0) {
                updatedFilteredObj.valueChainSubType.push("All");
              }
              if (filteredObj.companyType.length == 0) {
                updatedFilteredObj.companyType.push("All");
              }
              if (filteredObj.companySubType.length == 0) {
                updatedFilteredObj.companySubType.push("All");
              }
              let { workflowdata, workflowimpdata, sellerdata, buyerdata } =
                filterData(allNodes, updatedFilteredObj);
              let data = getAllData(
                workflowdata,
                workflowimpdata,
                sellerdata,
                buyerdata
              );
              setAllData(data.workflowdata);
            }}
          >
            Filter
          </Button>
          <Button
            variant="primary"
            style={{
              background: "#F72A51",
              borderRadius: "4px",
              borderColor: "None",
              width: "100px",
              marginLeft: "10px",
              border: "none",
              outline: "none",
            }}
            onClick={() => {
              window.location.reload(false);
            }}
          >
            Reset
          </Button>
        </Card.Body>
      </Card>
    </Draggable>
  );
};

export default Filter;
