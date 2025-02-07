import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PlusCircle, MinusCircle, ArrowRight } from "lucide-react";

interface Node {
  id: string;
  x: number;
  y: number;
}

interface Edge {
  from: string;
  to: string;
}

export function Graph() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [nodeInput, setNodeInput] = useState('');
  const [fromNode, setFromNode] = useState('');
  const [toNode, setToNode] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const addNode = () => {
    if (nodeInput) {
      const newNode: Node = {
        id: nodeInput,
        x: Math.random() * 300 + 50,
        y: Math.random() * 300 + 50,
      };
      setNodes([...nodes, newNode]);
      setNodeInput('');
    }
  };

  const addEdge = () => {
    if (fromNode && toNode) {
      setEdges([...edges, { from: fromNode, to: toNode }]);
      setFromNode('');
      setToNode('');
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    edges.forEach(edge => {
      const fromNode = nodes.find(n => n.id === edge.from);
      const toNode = nodes.find(n => n.id === edge.to);
      if (fromNode && toNode) {
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = '#888';
        ctx.stroke();
      }
    });

    // Draw nodes
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.stroke();
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.id, node.x, node.y);
    });
  }, [nodes, edges]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={nodeInput}
          onChange={(e) => setNodeInput(e.target.value)}
          placeholder="Node value"
          className="w-32"
        />
        <Button onClick={addNode} className="gap-2">
          <PlusCircle className="h-4 w-4" /> Add Node
        </Button>
      </div>

      <div className="flex gap-2">
        <Input
          value={fromNode}
          onChange={(e) => setFromNode(e.target.value)}
          placeholder="From node"
          className="w-32"
        />
        <Input
          value={toNode}
          onChange={(e) => setToNode(e.target.value)}
          placeholder="To node"
          className="w-32"
        />
        <Button onClick={addEdge} className="gap-2">
          <ArrowRight className="h-4 w-4" /> Add Edge
        </Button>
      </div>

      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border rounded-lg bg-white"
      />
    </div>
  );
}