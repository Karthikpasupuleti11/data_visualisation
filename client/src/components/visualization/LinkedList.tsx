import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PlusCircle, MinusCircle, ArrowRight } from "lucide-react";

export function LinkedList() {
  const [list, setList] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const insertAtEnd = () => {
    if (input) {
      setList([...list, input]);
      setInput('');
    }
  };

  const removeFromStart = () => {
    if (list.length > 0) {
      const newList = [...list];
      newList.shift();
      setList(newList);
    }
  };

  const traverse = () => {
    if (list.length === 0) return;
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < list.length) {
        setCurrentIndex(i);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setCurrentIndex(null), 500);
      }
    }, 500);
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
        <Button onClick={insertAtEnd} className="gap-2">
          <PlusCircle className="h-4 w-4" /> Insert at End
        </Button>
        <Button onClick={removeFromStart} variant="outline" className="gap-2">
          <MinusCircle className="h-4 w-4" /> Remove from Start
        </Button>
        <Button onClick={traverse} variant="secondary" className="gap-2">
          <ArrowRight className="h-4 w-4" /> Traverse
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto p-2">
        {list.map((item, index) => (
          <div key={index} className="flex items-center">
            <Card
              className={`w-24 h-16 flex items-center justify-center transition-all duration-300 ${
                index === currentIndex ? 'bg-primary/10 scale-110' : ''
              }`}
            >
              {item}
            </Card>
            {index < list.length - 1 && (
              <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />
            )}
          </div>
        ))}
        {list.length === 0 && (
          <div className="text-muted-foreground">List is empty</div>
        )}
      </div>
    </div>
  );
}