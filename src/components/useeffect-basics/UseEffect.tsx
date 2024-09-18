import { Button, Container, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";

const UseEffectBasics: React.FC = () => {
  // State to track the counter and fetched data
  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  interface Post {
    id: number;
    userId: number;
    body: string;
    title: string;
  }

  // Effect 1: Update the document title when the count changes
  useEffect(() => {
    document.title = `Count: ${count}`;
    // Explanation:
    // - This effect runs whenever the "count" state changes.
    // - It updates the browser's document title to reflect the current count.
  }, [count]); // Only re-run the effect if "count" changes

  // Effect 2: Fetch data from a placeholder API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );
        const result = await response.json();
        setData(result.map((post: Post) => post.title));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Explanation:
    // - This effect runs only once, when the component mounts (on initial render).
    // - It fetches data from an API and updates the "data" state with the response.
    // - The dependency array is empty, so this effect runs only once.

    return () => {
      // Cleanup function
      // This cleanup function runs when the component is unmounted.
      // It's useful for canceling subscriptions, timers, or API requests.
      console.log("Component unmounted. Cleanup performed.");
    };
  }, []); // Empty dependency array: this effect runs only on mount/unmount

  // Function to increment the count
  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <Container>
      <h2>Understanding useEffect Hook</h2>

      {/* Counter Example */}
      <div>
        <h3>Counter Example:</h3>
        <p>
          Click the button to increment the count. The document title will
          update with the count.
        </p>
        <Button variant="primary" onClick={incrementCount}>
          Increment Count
        </Button>
        <p>Current Count: {count}</p>
      </div>

      <hr />

      {/* Fetch Data Example */}
      <div>
        <h3>Fetching Data Example:</h3>
        <p>
          This demonstrates fetching data when the component is first loaded.
        </p>
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      <hr />

      <p>
        <strong>Note:</strong> The useEffect hook is used for managing side
        effects in React components, such as fetching data, updating the DOM,
        and setting up event listeners. It replaces lifecycle methods like
        componentDidMount, componentDidUpdate, and componentWillUnmount.
      </p>
    </Container>
  );
};

export default UseEffectBasics;
