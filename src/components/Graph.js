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

const ExpandableGraph = ({
  graphData,
  setItem,
  setPrunedTree,
  prunedTree,
  containerRef,
}) => {
  const NODE_R = 3;
  const rootId = "m-1";
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
    node.collapsed = !node.collapsed; // toggle collapse state
    setPrunedTree(getPrunedTree());
  }, []);

  const renderNode = (node) => {
    if (node.img) {
      console.log(node.img);
      const loader = new THREE.TextureLoader();
      const imgTexture = loader.load(`/imgs/${node.img}`);
      const material = new THREE.SpriteMaterial({ map: imgTexture });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(node.width, node.height);
      return sprite;
    }
  };

  return (
    <ForceGraph3D
      dagMode="zin"
      graphData={getPrunedTree()}
      ref={containerRef}
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
      nodeColor={
        (node) =>
          node.id.includes("workflowId")
            ? "blue"
            : node.id.includes("workflowImplementationId")
            ? "#d27dfa"
            : node.id.includes("sellerId")
            ? "red"
            : node.id.includes("buyer")
            ? "green"
            : "rgba(119, 1, 216,0.0)"
        // !node.childLinks.length ? "green" : node.collapsed ? "red" : "yellow"
      }
      onNodeHover={(node) => {
        if (node != null) {
          setItem(node);
        }
      }}
      onNodeClick={handleNodeClick}
      linkThreeObjectExtend={true}
      linkThreeObject={(link) => {
        // extend link with text sprite
        const sprite = new SpriteText(``);
        sprite.color = "lightgrey";
        sprite.textHeight = 1.5;
        return sprite;
      }}
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
