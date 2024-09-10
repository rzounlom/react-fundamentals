// src/components/Example1Counter.tsx
import { FC, useState } from "react";

import { Button } from "react-bootstrap";

const Counter: FC = () => {
  // useState to hold the count value
  const [count, setCount] = useState<number>(0);

  // Function to increment the counter
  const increment = () => setCount(count + 1);

  // Function to decrement the counter
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <h2>Counter Example</h2>
      <p>Current Count: {count}</p>
      <Button onClick={increment} className="me-2">
        Increment
      </Button>
      <Button onClick={decrement} variant="danger">
        Decrement
      </Button>
    </div>
  );
};

export default Counter;
