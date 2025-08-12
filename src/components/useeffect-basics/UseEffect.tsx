import { Alert, Badge, Button, Card, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";

// Simple effect that runs on every render
const SimpleEffect: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }); // No dependency array - runs on every render

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Simple Effect (Runs Every Render)</Card.Title>
        <Card.Text>
          <strong>Current Count:</strong> <Badge bg="primary">{count}</Badge>
          <br />
          <small className="text-muted">
            Check the browser tab title - it updates with every count change!
          </small>
        </Card.Text>
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
      </Card.Body>
    </Card>
  );
};

// Effect with dependency array
const DependentEffect: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    console.log(`Count changed to: ${count}`);
  }, [count]); // Only runs when count changes

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Dependent Effect</Card.Title>
        <Card.Text>
          <strong>Count:</strong> <Badge bg="success">{count}</Badge>
          <br />
          <strong>Name:</strong> {name || "Not set"}
        </Card.Text>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control mb-2"
          />
        </div>
        <Button onClick={() => setCount(count + 1)} className="me-2">
          Increment Count
        </Button>
        <small className="text-muted d-block mt-2">
          Check console - effect only runs when count changes, not when name
          changes
        </small>
      </Card.Body>
    </Card>
  );
};

// Effect with cleanup
const EffectWithCleanup: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(interval);
        console.log("Timer cleaned up!");
      };
    }
  }, [isVisible]);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Effect with Cleanup</Card.Title>
        <Card.Text>
          <strong>Timer:</strong>{" "}
          <Badge bg="warning" text="dark">
            {timer}s
          </Badge>
          <br />
          <strong>Status:</strong>{" "}
          <Badge bg={isVisible ? "success" : "secondary"}>
            {isVisible ? "Running" : "Stopped"}
          </Badge>
        </Card.Text>
        <Button
          onClick={() => setIsVisible(!isVisible)}
          variant={isVisible ? "danger" : "success"}
        >
          {isVisible ? "Stop Timer" : "Start Timer"}
        </Button>
        <small className="text-muted d-block mt-2">
          Cleanup runs when component unmounts or effect re-runs
        </small>
      </Card.Body>
    </Card>
  );
};

// Main component that demonstrates useEffect
const UseEffectBasics: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  interface Post {
    id: number;
    userId: number;
    body: string;
    title: string;
  }

  // Effect that runs only on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=3"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.map((post: Post) => post.title));
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array - runs only on mount

  return (
    <div>
      <h2>useEffect Hook Example</h2>
      <p className="mb-4">
        The <code>useEffect</code> hook lets you perform side effects in
        functional components. It runs after every render and can be controlled
        with dependency arrays.
      </p>

      <div className="row">
        <div className="col-md-6">
          <h4>1. Simple Effect</h4>
          <SimpleEffect />
          <small className="text-muted">
            Runs on every render - no dependency array.
          </small>
        </div>

        <div className="col-md-6">
          <h4>2. Dependent Effect</h4>
          <DependentEffect />
          <small className="text-muted">
            Only runs when specific dependencies change.
          </small>
        </div>
      </div>

      <div className="mt-4">
        <h4>3. Effect with Cleanup</h4>
        <EffectWithCleanup />
        <small className="text-muted">
          Demonstrates cleanup functions for timers, subscriptions, etc.
        </small>
      </div>

      <div className="mt-4">
        <h4>4. Data Fetching Effect</h4>
        <Card>
          <Card.Body>
            <Card.Title>API Data Fetching</Card.Title>
            <Card.Text>
              This effect runs only once when the component mounts to fetch
              data.
            </Card.Text>

            {loading ? (
              <div className="text-center">
                <Spinner animation="border" />
                <p>Loading posts...</p>
              </div>
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
              <div>
                <strong>Posts:</strong>
                <ul className="mt-2">
                  {data.map((title, index) => (
                    <li key={index} className="mb-1">
                      {title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card.Body>
        </Card>
        <small className="text-muted">
          Demonstrates fetching data on component mount with error handling.
        </small>
      </div>

      <div className="mt-4">
        <h4>Key Concepts Demonstrated:</h4>
        <ul>
          <li>
            <strong>Side Effects:</strong> DOM updates, API calls, timers,
            subscriptions
          </li>
          <li>
            <strong>Dependency Arrays:</strong> Control when effects run
          </li>
          <li>
            <strong>Cleanup Functions:</strong> Prevent memory leaks and cancel
            operations
          </li>
          <li>
            <strong>Data Fetching:</strong> Loading states and error handling
          </li>
          <li>
            <strong>Lifecycle Management:</strong> Mount, update, and unmount
            behaviors
          </li>
        </ul>
      </div>

      <div className="mt-4">
        <h4>Code Structure:</h4>
        <pre className="bg-light p-3 rounded">
          {`// 1. Import useEffect
import { useEffect } from 'react';

// 2. Basic effect (runs every render)
useEffect(() => {
  console.log('Effect ran');
});

// 3. Effect with dependencies
useEffect(() => {
  console.log('Count changed:', count);
}, [count]);

// 4. Effect with cleanup
useEffect(() => {
  const timer = setInterval(() => {
    // do something
  }, 1000);
  
  return () => {
    clearInterval(timer); // cleanup
  };
}, []);

// 5. Effect that runs only on mount
useEffect(() => {
  // fetch data
}, []); // empty dependency array`}
        </pre>
      </div>

      <Alert variant="info" className="mt-4">
        <strong>Important Notes:</strong>
        <ul className="mb-0 mt-2">
          <li>Effects run after every render by default</li>
          <li>Always include dependencies that the effect uses</li>
          <li>Use cleanup functions to prevent memory leaks</li>
          <li>Empty dependency array means "run only on mount"</li>
          <li>
            Effects are perfect for data fetching, subscriptions, and DOM
            updates
          </li>
        </ul>
      </Alert>
    </div>
  );
};

export default UseEffectBasics;
