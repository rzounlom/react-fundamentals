// src/components/input-examples/BasicInput.tsx
import { Alert, Badge, Card } from "react-bootstrap";
import { ChangeEvent, FC, useState } from "react";

// Simple controlled input
const SimpleInput: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Simple Controlled Input</Card.Title>
        <div className="mb-3">
          <label htmlFor="simpleInput" className="form-label">
            Enter Text
          </label>
          <input
            id="simpleInput"
            type="text"
            className="form-control"
            value={inputValue}
            onChange={handleChange}
            placeholder="Type something..."
          />
        </div>
        <div className="mt-2">
          <strong>Current Value:</strong>{" "}
          <Badge bg="primary">{inputValue || "empty"}</Badge>
        </div>
      </Card.Body>
    </Card>
  );
};

// Input with validation
const ValidatedInput: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Simple email validation
    if (value && !/\S+@\S+\.\S+/.test(value)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Input with Validation</Card.Title>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email Address
          </label>
          <input
            id="emailInput"
            type="email"
            className={`form-control ${
              !isValid && email !== "" ? "is-invalid" : ""
            }`}
            value={email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
          {!isValid && email !== "" && (
            <div className="invalid-feedback">
              Please enter a valid email address.
            </div>
          )}
        </div>
        <div className="mt-2">
          <strong>Status:</strong>{" "}
          <Badge bg={isValid ? "success" : "danger"}>
            {isValid ? "Valid" : "Invalid"}
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );
};

// Input with character counter
const CharacterCounterInput: FC = () => {
  const [text, setText] = useState<string>("");
  const maxLength = 100;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setText(value);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Input with Character Counter</Card.Title>
        <div className="mb-3">
          <label htmlFor="bioTextarea" className="form-label">
            Bio (Max {maxLength} characters)
          </label>
          <textarea
            id="bioTextarea"
            className="form-control"
            value={text}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            rows={3}
          />
        </div>
        <div className="mt-2">
          <strong>Characters:</strong>{" "}
          <Badge bg={text.length > maxLength * 0.8 ? "warning" : "info"}>
            {text.length}/{maxLength}
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );
};

// Main component that demonstrates input handling
const BasicInput: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log({ inputValue: e.target.value, inputName: e.target.name });
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h2>Controlled Input Examples</h2>
      <p className="mb-4">
        Controlled inputs are React components where the input's value is
        controlled by React state. This gives you full control over the input's
        behavior and allows for real-time validation and processing.
      </p>

      <div className="row">
        <div className="col-md-6">
          <h4>1. Simple Controlled Input</h4>
          <SimpleInput />
          <small className="text-muted">
            Basic controlled input with real-time value display.
          </small>
        </div>

        <div className="col-md-6">
          <h4>2. Input with Validation</h4>
          <ValidatedInput />
          <small className="text-muted">
            Real-time validation with visual feedback.
          </small>
        </div>
      </div>

      <div className="mt-4">
        <h4>3. Input with Character Counter</h4>
        <CharacterCounterInput />
        <small className="text-muted">
          Textarea with character limit and counter display.
        </small>
      </div>

      <div className="mt-4">
        <h4>4. Original Basic Input</h4>
        <Card>
          <Card.Body>
            <Card.Title>Classic Controlled Input</Card.Title>
            <div className="mb-3">
              <label htmlFor="originalInput" className="form-label">
                Enter Text
              </label>
              <input
                id="originalInput"
                type="text"
                name="testInput"
                className="form-control"
                value={inputValue}
                onChange={handleChange}
                placeholder="Type something..."
              />
            </div>
            <div className="mt-2">
              <strong>Current Input:</strong>{" "}
              <Badge bg="light" text="dark">
                {inputValue || "empty"}
              </Badge>
            </div>
          </Card.Body>
        </Card>
        <small className="text-muted">
          The original example showing basic controlled input functionality.
        </small>
      </div>

      <div className="mt-4">
        <h4>Key Concepts Demonstrated:</h4>
        <ul>
          <li>
            <strong>Controlled Components:</strong> Input values controlled by
            React state
          </li>
          <li>
            <strong>Real-time Updates:</strong> State updates as user types
          </li>
          <li>
            <strong>Validation:</strong> Client-side validation with immediate
            feedback
          </li>
          <li>
            <strong>Character Limits:</strong> Preventing input beyond specified
            limits
          </li>
          <li>
            <strong>Visual Feedback:</strong> Using badges and colors to show
            state
          </li>
        </ul>
      </div>

      <div className="mt-4">
        <h4>Code Structure:</h4>
        <pre className="bg-light p-3 rounded">
          {`// 1. State for input value
const [inputValue, setInputValue] = useState("");

// 2. Handle input changes
const handleChange = (e) => {
  setInputValue(e.target.value);
};

// 3. Controlled input
<input
  type="text"
  value={inputValue}
  onChange={handleChange}
  placeholder="Type something..."
/>

// 4. Display current value
<p>Current Value: {inputValue}</p>`}
        </pre>
      </div>

      <Alert variant="info" className="mt-4">
        <strong>Important Notes:</strong>
        <ul className="mb-0 mt-2">
          <li>
            Always use controlled inputs in React for predictable behavior
          </li>
          <li>The value prop must always be set to the state value</li>
          <li>onChange handler is required to update the state</li>
          <li>Controlled inputs enable real-time validation and processing</li>
          <li>
            Use different input types (text, email, textarea) for appropriate
            data
          </li>
        </ul>
      </Alert>
    </div>
  );
};

export default BasicInput;
