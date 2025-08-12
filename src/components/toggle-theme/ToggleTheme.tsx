// src/components/toggle-theme/ToggleTheme.tsx
import { Alert, Badge, Button, Card } from "react-bootstrap";
import { CSSProperties, FC, useState } from "react";

// Simple theme toggle with basic styling
const SimpleThemeToggle: FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const themeStyles: CSSProperties = {
    backgroundColor: isDark ? "#333" : "#fff",
    color: isDark ? "#fff" : "#000",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    transition: "all 0.3s ease",
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Simple Theme Toggle</Card.Title>
        <div style={themeStyles} className="mb-3">
          <h5>Theme Preview</h5>
          <p>This card shows how the theme affects styling.</p>
          <Badge
            bg={isDark ? "light" : "dark"}
            text={isDark ? "dark" : "light"}
          >
            {isDark ? "Dark Mode" : "Light Mode"}
          </Badge>
        </div>
        <Button onClick={() => setIsDark(!isDark)}>
          Toggle to {isDark ? "Light" : "Dark"} Mode
        </Button>
      </Card.Body>
    </Card>
  );
};

// Advanced theme toggle with multiple themes
const AdvancedThemeToggle: FC = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "blue" | "green">(
    "light"
  );

  const themeConfigs = {
    light: { bg: "#fff", text: "#000", accent: "#007bff" },
    dark: { bg: "#333", text: "#fff", accent: "#17a2b8" },
    blue: { bg: "#e3f2fd", text: "#1565c0", accent: "#2196f3" },
    green: { bg: "#e8f5e8", text: "#2e7d32", accent: "#4caf50" },
  };

  const currentTheme = themeConfigs[theme];

  const themeStyles: CSSProperties = {
    backgroundColor: currentTheme.bg,
    color: currentTheme.text,
    padding: "20px",
    borderRadius: "8px",
    border: `2px solid ${currentTheme.accent}`,
    transition: "all 0.3s ease",
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Advanced Theme Toggle</Card.Title>
        <div style={themeStyles} className="mb-3">
          <h5>Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}</h5>
          <p>Multiple theme options with custom colors.</p>
          <Badge
            bg="secondary"
            style={{ backgroundColor: currentTheme.accent }}
          >
            Accent Color
          </Badge>
        </div>
        <div className="d-flex flex-wrap gap-2">
          {Object.keys(themeConfigs).map((themeName) => (
            <Button
              key={themeName}
              onClick={() => setTheme(themeName as any)}
              variant={theme === themeName ? "primary" : "outline-primary"}
              size="sm"
            >
              {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
            </Button>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

// Theme toggle with localStorage persistence
const PersistentThemeToggle: FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme-preference");
    return saved ? JSON.parse(saved) : false;
  });

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme-preference", JSON.stringify(newTheme));
  };

  const themeStyles: CSSProperties = {
    backgroundColor: isDark ? "#1a1a1a" : "#f8f9fa",
    color: isDark ? "#fff" : "#000",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    transition: "all 0.3s ease",
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Persistent Theme Toggle</Card.Title>
        <div style={themeStyles} className="mb-3">
          <h5>Persistent Theme</h5>
          <p>
            This theme preference is saved in localStorage and persists across
            page reloads.
          </p>
          <Badge
            bg={isDark ? "light" : "dark"}
            text={isDark ? "dark" : "light"}
          >
            {isDark ? "Dark Mode" : "Light Mode"}
          </Badge>
        </div>
        <Button onClick={toggleTheme}>
          Toggle to {isDark ? "Light" : "Dark"} Mode
        </Button>
        <small className="text-muted d-block mt-2">
          Try refreshing the page - your preference will be remembered!
        </small>
      </Card.Body>
    </Card>
  );
};

// Main component that demonstrates theme toggling
const ToggleTheme: FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const themeStyles: CSSProperties = {
    backgroundColor: darkMode ? "#333" : "#fff",
    color: darkMode ? "#fff" : "#000",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    transition: "all 0.3s ease",
  };

  return (
    <div>
      <h2>Theme Toggle Examples</h2>
      <p className="mb-4">
        Theme toggling demonstrates how to use state to dynamically change
        styling and create interactive user experiences. It's a common pattern
        in modern web applications.
      </p>

      <div className="row">
        <div className="col-md-6">
          <h4>1. Simple Theme Toggle</h4>
          <SimpleThemeToggle />
          <small className="text-muted">
            Basic theme switching with boolean state and inline styles.
          </small>
        </div>

        <div className="col-md-6">
          <h4>2. Advanced Theme Toggle</h4>
          <AdvancedThemeToggle />
          <small className="text-muted">
            Multiple theme options with custom color configurations.
          </small>
        </div>
      </div>

      <div className="mt-4">
        <h4>3. Persistent Theme Toggle</h4>
        <PersistentThemeToggle />
        <small className="text-muted">
          Theme preference saved in localStorage for persistence across
          sessions.
        </small>
      </div>

      <div className="mt-4">
        <h4>4. Original Example</h4>
        <Card>
          <Card.Body>
            <Card.Title>Classic Theme Toggle</Card.Title>
            <div style={themeStyles} className="mb-3">
              <h5>Toggle Theme Example</h5>
              <p>
                This is the original example with full-screen theme switching.
              </p>
            </div>
            <Button onClick={toggleTheme}>
              Toggle to {darkMode ? "Light" : "Dark"} Mode
            </Button>
          </Card.Body>
        </Card>
        <small className="text-muted">
          The original example demonstrating basic theme switching.
        </small>
      </div>

      <div className="mt-4">
        <h4>Key Concepts Demonstrated:</h4>
        <ul>
          <li>
            <strong>State Management:</strong> Using useState to track theme
            preferences
          </li>
          <li>
            <strong>Dynamic Styling:</strong> Applying styles based on state
            values
          </li>
          <li>
            <strong>Conditional Rendering:</strong> Changing content based on
            theme
          </li>
          <li>
            <strong>CSS Transitions:</strong> Smooth theme switching animations
          </li>
          <li>
            <strong>Data Persistence:</strong> Saving preferences in
            localStorage
          </li>
        </ul>
      </div>

      <div className="mt-4">
        <h4>Code Structure:</h4>
        <pre className="bg-light p-3 rounded">
          {`// 1. State for theme
const [isDark, setIsDark] = useState(false);

// 2. Theme configuration
const themeStyles = {
  backgroundColor: isDark ? "#333" : "#fff",
  color: isDark ? "#fff" : "#000",
  transition: "all 0.3s ease"
};

// 3. Toggle function
const toggleTheme = () => {
  setIsDark(!isDark);
};

// 4. Apply styles in JSX
<div style={themeStyles}>
  <h1>Theme Content</h1>
  <button onClick={toggleTheme}>
    Toggle Theme
  </button>
</div>`}
        </pre>
      </div>

      <Alert variant="info" className="mt-4">
        <strong>Important Notes:</strong>
        <ul className="mb-0 mt-2">
          <li>Use CSS transitions for smooth theme switching</li>
          <li>Consider accessibility with proper contrast ratios</li>
          <li>localStorage is great for persisting user preferences</li>
          <li>Theme state can be lifted up to context for app-wide theming</li>
          <li>
            CSS custom properties (variables) work well with theme switching
          </li>
        </ul>
      </Alert>
    </div>
  );
};

export default ToggleTheme;
