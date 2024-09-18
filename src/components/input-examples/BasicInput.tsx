// src/components/Example2InputState.tsx
import { ChangeEvent, FC, useState } from "react";

const BasicInput: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  // Updates state as user types in input field
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log({ inputValue: e.target.value, inputName: e.target.name });
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
          name="testInput"
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
