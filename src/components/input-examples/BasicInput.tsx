// src/components/Example2InputState.tsx
import { FC, useState } from "react";

const BasicInput: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  // Updates state as user types in input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h2>Controlled Basic Input Example</h2>
      <form>
        <label>Enter Text</label>
        <br />
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Type something..."
        />
      </form>
      <p>Current Input: {inputValue}</p>
    </div>
  );
};

export default BasicInput;
