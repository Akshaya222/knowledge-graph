import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { ForceGraph3D } from "react-force-graph";
import SpriteText from "three-spritetext";

const ExpandableGraph = ({ graphData, setItem }) => {
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

  const [prunedTree, setPrunedTree] = useState(getPrunedTree());

  const handleNodeClick = useCallback((node) => {
    node.collapsed = !node.collapsed; // toggle collapse state
    setPrunedTree(getPrunedTree());
  }, []);

  return (
    <ForceGraph3D
      dagMode="zin"
      graphData={getPrunedTree()}
      linkDirectionalParticles={2}
      nodeLabel="id"
      nodeColor={
        (node) =>
          node.id.includes("workflowId")
            ? "blue"
            : node.id.includes("workflowImplementationId")
            ? "yellow"
            : node.id.includes("sellerId")
            ? "green"
            : "red"
        // !node.childLinks.length ? "green" : node.collapsed ? "red" : "yellow"
      }
      onNodeHover={(node) => {
        if (node != null) {
          setItem(node);
        }
      }}
      onNodeClick={handleNodeClick}
      // nodeRelSize={7}
      // nodeResolution={20}
      linkThreeObjectExtend={true}
      linkThreeObject={(link) => {
        // extend link with text sprite
        const sprite = new SpriteText(``);
        sprite.color = "lightgrey";
        sprite.textHeight = 1.5;
        return sprite;
      }}
      // nodeThreeObject={(node, canvasContext, scale) => {
      //   if (node.id == "m-1") {
      //     const imgTexture = new THREE.TextureLoader().load(
      //       `/imgs/${node.img}`
      //     );
      //     const material = new THREE.SpriteMaterial({ map: imgTexture });
      //     const sprite = new THREE.Sprite(material);
      //     sprite.scale.set(12, 12);
      //     return sprite;
      //   }
      // }}
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
