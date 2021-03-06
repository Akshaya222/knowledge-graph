import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { ForceGraph3D } from "react-force-graph";
import SpriteText from "three-spritetext";
import * as THREE from "three";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

const ExpandableGraph = ({
  graphData,
  setItem,
  setPrunedTree,
  prunedTree,
  containerRef,
  show,
  setShow,
}) => {
  const NODE_R = 3;
  const rootId = "m-1";
  const extraRenderers = [new CSS2DRenderer()];

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current
        .d3Force("link")
        .distance((link) => {
          if (link.target.id.includes("workflowId")) {
            // return 80;
            return 80;
          } else {
            return 35;
          }
        })
        .strength((link) => 1);
    }
  });

  const nodesById = useMemo(() => {
    const nodesById = Object.fromEntries(
      graphData.nodes.map((node) => [node.id, node])
    );
    // link parent/children
    graphData.nodes.forEach((node) => {
      node.collapsed = node.id !== rootId;
      node.childLinks = [];
    });
    graphData.links.forEach((link) => {
      nodesById[link.source].childLinks.push(link);
    });

    return nodesById;
  }, [graphData]);

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

  const handleNodeClick = useCallback((node) => {
    let prunedTree = getPrunedTree();
    node.collapsed = !node.collapsed;
    let ans = prunedTree.nodes.filter(
      (n) => n.id.includes("workflowId") && n.collapsed != true
    );
    if (ans.length == 0) {
      prunedTree.nodes = prunedTree.nodes.map((n) => {
        if (n.id.includes("workflowId")) {
          n.renderColor = n.color;
          return n;
        } else {
          return n;
        }
      });
    }
    if (node.id.includes("workflowId")) {
      if (!node.collapsed) {
        prunedTree.nodes = prunedTree.nodes.map((n) => {
          if (n.id.includes("workflowId")) {
            if (!n.collapsed) {
              n.height = 40;
              n.width = 25;
              n.renderColor = n.color;
              return n;
            } else {
              n.renderColor = n.alternativeColor;
              return n;
            }
          } else {
            return n;
          }
        });
      }
    }

    if (node.id.includes("workflowImplementation")) {
      let ansImp = prunedTree.nodes.filter(
        (n) =>
          n.id.includes("workflowImplementation") &&
          n.id.workflowId == node.workflowId &&
          n.collapsed != true
      );
      if (ansImp.length == 0) {
        prunedTree.nodes = prunedTree.nodes.map((n) => {
          if (n.id.includes("workflowImplementation")) {
            n.renderColor = n.color;
            return n;
          } else {
            return n;
          }
        });
      }
    }

    if (node.id.includes("workflowImplementation")) {
      if (!node.collapsed) {
        prunedTree.nodes = prunedTree.nodes.map((n) => {
          if (n.id.includes("workflowImplementation")) {
            if (!n.collapsed) {
              n.renderColor = n.color;
              return n;
            } else {
              if (n.workflowId == node.workflowId) {
                n.renderColor = n.alternativeColor;
              } else {
                n.renderColor = n.color;
              }
              return n;
            }
          } else {
            return n;
          }
        });
      }
    }

    setPrunedTree(getPrunedTree());
  }, []);

  useEffect(() => {
    if (Object.keys(graphData).length != 0) {
      setPrunedTree(getPrunedTree());
    }
  }, []);

  const renderNode = (node) => {
    let imgPath;
    if (node.img) {
      if (node.id == "m-1") {
        imgPath = `imgs/${node.img}`;
      } else {
        imgPath = `imgs/${node.renderImg}`;
      }
      const loader = new THREE.TextureLoader();
      const imgTexture = loader.load(imgPath);
      const material = new THREE.SpriteMaterial({ map: imgTexture });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(node.width, node.height);
      return sprite;
    } else if (node.imgUrl) {
      const nodeEle = document.createElement("div");
      const imgEle = document.createElement("img");
      const p = document.createElement("span");
      nodeEle.style.padding = "20px";
      imgEle.src = node.imgUrl;
      imgEle.style.height = "20px";
      imgEle.style.width = "20px";
      imgEle.style.borderRadius = "5px";
      p.innerText = node.name;
      p.style.fontSize = "18px";
      p.style.marginLeft = "10px";
      nodeEle.appendChild(imgEle);
      nodeEle.appendChild(p);
      nodeEle.className = "child-nodes-div";
      nodeEle.style.borderColor = node.borderColor;
      // nodeEl.className = 'node-label';
      return new CSS2DObject(nodeEle);
    }
  };

  return (
    <ForceGraph3D
      ref={containerRef}
      extraRenderers={extraRenderers}
      dagMode="zin"
      backgroundColor="rgba(211, 158, 255,0)"
      graphData={getPrunedTree()}
      linkDirectionalParticles={2}
      nodeLabel={(node) =>
        `<span style="color: #fff">${node.title || node.name || node.id}</span>`
      }
      linkWidth={1.8}
      d3VelocityDecay={0.3}
      linkResolution={20}
      minZoom={300}
      onNodeDragEnd={(node) => {
        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;
      }}
      nodeRelSize={NODE_R}
      autoPauseRedraw={false}
      showNavInfo={true}
      nodeResolution={20}
      nodeOpacity={0.75}
      nodeVal={(node) => 8 + node.value || 8}
      linkDirectionalParticleSpeed={0.08}
      nodeColor={(node) => {
        return node.renderColor;
      }}
      onNodeHover={(node) => {
        if (node != null) {
          setItem(node);
          setShow(true);
        }
      }}
      onNodeClick={handleNodeClick}
      linkThreeObjectExtend={true}
      linkThreeObject={(link) => {
        // extend link with text sprite
        const sprite = new SpriteText(``);

        sprite.color = "lightgrey";
        if (!link.source.collapsed && link.source.id !== "m-1") {
          sprite.color = "white";
        }
        sprite.textHeight = 1.5;
        return sprite;
      }}
      linkResolution={20}
      linkDirectionalParticleSpeed={0.08}
      linkWidth={1.8}
      // dagLevelDistance={120}
      d3VelocityDecay={0.3}
      linkDirectionalParticles={(link) => {
        return link.target.linkDirectionalParticles || 0;
      }}
      linkDirectionalParticleWidth={(link) => {
        return link.target.linkDirectionalParticleWidth || 0.5;
      }}
      d3VelocityDecay={0.3}
      nodeThreeObjectExtend={true}
      nodeThreeObject={(node, canvasContext, scale) =>
        renderNode(node, canvasContext, scale)
      }
      linkPositionUpdate={(sprite, { start, end }) => {
        const middlePos = Object.assign(
          ...["x", "y", "z"].map((c) => ({
            [c]: start[c] + (end[c] - start[c]) / 2, // calc middle point
          }))
        );

        // Position sprite
        Object.assign(sprite.position, middlePos);
      }}
    />
  );
};

export default ExpandableGraph;
