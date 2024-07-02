import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: number;
  x: number;
  y: number;
}

const AnimatedBackground = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);

    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  useEffect(() => {
    const generateNodes = (): Node[] => {
      return Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
      }));
    };

    setNodes(generateNodes());
  }, [windowSize]);

  const drawLine = (start: Node, end: Node) => {
    const distance = Math.hypot(end.x - start.x, end.y - start.y);
    if (distance < 200) {
      return (
        <motion.line
          key={`${start.id}-${end.id}`}
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      );
    }
    return null;
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-blue-900">
      <svg width={windowSize.width} height={windowSize.height}>
        {nodes.map((node, i) =>
          nodes.slice(i + 1).map((otherNode) => drawLine(node, otherNode))
        )}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={2}
            fill="white"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        ))}
      </svg>
    </div>
  );
};

export default AnimatedBackground;