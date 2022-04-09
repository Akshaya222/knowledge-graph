import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  PureComponent,
  useCallback,
  createRef,
} from "react";
import {
  ForceGraph2D,
  ForceGraph3D,
  ForceGraphVR,
  ForceGraphAR,
} from "react-force-graph";
import { ArrowClockwise, ZoomIn, ZoomOut } from "react-bootstrap-icons";
import Multiselect from "multiselect-react-dropdown";

// import workflow, { nodes } from "./data/workflow";
import { withSize } from "react-sizeme";
import * as THREE from "three";
import {
  Container,
  Col,
  Row,
  Card,
  Form,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
// import BootstrapSelect from 'react-bootstrap-select-dropdown';
import SelectSearch from "react-select-search";
import Fuse from "fuse.js";
import SpriteText from "three-spritetext";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time
import useWindowDimensions from "./hooks/useWindowDimensions";
var _ = require("lodash");

// import {selectPicker} from "bootstrap-select";

const NODE_R = 3;

const withSizeHOC = withSize({
  monitorWidth: true,
  monitorHeight: true,
  noPlaceholder: true,
});

const renderNode = (node) => {
  // console.log(node);
  // const { NODE_R } = Graph;

  if (node.img) {
    const loader = new THREE.TextureLoader();

    const imgTexture = loader.load(
      // resource URL
      // "https://www.insurancegig.com/images/Violet-Logo.svg",
      `/imgs/${node.img}`,
      // Function when resource is loaded
      function (texture) {
        // do something with the texture
        var material = new THREE.MeshBasicMaterial({
          map: texture,
        });
      },
      // Function called when download progresses
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // Function called when download errors
      function (xhr) {
        console.log("An error happened");
      }
    );
    //   console.log(imgTexture);
    const material = new THREE.SpriteMaterial({ map: imgTexture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(node.width, node.height);
    return sprite;
  } else {
    console.log("}}}}");
    console.log(node.Type);
    if (node.Type !== "Master" && node.Type !== "Workflow") {
      // const sprite = new SpriteText(node.Title);
      // sprite.color ="rgba(255, 255, 255,0.4)";
      // sprite.textHeight = 8;
      // return sprite;
    } else {
      // sprite.textHeight = 0;
    }
  }
};

const fuzzySearch = (options) => {
  const fuse = new Fuse(options, {
    keys: ["name"],
    threshold: 0.3,
  });

  return (value) => {
    if (!value.length) {
      return options;
    }

    return fuse.search(value);
  };
};

function KGGraph(props) {
  // constructor(props) {
  //   super(props);
  //   containerRef = createRef();

  //   state = {
  //     item: {},
  //     wi: wi,
  //   };

  // }

  var ncolors = {
    Master: "rgba(196, 72, 227,0.0)",
    Workflow: "rgba(196, 72, 227,1)",
    "Workflow Implementation": "orange",
    Seller: "rgba(120, 40, 16,0)",
    Buyer: "rgba(116, 72, 203,0)",
  };
  var ntcolors = {
    Master: "rgba(196, 72, 227,0.0)",
    Workflow: "rgba(196, 72, 227,0.1)",
    "Workflow Implementation": "orange",
    Seller: "rgba(120, 40, 16,0)",
    Buyer: "rgba(116, 72, 203,0)",
  };
  const workflow = { nodes: {} };
  var [wf, setWf] = useState(_.cloneDeep(workflow));
  var [item, setItem] = useState({});
  var [nameFilterValue, setNameFilterValue] = useState("All");
  var [companyFilterValue, setCompanyFilterValue] = useState("All");
  var [statusFilterValue, setStatusFilterValue] = useState("All");

  var [activeDrags, setActiveDrags] = useState(0);
  var [deltaPosition, setDeltaPosition] = useState({
    x: 0,
    y: 0,
  });
  var [controlledPosition, setControlledPosition] = useState({
    x: -400,
    y: 200,
  });

  const onStart = () => {
    setActiveDrags(++activeDrags);
  };

  const onStop = () => {
    setActiveDrags(--activeDrags);
  };
  const dragHandlers = { onStart: onStart, onStop: onStop };

  const containerRef = useRef();
  let numTicks = 0;
  let animationRunning = false;

  function throttleAnimation() {
    if (!animationRunning || !containerRef.current) {
      numTicks = 0;
      return;
    }
    containerRef.current.pauseAnimation();
    setTimeout(() => {
      containerRef.current.resumeAnimation();
      throttleAnimation();
    }, 100);
    numTicks += 1;
  }

  useEffect(() => {
    // setWf(props.myData);
    console.log("|||||GUGUVUV");
    console.log(wf);
    // throttleAnimation();

    // const node = wf.nodes[0];
    // if (wf.nodes[0].x){
    // const distance = 150;
    // const distRatio =
    //   1 + distance / Math.hypot(wf.nodes[0].x, wf.nodes[0].y, wf.nodes[0].z);
    // // console.log(containerRef);
    // containerRef.current.cameraPosition(
    //   {
    //     x: wf.nodes[0].x * distRatio,
    //     y: wf.nodes[0].y * distRatio,
    //     z: wf.nodes[0].z * distRatio,
    //   }, // new position
    //   wf.nodes[0], // lookAt ({ x, y, z })
    //   3000 // ms transition duration
    // );}
    // const fg = containerRef.current;
    // fg.d3Force={("link").distance((link) => 150 - (link.level)).strength(1)};

    containerRef.current
      .d3Force("link")
      .distance((link) => {
        if (link.target.Type == "Workflow") {
          // return 80;
          return 80 - (link.weight || 0);
        } else {
          return 60;
        }
      })
      .strength((link) => 1);
    setTimeout(() => {
      prunedTree.nodes[0].height = 20;
      prunedTree.nodes[0].width = 100;

      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 1350 * 1);

    //  1,12,7,2,6,11,10,5,16,21,13,3,18,8,19,15,14,20,4,9,17
    setTimeout(() => {
      prunedTree.nodes[1].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 1);

    setTimeout(() => {
      prunedTree.links[12].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 1400 * 1);

    setTimeout(() => {
      prunedTree.nodes[12].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 2);
    setTimeout(() => {
      prunedTree.nodes[7].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 3);
    setTimeout(() => {
      prunedTree.nodes[2].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 4);
    setTimeout(() => {
      prunedTree.nodes[6].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 5);
    //  1,12,7,2,6,11,10,5,16,21,13,3,18,8,19,15,14,20,4,9,17
    setTimeout(() => {
      prunedTree.nodes[11].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 6);
    setTimeout(() => {
      prunedTree.nodes[10].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 7);
    setTimeout(() => {
      prunedTree.nodes[5].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 8);
    setTimeout(() => {
      prunedTree.nodes[16].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 9);
    setTimeout(() => {
      prunedTree.nodes[21].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 10);
    setTimeout(() => {
      prunedTree.nodes[13].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 11);

    setTimeout(() => {
      prunedTree.nodes[3].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 12);
    //  1,12,7,2,6,11,10,5,16,21,13,3,18,8,19,15,14,20,4,9,17
    setTimeout(() => {
      prunedTree.nodes[18].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 13);
    setTimeout(() => {
      prunedTree.nodes[8].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 14);
    setTimeout(() => {
      prunedTree.nodes[19].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 15);
    setTimeout(() => {
      prunedTree.nodes[15].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 16);
    setTimeout(() => {
      prunedTree.nodes[14].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 17);
    setTimeout(() => {
      prunedTree.nodes[20].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 18);
    setTimeout(() => {
      prunedTree.nodes[4].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 19);
    setTimeout(() => {
      prunedTree.nodes[9].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 20);
    //  1,12,7,2,6,11,10,5,16,21,13,3,18,8,19,15,14,20,4,9,17
    setTimeout(() => {
      prunedTree.nodes[17].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 21);
    setTimeout(() => {
      prunedTree.links[0].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 1 - 100);
    setTimeout(() => {
      prunedTree.links[11].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 2 - 100);

    setTimeout(() => {
      prunedTree.links[6].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 3 - 100);

    setTimeout(() => {
      prunedTree.links[1].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 4 - 100);

    setTimeout(() => {
      prunedTree.links[5].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 5 - 100);

    setTimeout(() => {
      prunedTree.links[10].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 6 - 100);
    //  1,12,7,2,6,11,10,5,16,21,13,3,18,8,19,15,14,20,4,9,17

    setTimeout(() => {
      prunedTree.links[9].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 7 - 100);

    setTimeout(() => {
      prunedTree.links[4].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 8 - 100);

    setTimeout(() => {
      prunedTree.links[15].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 9 - 100);

    setTimeout(() => {
      prunedTree.links[20].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 10 - 100);
    //  1,12,7,2,6,11,10,5,16,21,13,3,18,8,19,15,14,20,4,9,17

    setTimeout(() => {
      prunedTree.links[12].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 11 - 100);

    setTimeout(() => {
      prunedTree.links[2].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 12 - 100);

    setTimeout(() => {
      prunedTree.links[17].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 13 - 100);

    setTimeout(() => {
      prunedTree.links[7].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 14 - 100);

    setTimeout(() => {
      prunedTree.links[18].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 15 - 100);

    setTimeout(() => {
      prunedTree.links[14].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 16 - 100);

    setTimeout(() => {
      prunedTree.links[13].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 17 - 100);
    //  1,12,7,2,6,11,10,5,16,21,13,3,18,8,19,15,14,20,4,9,17

    setTimeout(() => {
      prunedTree.links[19].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 18 - 100);

    setTimeout(() => {
      prunedTree.links[3].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 19 - 100);

    setTimeout(() => {
      prunedTree.links[8].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 20 - 100);

    setTimeout(() => {
      prunedTree.links[16].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 21 - 100);
    setTimeout(() => {
      prunedTree.links[17].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 21 - 100);
    setTimeout(() => {
      prunedTree.links[21].visible = true;
      setPrunedTree(getPrunedTree);
      console.log("150000");
    }, 500 * 22 - 100);

    console.log(containerRef);
    var z = 0;
    for (let i = 0; i < 22; i++) {
      setTimeout(() => {
        console.log(i);
        console.log(prunedTree.nodes[i]);
        prunedTree.nodes[z].visible = true;
        console.log("100000");
      }, 1000 * i);
      setTimeout(() => {
        setPrunedTree(getPrunedTree);
        console.log("150000");
      }, 500 * (i + 1));
    }
    console.log("=============");
    console.log(prunedTree);

    // animationRunning = startAnimation;
    // // Deactivate existing forces
    // fg.d3Force('center', null);
    // fg.d3Force('charge', null);

    // // Add collision and bounding box forces
    // fg.d3Force('collide', d3.forceCollide(4));
    // fg.d3Force('box', () => {
    //   const SQUARE_HALF_SIDE = N * 2;

    //   nodes.forEach(node => {
    //     const x = node.x || 0, y = node.y || 0;

    //     // bounce on box walls
    //     if (Math.abs(x) > SQUARE_HALF_SIDE) { node.vx *= -1; }
    //     if (Math.abs(y) > SQUARE_HALF_SIDE) { node.vy *= -1; }
    //   });
    // });

    // // Generate nodes
    // const N = 80;
    // const nodes = [...Array(N).keys()].map(() => ({
    //   // Initial velocity in random direction
    //   vx: (Math.random() * 2) - 1,
    //   vy: (Math.random() * 2) - 1
    // }));

    // setGraphData({ nodes, links: [] });
  }, []);

  // var width = props.size.width;
  //   var options = workflow.nodes
  //     .map((i) => ({ name: i.Title, value: i.id }))
  //     .slice(1, -1);
  //   options = [{ name: "All", value: "All" }].concat(options);
  let options = {};

  var companyOptions = [
    "Relativity6",
    "Neural Metrics",
    "Sensible",
    "Bold Penguin",
    "Heffernan",
    "BTIS",
    "Hawksoft",
  ]
    .map((i) => ({ name: i, value: i }))
    .slice(1, -1);
  companyOptions = [{ name: "All", value: "All" }].concat(companyOptions);
  // eventLogger = (e: MouseEvent, data: Object) => {
  //   console.log('Event: ', e);
  //   console.log('Data: ', data);
  // };
  // console.log(options);
  const { height, width } = useWindowDimensions();
  console.log(width);

  const rootId = "m-1";

  const nodesById = useMemo(() => {
    const nodesById = Object.fromEntries;
    wf.nodes?.map((node) => [node.id, node])();

    // link parent/children
    wf.nodes.forEach((node) => {
      node.collapsed = node.id !== rootId;
      node.childLinks = [];
    });
    wf.links.forEach((link) => nodesById[link.source].childLinks.push(link));

    return nodesById;
  }, [wf]);
  console.log("-------");
  console.log(nodesById);
  const getPrunedTree = useCallback(() => {
    const visibleNodes = [];
    const visibleLinks = [];
    (function traverseTree(node = nodesById[rootId]) {
      visibleNodes.push(node);
      if (node.collapsed) return;
      visibleLinks.push(...node.childLinks);
      node.childLinks
        .map((link) =>
          typeof link.target === "object" ? link.target : nodesById[link.target]
        ) // get child node
        .forEach(traverseTree);
    })();

    return { nodes: visibleNodes, links: visibleLinks };
  }, [nodesById]);

  const [prunedTree, setPrunedTree] = useState(getPrunedTree());

  const handleNodeClick = useCallback((node) => {
    node.collapsed = !node.collapsed; // toggle collapse state
    if (node.Type === "Workflow") {
      // var temp_color = node.color;
      // var temp = wf.nodes.map((n) => ({
      //   ...n,
      //   ...{ color: "rgba(216, 168, 255,0.3)" },
      // }));
      // setWf(
      //   {
      //     nodes: temp,
      //     links: wf.links
      //   }
      // );
      if (!node.collapsed) {
        prunedTree.nodes.map((n) => {
          if (n.id !== node.id && n.Type !== "Master") {
            if (!n.collapsed) {
              // n.collapsed = !n.collapsed;
            }
          }
          if (n.Type === "Master") {
            n.hcolor = "rgba(196, 72, 227,0)";
          } else {
            if (!n.collapsed) {
              // n.collapsed = !n.collapsed;
              n.hcolor = ncolors[n.Type];
            } else {
              n.hcolor = "rgba(196, 72, 227,0.1)";
            }
          }
        });
        prunedTree.links.map((l) => {
          if (!l.target.collapsed) {
            l.hcolor = "rgba(255, 255, 255,1)";
          } else if (l.source.id !== node.id && l.target.id !== node.id) {
            l.hcolor = "rgba(112, 112, 112,0.4)";
          } else {
            l.hcolor = "rgba(255, 255, 255,1)";
            l.textHeight = 4;
            l.textColor = "white";
          }
          if (l.target.id === node.id && l.source.id === "m1") {
            l.hcolor = "rgba(255, 255, 255,1)";
          }
        });
      } else {
        prunedTree.nodes.map((n) => {
          if (n.Type === "Master") {
            n.color = "rgba(196, 72, 227,0)";
          } else {
            n.color = "rgba(196, 72, 227,1)";
          }
          // n.hcolor = "rgba(196, 72, 227,0.1)";
          delete n.hcolor;
        });
        prunedTree.links.map((l) => {
          delete l.hcolor;
        });
      }
      prunedTree.nodes[0].img = "igig100.svg";
      prunedTree.nodes[0].height = 100;
      prunedTree.nodes[0].width = 100;
      delete node.hcolor;
      node.color = "rgba(196, 72, 227,1)";
      node.textColor = "#ffffff";
      // node.weight = 50;
    }

    if (node.Type === "Workflow Implementation") {
      if (!node.collapsed) {
        prunedTree.nodes.map((n) => {
          if (n.Type === "Workflow Implementation" && n.id !== node.id) {
            n.hcolor = "rgba(196, 72, 227,0.1)";
          }
        });
        prunedTree.links.map((l) => {
          if (
            l.target.Type === "Workflow Implementation" &&
            l.target.id !== node.id
          ) {
            l.hcolor = "rgba(112, 112, 112,0.4)";
          } else {
            // l.hcolor = "rgba(255, 255, 255,1)";
            // l.textHeight = 4;
            // l.textColor = "white";
          }
        });
      } else {
      }
    }
    setPrunedTree(getPrunedTree());
    console.log(prunedTree);
    console.log("???");
  }, []);

  var [filterPosition, setFilterPosition] = useState({
    x: 0 + width * 0.03,
    y: 10,
  });
  var [detailPosition, setDetailPosition] = useState({
    x: width - width * 0.25,
    y: 10,
  });
  var [labelPosition, setLabelPosition] = useState({
    x: width - 1.3 * (width / 2),
    y: height - height * 0.3,
  });
  var [zoomValue, setZoomValue] = useState(500);

  var [zoomPosition, setZoomPosition] = useState({
    x: 0 + width * 0.22,
    y: 10,
  });
  const refreshPage = () => {
    window.location.reload();
  };
  if (item.ShortDescription) {
    var ShortDescription = (
      <p className="mb-2 text-muted" style={{ color: "#888" }}>
        {item.id}
        {/* ShortDescription */}
      </p>
    );
  }

  if (item.Description) {
    var Description = (
      <p className="mb-2 text-muted" style={{ color: "#888" }}>
        {item.Description}
      </p>
    );
  }
  if (item.Type) {
    var Type = (
      <div
        style={{
          backgroundImage: "linear-gradient(90deg, #aa51bc, #6145cf)",
          color: "#fff",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        <p style={{ color: "#fff", padding: "5px" }}> {item.Type}</p>
      </div>
    );
  }
  if (item.Workflow) {
    var Workflow = (
      <p
        className="mb-2 "
        style={{ color: "#888" }}
      >{`Workflow: ${item.Workflow}`}</p>
    );
  }
  if (item.Status) {
    var Status = (
      <p
        className="mb-2 "
        style={{ color: "#888" }}
      >{`Status: ${item.Status}`}</p>
    );
  }

  return (
    <div>
      <div>
        <Container style={{ position: "absolute" }}>
          <Draggable
            position={filterPosition}
            onStop={(e, data) => setFilterPosition({ x: data.x, y: data.y })}

            // position={{ x: -500, y: 20 }}
          >
            <Card style={{ margin: "0.8rem" }} className="infoCardFilter">
              {/* <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="tooltip-disabled">
                    Apply filter based on workflow name, type and status
                  </Tooltip>
                }
              > */}
              <Card.Header
                className="infoCardFilterHeader"
                style={{
                  // textAlign: "left",
                  font: "normal normal medium 22px/33px Poppins",
                  letterSpacing: "0px",
                  color: "#CACACA",
                  opacity: "1",
                }}
              >
                Filters
              </Card.Header>

              <Card.Body>
                <Form.Label
                  htmlFor="filterSelect"
                  style={{
                    marginTop: "10px",
                    textAlign: "left",
                    font: "normal normal normal 18px/29px Poppins",
                    letterSpacing: "0px",
                    color: "#CACACA",
                    opacity: "1",
                  }}
                >
                  Workflow Name
                </Form.Label>
                <Multiselect
                  options={[{ name: "All", id: "All" }]} // Options to display in the dropdown
                  // selectedValues={this.companyOptions} // Preselected value to persist in dropdown
                  // onSelect={this.onSelect} // Function will trigger on select event
                  // onRemove={this.onRemove} // Function will trigger on remove event
                  displayValue="namef" // Property name to display in the dropdown options
                />

                <SelectSearch
                  options={options}
                  search
                  filterOptions={fuzzySearch}
                  value={nameFilterValue}
                  onChange={(value) => {
                    console.log(value);
                    setNameFilterValue(value);
                  }}
                  placeholder="Choose Name"
                />

                <br />
                <Form.Label
                  htmlFor="filterSelectType"
                  style={{
                    textAlign: "left",
                    font: "normal normal normal 18px/29px Poppins",
                    letterSpacing: "0px",
                    color: "#CACACA",
                    opacity: "1",
                  }}
                >
                  Workflow Type
                </Form.Label>
                <div style={{ width: "200px" }}>
                  <Form.Select
                    aria-label="Choose Layout"
                    className="layoutOption"
                  >
                    <option>Choose Type</option>
                    <option value="1">NA</option>
                    {/* <option value="2">Partner Type</option>
                      <option value="3">Line of Business</option> */}
                  </Form.Select>{" "}
                </div>
                <br />
                <Form.Label
                  htmlFor="filterSelectType"
                  style={{
                    textAlign: "left",
                    font: "normal normal normal 18px/29px Poppins",
                    letterSpacing: "0px",
                    color: "#CACACA",
                    opacity: "1",
                  }}
                >
                  Workflow Status
                </Form.Label>
                <div style={{ width: "200px" }}>
                  <Form.Control
                    aria-label="Choose Layout"
                    className="layoutOption"
                    as="select"
                    value={statusFilterValue}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value !== statusFilterValue) {
                        setStatusFilterValue(value);
                      }
                    }}
                  >
                    {/* <option>Choose Status</option> */}
                    <option value="All">All</option>
                    <option value="Live">Live</option>
                    <option value="Testing">Testing</option>
                    <option value="Introduced">Introduced</option>
                  </Form.Control>{" "}
                </div>
                <br />
                <Form.Label
                  htmlFor="filterSelect"
                  style={{
                    // marginTop: "10px",
                    textAlign: "left",
                    font: "normal normal normal 18px/29px Poppins",
                    letterSpacing: "0px",
                    color: "#CACACA",
                    opacity: "1",
                  }}
                >
                  Partner Name
                </Form.Label>
                <Multiselect
                  options={companyOptions} // Options to display in the dropdown
                  // selectedValues={this.companyOptions} // Preselected value to persist in dropdown
                  // onSelect={this.onSelect} // Function will trigger on select event
                  // onRemove={this.onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />

                <SelectSearch
                  options={companyOptions}
                  search
                  filterOptions={fuzzySearch}
                  value={companyFilterValue}
                  onChange={(value) => {
                    console.log(value);
                    setCompanyFilterValue(value);
                  }}
                  placeholder="Choose Name"
                />

                <Form.Label
                  htmlFor="filterSelect"
                  style={{
                    // marginTop: "10px",
                    textAlign: "left",
                    font: "normal normal normal 18px/29px Poppins",
                    letterSpacing: "0px",
                    color: "#CACACA",
                    opacity: "1",
                  }}
                >
                  Line of Business Type
                </Form.Label>
                <Multiselect
                  options={["NA"]} // Options to display in the dropdown
                  // selectedValues={this.companyOptions} // Preselected value to persist in dropdown
                  // onSelect={this.onSelect} // Function will trigger on select event
                  // onRemove={this.onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />
                <br />
                <Form.Label
                  htmlFor="filterSelect"
                  style={{
                    // marginTop: "10px",
                    textAlign: "left",
                    font: "normal normal normal 18px/29px Poppins",
                    letterSpacing: "0px",
                    color: "#CACACA",
                    opacity: "1",
                  }}
                >
                  Line of Business SubType
                </Form.Label>
                <Multiselect
                  options={["NA"]} // Options to display in the dropdown
                  // selectedValues={this.companyOptions} // Preselected value to persist in dropdown
                  // onSelect={this.onSelect} // Function will trigger on select event
                  // onRemove={this.onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />

                <Form.Label
                  htmlFor="filterSelect"
                  style={{
                    // marginTop: "10px",
                    textAlign: "left",
                    font: "normal normal normal 18px/29px Poppins",
                    letterSpacing: "0px",
                    color: "#CACACA",
                    opacity: "1",
                  }}
                >
                  Insurance Value Chain Type
                </Form.Label>
                <Multiselect
                  options={["NA"]} // Options to display in the dropdown
                  // selectedValues={this.companyOptions} // Preselected value to persist in dropdown
                  // onSelect={this.onSelect} // Function will trigger on select event
                  // onRemove={this.onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />
                <Form.Label
                  htmlFor="filterSelect"
                  style={{
                    // marginTop: "10px",
                    textAlign: "left",
                    font: "normal normal normal 18px/29px Poppins",
                    letterSpacing: "0px",
                    color: "#CACACA",
                    opacity: "1",
                  }}
                >
                  Technology Type
                </Form.Label>
                <Multiselect
                  options={["NA"]} // Options to display in the dropdown
                  // selectedValues={this.companyOptions} // Preselected value to persist in dropdown
                  // onSelect={this.onSelect} // Function will trigger on select event
                  // onRemove={this.onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />

                <br />
                <Button
                  variant="primary"
                  style={{
                    background:
                      "transparent linear-gradient(90deg, #AA51BC 0%, #6145CF 100%) 0% 0% no-repeat padding-box",
                    borderEadius: "4px",
                    borderColor: "None",
                    width: "100px",
                  }}
                  onClick={() => {
                    var n_f_value = "";
                    var s_f_value = "";
                    var c_f_value = "";

                    if (nameFilterValue == "All") {
                      n_f_value = "";
                    } else {
                      n_f_value = nameFilterValue;
                    }
                    if (statusFilterValue == "All") {
                      s_f_value = "";
                    } else {
                      s_f_value = statusFilterValue;
                    }
                    if (companyFilterValue == "All") {
                      c_f_value = "";
                    } else {
                      c_f_value = companyFilterValue;
                    }
                    // setWf(_.cloneDeep(workflow));
                    // setPrunedTree(getPrunedTree());
                    prunedTree.nodes.map((n) => {
                      if (n.Type === "Maser" || !n.collapsed) {
                      } else {
                        n.hcolor = ncolors[n.Type];
                      }
                    });
                    prunedTree.links.map((l) => {
                      l.hcolor = "rgba(112, 112, 112,1)";
                    });
                    if (nameFilterValue !== "All") {
                      var n = wf.nodes.filter((itm) => {
                        return itm.id === n_f_value || itm.Type !== "Workflow";
                      });

                      var n_id = n.map((n_t) => n_t.id);

                      prunedTree.nodes.map((n) => {
                        if (!n_id.includes(n.id)) {
                          if (n.Type === "Maser" || !n.collapsed) {
                          } else {
                            n.hcolor = ntcolors[n.Type];
                          }
                        }
                      });
                      prunedTree.links.map((l) => {
                        if (
                          !n_id.includes(l.source.id) &&
                          !n_id.includes(l.target.id)
                        ) {
                          l.hcolor = "rgba(112, 112, 112,0.4)";
                        } else {
                          l.hcolor = "rgba(112, 112, 112,1)";
                          l.textHeight = 4;
                          l.textColor = "white";
                        }
                      });
                      // n_id.append()

                      // l = [];
                    }
                    if (statusFilterValue !== "All") {
                      var n_s = wf.nodes.filter((itm) => {
                        return itm.Status === s_f_value;
                      });

                      var n_s_id = n_s.map((n_t) => n_t.id);

                      prunedTree.nodes.map((n) => {
                        if (!n_s_id.includes(n.id)) {
                          if (n.Type === "Maser" || !n.collapsed) {
                          } else {
                            n.hcolor = ntcolors[n.Type];
                          }
                        }
                      });
                      prunedTree.links.map((l) => {
                        if (
                          !n_s_id.includes(l.source.id) &&
                          !n_s_id.includes(l.target.id)
                        ) {
                          l.hcolor = "rgba(112, 112, 112,0.4)";
                        } else {
                          // l.hcolor = "rgba(112, 112, 112,1)";
                          // l.textHeight = 4;
                          // l.textColor = "white";
                        }
                      });
                      // n_id.append()

                      // l = [];
                    }

                    if (companyFilterValue !== "All") {
                      // prunedTree.nodes.map((n) => {
                      //   if (n.collapsed) {
                      //     n.collapsed = !n.collapsed;
                      //   } else {

                      //   };
                      // });
                      // setPrunedTree(getPrunedTree());

                      var company_mapping = {
                        Relativity6: ["w1", "wi-1", "s-1"],
                        "Neural Metrics": ["s-2", "wi-2", "w-1"],
                        Sensible: ["s-3", "wi-3", "w-5"],
                        "Bold Penguin": ["s-4", "wi-4", "w-18"],
                        Heffernan: ["b-1", "b-2", "wi-1", "w-1", "wi-2"],
                        BTIS: ["b-3", "wi-3", "w-5"],
                        Hawksoft: ["b-4", "wi-4", "w-18"],
                      };

                      // prunedTree.nodes.map((n) => {
                      //   if (n.collapsed) {
                      //     n.collapsed = !n.collapsed;
                      //   } else {

                      //   };
                      // });
                      // setPrunedTree(getPrunedTree());

                      var n_c = wf.nodes.filter((itm) => {
                        return company_mapping[c_f_value].includes(itm.id);
                      });

                      var n_c_id = n_c.map((n_t) => n_t.id);

                      prunedTree.nodes.map((n) => {
                        if (!n_c_id.includes(n.id)) {
                          if (n.Type === "Maser") {
                          } else {
                            n.hcolor = ntcolors[n.Type];
                          }
                        }
                      });
                      prunedTree.links.map((l) => {
                        if (
                          !n_c_id.includes(l.source.id) &&
                          !n_c_id.includes(l.target.id)
                        ) {
                          l.hcolor = "rgba(112, 112, 112,0.4)";
                        } else {
                          // l.hcolor = "rgba(112, 112, 112,1)";
                          // l.textHeight = 4;
                          // l.textColor = "white";
                        }
                      });
                      // n_id.append()

                      // l = [];
                    }

                    setPrunedTree(getPrunedTree());
                    // setPrunedTree(getPrunedTree());

                    console.log(wf);
                  }}
                >
                  Filter
                </Button>
                <Button
                  variant="primary"
                  style={{
                    background:
                      "transparent linear-gradient(90deg, #AA51BC 0%, #6145CF 100%) 0% 0% no-repeat padding-box",
                    borderEadius: "4px",
                    borderColor: "None",
                    width: "100px",
                    marginLeft: "10px",
                  }}
                  onClick={refreshPage}
                >
                  Reset
                </Button>

                {/* <Card.Title>Filters</Card.Title>
                    
                    <Card.Subtitle className="mb-2 text-muted">
                      Card Subtitle
                    </Card.Subtitle>
                    <Card.Text>
                      Some quick example text to build on the card title and make
                      up the bulk of the card's content.
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
              {/* </OverlayTrigger> */}
            </Card>
          </Draggable>{" "}
        </Container>
        <Container style={{ position: "absolute" }}>
          <Draggable
            position={detailPosition}
            onStop={(e, data) => setDetailPosition({ x: data.x, y: data.y })}
          >
            {/* <OverlayTrigger
                  placement="left"
                  overlay={<Tooltip id="tooltip-disabled">Details about selected node</Tooltip>}
                > */}
            <Card
              style={{ width: "20%", margin: "0.8rem" }}
              className="infoCardDetails"
            >
              <Card.Header className="infoCardDetailsHeader">
                Node Detail
              </Card.Header>
              <Card.Body>
                {Type}
                <Card.Title style={{ color: "white" }}>{item.Title}</Card.Title>
                {Description}
                {ShortDescription}
                {Workflow}
                {Status}
                <br />
                Sequence Number: {item.sequenceNumber || "NA"}
                <br />
                Company SubType: {item.companySubType || "NA"}
                <br />
                Value Chain: {item.valueChain || "NA"}
                <br />
                Value Chain SubType: {item.valueChainSubType || "NA"}
                <br />
                Line Of Business: {item.lineOfBusiness || "NA"}
                <br />
                Line Of Business SubType: {item.lineOfBusinessSubType || "NA"}
                <br />
              </Card.Body>
            </Card>
            {/* </OverlayTrigger> */}
          </Draggable>{" "}
        </Container>
        <Container style={{ position: "absolute", cursor: "move" }}>
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
                  <Tooltip id="tooltip-disabled">
                    Node Type and their color
                  </Tooltip>
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
          </Draggable>{" "}
        </Container>
        <Container style={{ position: "absolute" }}>
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
              {/* <button
                  onClick={() => {
                    containerRef.current?.cameraPosition(200);
                    setZoomValue(zoomValue-50);
                  }}
                >
                  Hello
                </button> */}
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
          </Draggable>{" "}
        </Container>
      </div>
    </div>
  );
}

export default withSizeHOC(KGGraph);
