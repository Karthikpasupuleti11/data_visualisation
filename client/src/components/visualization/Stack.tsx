import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowUpCircle, ArrowDownCircle, Eye } from "lucide-react";

export function Stack() {
  const [stack, setStack] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const push = () => {
    if (input) {
      setStack([...stack, input]);
      setInput('');
    }
  };

  const pop = () => {
    if (stack.length > 0) {
      const newStack = [...stack];
      newStack.pop();
      setStack(newStack);
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
        <Button onClick={push} className="gap-2">
          <ArrowUpCircle className="h-4 w-4" /> Push
        </Button>
        <Button onClick={pop} variant="outline" className="gap-2">
          <ArrowDownCircle className="h-4 w-4" /> Pop
        </Button>
      </div>

      <div className="flex flex-col-reverse gap-2 items-center">
        {stack.map((item, index) => (
          <Card
            key={index}
            className={`w-48 p-4 text-center transition-all duration-300 ${
              index === stack.length - 1 ? 'bg-primary/10' : ''
            }`}
          >
            {item}
          </Card>
        ))}
        {stack.length === 0 && (
          <div className="text-muted-foreground">Stack is empty</div>
        )}
      </div>

      {stack.length > 0 && (
        <div className="flex items-center gap-2 justify-center text-sm">
          <Eye className="h-4 w-4" />
          Top: {stack[stack.length - 1]}
        </div>
      )}
    </div>
  );
}