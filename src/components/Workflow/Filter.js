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
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time
import { filterData, getAllData } from "../../data";
import s from "react-multiple-select-dropdown-lite";
import {
  PatchPlusFill,
  PlusCircleDotted,
  PlusCircleFill,
  XOctagon,
  FullscreenExit,
  Fullscreen,
} from "react-bootstrap-icons";

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
  const [show, setShow] = useState(false);
  var [filterPosition, setFilterPosition] = useState({
    x: -20,
    y: 10,
  });

  const allNodes = { wfdata, wfdataImp, sellers, buyers };

  let CNameoptions = wfdata
    .map((i) => i.title)
    .filter(function (element) {
      return element != null;
    });
  CNameoptions = ["All"].concat(CNameoptions);

  var set;
  set = new Set([
    "All",
    ...wfdata
      .map((w) => w.workflowType)
      .filter(function (element) {
        return element != null;
      }),
  ]);
  let wfTypeOptions = [...set];

  set = new Set(
    ["All", ...wfdataImp.map((w) => w.status)].filter(function (element) {
      return element != null;
    })
  );
  let wfStatusOptions = [...set];

  let sellerNames = sellers
    .map((s) => s.seller)
    .filter(function (element) {
      return element != null || element != undefined;
    });
  let buyerNames = buyers
    .map((b) => b.buyer)
    .filter(function (element) {
      return element != null || element != undefined;
    });
  set = new Set(["All", ...sellerNames, ...buyerNames]);
  let partnerNamesOptions = [...set];

  let lineOfBusSellers = sellers
    .map((s) => {
      if (s.lineOfBusiness != null) {
        return s.lineOfBusiness;
      }
    })
    .filter(function (element) {
      return element != null || element != undefined;
    });

  let lineofBusBuyers = buyers
    .map((b) => {
      if (b.lineOfBusiness != null) {
        return b.lineOfBusiness;
      }
    })
    .filter(function (element) {
      return element != null || element != undefined;
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
      return element != null || element != undefined;
    });

  let lineofBusSubTyBuyers = buyers
    .map((b) => {
      if (b.lineOfBusinessSubType != null) {
        return b.lineOfBusinessSubType;
      }
    })
    .filter(function (element) {
      return element != null || element != undefined;
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
      return element != null || element != undefined;
    });

  let valueChainBuy = buyers
    .map((b) => {
      if (b.valueChain != null) {
        return b.valueChain;
      }
    })
    .filter(function (element) {
      return element != null || element != undefined;
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
      return element != null || element != undefined;
    });

  let valueChainSubBuy = buyers
    .map((b) => {
      if (b.valueChainSubType != null) {
        return b.valueChainSubType;
      }
    })
    .filter(function (element) {
      return element != null || element != undefined;
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
      return element != null || element != undefined;
    });

  let companyTypeBuy = buyers
    .map((b) => {
      if (b.companyType != null) {
        return b.companyType;
      }
    })
    .filter(function (element) {
      return element != null || element != undefined;
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
      return element != null || element != undefined;
    });

  let companySubTypeBuy = buyers
    .map((b) => {
      if (b.companySubType != null) {
        return b.companySubType;
      }
    })
    .filter(function (element) {
      return element != null || element != undefined;
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
      <Card className="infoCardFilter">
        <Card.Header className="infoCardFilterHeader">
          <p> Select Filters</p>
          <p onClick={() => setShow(!show)} style={{ marginLeft: "60px" }}>
            {show ? (
              <Container
                style={{
                  background: "red",
                  paddingTop: "1px",
                  paddingBottom: "3px",
                  paddingLeft: "6px",
                  paddingRight: "6px",
                }}
              >
                <FullscreenExit color="#fff" />
              </Container>
            ) : (
              <Container
                style={{
                  background: "#6c4197",
                  paddingTop: "1px",
                  paddingBottom: "3px",
                  paddingLeft: "6px",
                  paddingRight: "6px",
                }}
              >
                <Fullscreen color="#fff" />
              </Container>
            )}
          </p>
        </Card.Header>
        {show ? (
          <Card.Body>
            <div className="infoCardFilterCardBody">
              <Form.Label
                htmlFor="filterSelect"
                className="multiselect-form-label"
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
                className="multiselect-form-label"
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
                className="multiselect-form-label"
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
                className="multiselect-form-label"
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
                className="multiselect-form-label"
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
              {/* <Form.Label
                htmlFor="filterBusinessSubType"
                className="multiselect-form-label"
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
              /> */}

              <Form.Label
                htmlFor="filterValueChain"
                className="multiselect-form-label"
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
              {/* <Form.Label
                htmlFor="filterValueSubType"
                className="multiselect-form-label"
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
              /> */}
              <Form.Label
                htmlFor="filterCompanyType"
                className="multiselect-form-label"
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
              {/* <Form.Label
                htmlFor="filterCompanySubType"
                className="multiselect-form-label"
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
              /> */}
            </div>

            <br />
            <Button
              variant="primary"
              className="filter-button"
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
              className="reset-button"
              onClick={() => {
                window.location.reload(false);
              }}
            >
              Reset
            </Button>
          </Card.Body>
        ) : null}
      </Card>
    </Draggable>
  );
};

export default Filter;
