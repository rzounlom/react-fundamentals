// src/components/conditional-rendering/ConditionalRendering.tsx
import { Alert, Badge, Button, Card } from "react-bootstrap";
import { FC, useState } from "react";

// Simple conditional rendering with AND operator
const AndOperatorExample: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>AND Operator (&&)</Card.Title>
        <Card.Text>
          <strong>Status:</strong>{" "}
          <Badge bg={isVisible ? "success" : "secondary"}>
            {isVisible ? "Visible" : "Hidden"}
          </Badge>
        </Card.Text>

        {isVisible && (
          <div className="text-center mb-3">
            <div className="bg-primary text-white p-3 rounded">
              <h5>This content is conditionally rendered!</h5>
              <p className="mb-0">Using the AND operator (&&)</p>
            </div>
          </div>
        )}

        <Button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? "Hide Content" : "Show Content"}
        </Button>
      </Card.Body>
    </Card>
  );
};

// Conditional rendering with ternary operator
const TernaryOperatorExample: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Ternary Operator (? :)</Card.Title>
        <Card.Text>
          <strong>Login Status:</strong>{" "}
          <Badge bg={isLoggedIn ? "success" : "warning"}>
            {isLoggedIn ? "Logged In" : "Not Logged In"}
          </Badge>
        </Card.Text>

        {isLoggedIn ? (
          <div className="text-center mb-3">
            <div className="bg-success text-white p-3 rounded">
              <h5>Welcome back, {username}!</h5>
              <p className="mb-0">You are successfully logged in.</p>
            </div>
          </div>
        ) : (
          <div className="text-center mb-3">
            <div className="bg-warning text-dark p-3 rounded">
              <h5>Please log in</h5>
              <p className="mb-0">You need to authenticate to continue.</p>
            </div>
          </div>
        )}

        <div className="d-flex gap-2">
          <Button onClick={() => setIsLoggedIn(!isLoggedIn)}>
            {isLoggedIn ? "Logout" : "Login"}
          </Button>
          {!isLoggedIn && (
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              style={{ width: "200px" }}
            />
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

// Conditional rendering with multiple conditions
const MultipleConditionsExample: FC = () => {
  const [userType, setUserType] = useState<"guest" | "user" | "admin">("guest");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center mb-3">
          <div className="bg-info text-white p-3 rounded">
            <h5>Loading...</h5>
            <p className="mb-0">Please wait while we fetch your data.</p>
          </div>
        </div>
      );
    }

    switch (userType) {
      case "admin":
        return (
          <div className="text-center mb-3">
            <div className="bg-danger text-white p-3 rounded">
              <h5>Admin Dashboard</h5>
              <p className="mb-0">Full access to all features.</p>
            </div>
          </div>
        );
      case "user":
        return (
          <div className="text-center mb-3">
            <div className="bg-primary text-white p-3 rounded">
              <h5>User Dashboard</h5>
              <p className="mb-0">Standard user access.</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center mb-3">
            <div className="bg-secondary text-white p-3 rounded">
              <h5>Guest Access</h5>
              <p className="mb-0">Limited access. Please sign up.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Multiple Conditions</Card.Title>
        <Card.Text>
          <strong>User Type:</strong>{" "}
          <Badge
            bg={
              userType === "admin"
                ? "danger"
                : userType === "user"
                ? "primary"
                : "secondary"
            }
          >
            {userType.toUpperCase()}
          </Badge>
          <br />
          <strong>Loading:</strong>{" "}
          <Badge bg={isLoading ? "info" : "light"} text="dark">
            {isLoading ? "Yes" : "No"}
          </Badge>
        </Card.Text>

        {renderContent()}

        <div className="d-flex flex-wrap gap-2">
          <Button
            onClick={() => setUserType("guest")}
            variant={userType === "guest" ? "secondary" : "outline-secondary"}
            size="sm"
          >
            Guest
          </Button>
          <Button
            onClick={() => setUserType("user")}
            variant={userType === "user" ? "primary" : "outline-primary"}
            size="sm"
          >
            User
          </Button>
          <Button
            onClick={() => setUserType("admin")}
            variant={userType === "admin" ? "danger" : "outline-danger"}
            size="sm"
          >
            Admin
          </Button>
          <Button
            onClick={() => setIsLoading(!isLoading)}
            variant={isLoading ? "info" : "outline-info"}
            size="sm"
          >
            Toggle Loading
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

// Main component that demonstrates conditional rendering
const ConditionalRendering: FC = () => {
  const [show, setShow] = useState<boolean>(true);
  const [show2, setShow2] = useState<boolean>(true);

  return (
    <div>
      <h2>Conditional Rendering Examples</h2>
      <p className="mb-4">
        Conditional rendering allows you to show or hide components based on
        certain conditions. React provides several ways to implement conditional
        rendering, each with its own use cases.
      </p>

      <div className="row">
        <div className="col-md-6">
          <h4>1. AND Operator (&&)</h4>
          <AndOperatorExample />
          <small className="text-muted">
            Simple show/hide with boolean conditions.
          </small>
        </div>

        <div className="col-md-6">
          <h4>2. Ternary Operator (? :)</h4>
          <TernaryOperatorExample />
          <small className="text-muted">
            Choose between two different components.
          </small>
        </div>
      </div>

      <div className="mt-4">
        <h4>3. Multiple Conditions</h4>
        <MultipleConditionsExample />
        <small className="text-muted">
          Complex conditional logic with switch statements.
        </small>
      </div>

      <div className="mt-4">
        <h4>4. Original Example</h4>
        <Card>
          <Card.Body>
            <Card.Title>Classic Conditional Rendering</Card.Title>
            <Card.Text>Hello! Welcome to React!</Card.Text>

            {show && (
              <div className="text-center mb-3">
                <div className="bg-primary text-white p-3 rounded">
                  <h5>Example 1</h5>
                  <p className="mb-0">
                    Conditional rendering using AND operator
                  </p>
                </div>
              </div>
            )}

            {show2 ? (
              <div className="text-center mb-3">
                <div className="bg-success text-white p-3 rounded">
                  <h5>Example 2</h5>
                  <p className="mb-0">
                    Conditional rendering using ternary operator
                  </p>
                </div>
              </div>
            ) : null}

            <div className="d-flex gap-2">
              <Button onClick={() => setShow(!show)}>
                {show ? "Hide Example1" : "Show Example1"}
              </Button>
              <Button onClick={() => setShow2(!show2)}>
                {show2 ? "Hide Example2" : "Show Example2"}
              </Button>
            </div>
          </Card.Body>
        </Card>
        <small className="text-muted">
          The original example showing basic conditional rendering patterns.
        </small>
      </div>

      <div className="mt-4">
        <h4>Key Concepts Demonstrated:</h4>
        <ul>
          <li>
            <strong>AND Operator (&&):</strong> Simple boolean-based rendering
          </li>
          <li>
            <strong>Ternary Operator (? :):</strong> Choose between two options
          </li>
          <li>
            <strong>Multiple Conditions:</strong> Complex logic with switch
            statements
          </li>
          <li>
            <strong>State-Driven Rendering:</strong> Dynamic content based on
            state
          </li>
          <li>
            <strong>Loading States:</strong> Show different content during async
            operations
          </li>
        </ul>
      </div>

      <div className="mt-4">
        <h4>Code Structure:</h4>
        <pre className="bg-light p-3 rounded">
          {`// 1. AND Operator
{isVisible && <Component />}

// 2. Ternary Operator
{isLoggedIn ? <UserDashboard /> : <LoginForm />}

// 3. Multiple Conditions
const renderContent = () => {
  if (isLoading) return <LoadingSpinner />;
  
  switch (userType) {
    case "admin": return <AdminPanel />;
    case "user": return <UserPanel />;
    default: return <GuestPanel />;
  }
};

// 4. Conditional Classes
<div className={\`card \${isActive ? 'active' : 'inactive'}\`}>
  Content
</div>

// 5. Conditional Styles
<div style={{ 
  display: isVisible ? 'block' : 'none' 
}}>
  Content
</div>`}
        </pre>
      </div>

      <Alert variant="info" className="mt-4">
        <strong>Important Notes:</strong>
        <ul className="mb-0 mt-2">
          <li>Use && for simple show/hide, ? : for choosing between options</li>
          <li>Be careful with falsy values (0, "", false) when using &&</li>
          <li>
            Ternary operators are great for conditional styling and classes
          </li>
          <li>Consider extracting complex logic into separate functions</li>
          <li>
            Conditional rendering is perfect for loading states and user roles
          </li>
        </ul>
      </Alert>
    </div>
  );
};

export default ConditionalRendering;
