import { Alert, Badge, Button, Card } from "react-bootstrap";
// src/components/counter/Counter.tsx
import { FC, useState } from "react";

// Simple counter component with basic state
const SimpleCounter: FC = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Simple Counter</Card.Title>
        <Card.Text>
          <strong>Current Count:</strong>{" "}
          <Badge bg="primary" className="fs-6">
            {count}
          </Badge>
        </Card.Text>
        <Button onClick={increment} className="me-2">
          Increment
        </Button>
        <Button onClick={decrement} variant="danger">
          Decrement
        </Button>
      </Card.Body>
    </Card>
  );
};

// Advanced counter with multiple features
const AdvancedCounter: FC = () => {
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);

  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);
  const reset = () => setCount(0);
  const double = () => setCount(count * 2);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Advanced Counter</Card.Title>
        <Card.Text>
          <strong>Current Count:</strong>{" "}
          <Badge
            bg={count > 0 ? "success" : count < 0 ? "danger" : "secondary"}
            className="fs-6"
          >
            {count}
          </Badge>
          <br />
          <strong>Step Size:</strong> {step}
        </Card.Text>

        <div className="mb-3">
          <label className="form-label">Step Size:</label>
          <input
            type="range"
            className="form-range"
            min="1"
            max="10"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            style={{ width: "200px" }}
          />
        </div>

        <div className="d-flex flex-wrap gap-2">
          <Button onClick={decrement} variant="danger">
            -{step}
          </Button>
          <Button onClick={increment} variant="success">
            +{step}
          </Button>
          <Button onClick={double} variant="warning">
            Double
          </Button>
          <Button onClick={reset} variant="secondary">
            Reset
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

// Main counter component that demonstrates useState
const Counter: FC = () => {
  const [count, setCount] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([0]);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  const reset = () => {
    setCount(0);
    setHistory([0]);
  };

  return (
    <div>
      <h2>useState Hook Example</h2>
      <p className="mb-4">
        The <code>useState</code> hook is React's way of adding state to
        functional components. It returns an array with the current state value
        and a function to update it.
      </p>

      <div className="row">
        <div className="col-md-6">
          <h4>1. Simple State Management</h4>
          <SimpleCounter />
          <small className="text-muted">
            Basic useState with a single state variable and simple update
            functions.
          </small>
        </div>

        <div className="col-md-6">
          <h4>2. Advanced State Management</h4>
          <AdvancedCounter />
          <small className="text-muted">
            Multiple state variables, conditional styling, and more complex
            interactions.
          </small>
        </div>
      </div>

      <div className="mt-4">
        <h4>3. State with History Tracking</h4>
        <Card>
          <Card.Body>
            <Card.Title>Counter with History</Card.Title>
            <Card.Text>
              <strong>Current Count:</strong>{" "}
              <Badge bg="primary" className="fs-5">
                {count}
              </Badge>
            </Card.Text>

            <div className="mb-3">
              <Button onClick={increment} className="me-2">
                Increment
              </Button>
              <Button onClick={decrement} variant="danger" className="me-2">
                Decrement
              </Button>
              <Button onClick={reset} variant="secondary">
                Reset
              </Button>
            </div>

            <div>
              <strong>History:</strong>
              <div className="mt-2">
                {history.slice(-5).map((value, index) => (
                  <Badge key={index} bg="light" text="dark" className="me-1">
                    {value}
                  </Badge>
                ))}
                {history.length > 5 && (
                  <span className="text-muted">
                    ... and {history.length - 5} more
                  </span>
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
        <small className="text-muted">
          Demonstrates managing multiple state variables and updating arrays.
        </small>
      </div>

      <div className="mt-4">
        <h4>Key Concepts Demonstrated:</h4>
        <ul>
          <li>
            <strong>useState Hook:</strong> How to declare and use state in
            functional components
          </li>
          <li>
            <strong>State Updates:</strong> Different ways to update state
            (direct value, calculation, array updates)
          </li>
          <li>
            <strong>Multiple State Variables:</strong> Managing multiple pieces
            of state independently
          </li>
          <li>
            <strong>Conditional Rendering:</strong> Using state to conditionally
            style elements
          </li>
          <li>
            <strong>Event Handlers:</strong> Connecting user interactions to
            state updates
          </li>
        </ul>
      </div>

      <div className="mt-4">
        <h4>Code Structure:</h4>
        <pre className="bg-light p-3 rounded">
          {`// 1. Import useState
import { useState } from 'react';

// 2. Declare state variables
const [count, setCount] = useState<number>(0);
const [step, setStep] = useState<number>(1);

// 3. Create update functions
const increment = () => setCount(count + step);
const decrement = () => setCount(count - step);
const reset = () => setCount(0);

// 4. Use state in JSX
return (
  <div>
    <p>Count: {count}</p>
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
  </div>
);`}
        </pre>
      </div>

      <Alert variant="info" className="mt-4">
        <strong>Important Notes:</strong>
        <ul className="mb-0 mt-2">
          <li>
            State updates are asynchronous and may not reflect immediately
          </li>
          <li>
            Always use the setter function to update state, never modify state
            directly
          </li>
          <li>
            useState can hold any type of data: numbers, strings, objects,
            arrays, etc.
          </li>
          <li>Each useState call creates a separate piece of state</li>
        </ul>
      </Alert>
    </div>
  );
};

export default Counter;
