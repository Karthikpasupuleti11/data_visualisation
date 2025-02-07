import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PlusCircle, MinusCircle, Search } from "lucide-react";

export function Array() {
  const [array, setArray] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [index, setIndex] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [foundIndex, setFoundIndex] = useState<number | null>(null);

  const insert = () => {
    if (input && index !== '') {
      const idx = parseInt(index);
      if (idx >= 0 && idx <= array.length) {
        const newArray = [...array];
        newArray.splice(idx, 0, input);
        setArray(newArray);
        setInput('');
        setIndex('');
      }
    }
  };

  const remove = () => {
    if (index !== '') {
      const idx = parseInt(index);
      if (idx >= 0 && idx < array.length) {
        const newArray = [...array];
        newArray.splice(idx, 1);
        setArray(newArray);
        setIndex('');
      }
    }
  };

  const searchElement = () => {
    const idx = array.indexOf(searchValue);
    setFoundIndex(idx);
    setTimeout(() => setFoundIndex(null), 2000);
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
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          placeholder="Enter index"
          type="number"
          min="0"
          className="w-32"
        />
        <Button onClick={insert} className="gap-2">
          <PlusCircle className="h-4 w-4" /> Insert
        </Button>
        <Button onClick={remove} variant="outline" className="gap-2">
          <MinusCircle className="h-4 w-4" /> Remove
        </Button>
      </div>

      <div className="flex gap-2">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search value"
          className="w-32"
        />
        <Button onClick={searchElement} variant="secondary" className="gap-2">
          <Search className="h-4 w-4" /> Search
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto p-2">
        {array.map((item, idx) => (
          <Card
            key={idx}
            className={`min-w-[4rem] h-16 flex items-center justify-center transition-all duration-300 ${
              idx === foundIndex ? 'bg-primary/10 scale-110' : ''
            }`}
          >
            {item}
          </Card>
        ))}
        {array.length === 0 && (
          <div className="text-muted-foreground">Array is empty</div>
        )}
      </div>
    </div>
  );
}