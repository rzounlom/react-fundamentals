// src/components/Example2InputState.tsx
import { FC, useState } from "react";

import { Form } from "react-bootstrap";

const ReactBootstrapInput: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  // Updates state as user types in input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h2>Controlled React-bootstrap Input Example</h2>
      <Form>
        <Form.Group controlId="formBasicInput">
          <Form.Label>Enter Text</Form.Label>
          <Form.Control
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Type something..."
          />
        </Form.Group>
      </Form>
      <p>Current Input: {inputValue}</p>
    </div>
  );
};

export default ReactBootstrapInput;
