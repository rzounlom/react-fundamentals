// src/components/Example6ToggleTheme.tsx
import { FC, useState } from "react";

import { Button } from "react-bootstrap";

const ToggleTheme: FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // styles for the component --> need to devine within the component to have access to the state
  const themeStyles = {
    display: "flex",
    "flex-direction": "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: darkMode ? "#333" : "#fff",
    color: darkMode ? "#fff" : "#000",
    padding: "20px",
    borderRadius: "5px",
  };

  return (
    <div style={themeStyles}>
      <h1>Toggle Theme Example</h1>
      <Button onClick={toggleTheme} style={{ marginTop: "20px" }}>
        Toggle to {darkMode ? "Light" : "Dark"} Mode
      </Button>
    </div>
  );
};

export default ToggleTheme;
