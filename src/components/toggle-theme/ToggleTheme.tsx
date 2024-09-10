// src/components/Example6ToggleTheme.tsx
import { FC, useState } from "react";

import { Button } from "react-bootstrap";

const ToggleTheme: FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const themeStyles = {
    backgroundColor: darkMode ? "#333" : "#fff",
    color: darkMode ? "#fff" : "#000",
    padding: "20px",
    borderRadius: "5px",
  };

  return (
    <div style={themeStyles}>
      <h2>Toggle Theme Example</h2>
      <Button onClick={toggleTheme}>
        Toggle to {darkMode ? "Light" : "Dark"} Mode
      </Button>
    </div>
  );
};

export default ToggleTheme;
