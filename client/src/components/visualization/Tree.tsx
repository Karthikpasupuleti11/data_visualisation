import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/useToast";

interface TreeNode {
  value: string;
  id: string;
  children: TreeNode[];
  x?: number;
  y?: number;
}

export function Tree() {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [input, setInput] = useState('');
  const [parentValue, setParentValue] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const calculateNodePositions = (
    node: TreeNode,
    x = 0,
    y = 0,
    level = 0,
    positions: TreeNode[] = []
  ): { positions: TreeNode[]; width: number } => {
    const horizontalSpacing = 120;
    const verticalSpacing = 80;
    let width = 0;
    let childrenTotalWidth = 0;
    let leftmostChild = x;

    for (let i = 0; i < node.children.length; i++) {
      const childResult = calculateNodePositions(
        node.children[i],
        x + childrenTotalWidth,
        y + verticalSpacing,
        level + 1
      );
      childrenTotalWidth += childResult.width;
    }

    if (node.children.length > 0) {
      x = x + (childrenTotalWidth - horizontalSpacing) / 2;
      width = childrenTotalWidth;
    } else {
      width = horizontalSpacing;
    }

    node.x = x;
    node.y = y;
    positions.push(node);

    let currentX = leftmostChild;
    for (let i = 0; i < node.children.length; i++) {
      const childResult = calculateNodePositions(
        node.children[i],
        currentX,
        y + verticalSpacing,
        level + 1,
        positions
      );
      currentX += childResult.width;
    }

    return { positions, width };
  };

  const insert = () => {
    if (!input) {
      toast({
        title: "Error",
        description: "Please enter a value",
        variant: "destructive",
      });
      return;
    }

    const newNode: TreeNode = {
      value: input,
      id: generateId(),
      children: []
    };

    if (!root) {
      setRoot(newNode);
    } else if (parentValue) {
      const insertIntoNode = (node: TreeNode): boolean => {
        if (node.value === parentValue) {
          node.children.push(newNode);
          return true;
        }
        for (const child of node.children) {
          if (insertIntoNode(child)) return true;
        }
        return false;
      };

      const newRoot = JSON.parse(JSON.stringify(root));
      if (insertIntoNode(newRoot)) {
        setRoot(newRoot);
      } else {
        toast({
          title: "Error",
          description: "Parent node not found",
          variant: "destructive",
        });
        return;
      }
    }

    setInput('');
    setParentValue('');
    toast({
      title: "Success",
      description: "Node added successfully",
    });
  };

  const clear = () => {
    setRoot(null);
    toast({
      title: "Success",
      description: "Tree cleared",
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !root) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Update canvas size to match container
    canvas.width = container.offsetWidth;
    canvas.height = 400;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate positions and get all nodes
    const startX = canvas.width / 2;
    const { positions } = calculateNodePositions({ ...root, x: startX, y: 50 });

    // Draw edges
    ctx.lineWidth = 2;
    positions.forEach(node => {
      if (!node.children.length) return;

      node.children.forEach(child => {
        if (node.x === undefined || node.y === undefined ||
            child.x === undefined || child.y === undefined) return;

        ctx.beginPath();
        ctx.moveTo(node.x + 40, node.y + 32);
        
        // Control points for the curve
        const midY = (node.y + child.y + 32) / 2;
        ctx.bezierCurveTo(
          node.x + 40, midY,
          child.x + 40, midY,
          child.x + 40, child.y
        );

        ctx.strokeStyle = 'hsl(var(--primary) / 0.3)';
        ctx.stroke();
      });
    });
  }, [root]);

  const renderNode = (node: TreeNode) => {
    const style = {
      transform: `translate(${node.x}px, ${node.y}px)`,
      position: 'absolute' as const,
      transition: 'all 0.5s ease-in-out',
    };

    return (
      <div key={node.id} style={style}>
        <Card className="w-20 h-16 flex items-center justify-center m-2 bg-background/95 backdrop-blur-sm hover:shadow-lg hover:scale-105 transition-all">
          <span className="font-medium">{node.value}</span>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter value"
          className="w-32"
        />
        <Input
          value={parentValue}
          onChange={(e) => setParentValue(e.target.value)}
          placeholder="Parent value (optional)"
          className="w-48"
        />
        <Button onClick={insert} className="gap-2">
          <PlusCircle className="h-4 w-4" /> Insert
        </Button>
        <Button onClick={clear} variant="outline" className="gap-2">
          <Trash2 className="h-4 w-4" /> Clear
        </Button>
      </div>

      <div 
        ref={containerRef}
        className="relative overflow-hidden p-4 min-h-[400px] bg-card/50 backdrop-blur-sm rounded-lg border"
      >
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
        <div className="relative">
          {root ? (
            calculateNodePositions({ ...root, x: 400, y: 50 }).positions.map(node => renderNode(node))
          ) : (
            <div className="text-muted-foreground text-center py-8">
              Start by adding a root node
            </div>
          )}
        </div>
      </div>
    </div>
  );
}