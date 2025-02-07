import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PlusCircle, MinusCircle, Eye } from "lucide-react";

export function Queue() {
  const [queue, setQueue] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const enqueue = () => {
    if (input) {
      setQueue([...queue, input]);
      setInput('');
    }
  };

  const dequeue = () => {
    if (queue.length > 0) {
      const newQueue = [...queue];
      newQueue.shift();
      setQueue(newQueue);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter value"
          className="w-48"
        />
        <Button onClick={enqueue} className="gap-2">
          <PlusCircle className="h-4 w-4" /> Enqueue
        </Button>
        <Button onClick={dequeue} variant="outline" className="gap-2">
          <MinusCircle className="h-4 w-4" /> Dequeue
        </Button>
      </div>

      <div className="flex gap-2">
        {queue.map((item, index) => (
          <Card
            key={index}
            className={`w-24 h-16 flex items-center justify-center transition-all duration-300 ${
              index === 0 ? 'bg-primary/10' : ''
            }`}
          >
            {item}
          </Card>
        ))}
        {queue.length === 0 && (
          <div className="text-muted-foreground">Queue is empty</div>
        )}
      </div>

      {queue.length > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <Eye className="h-4 w-4" />
          Front: {queue[0]}
        </div>
      )}
    </div>
  );
}