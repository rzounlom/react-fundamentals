// src/components/state-examples/StateExamples.tsx
import { Alert, Badge, Button, Card, Form } from "react-bootstrap";
import { FC, useState } from "react";

// Simple state with primitive values
const PrimitiveStateExample: FC = () => {
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Primitive State Values</Card.Title>
        <Card.Text>
          Managing simple data types: numbers, strings, and booleans.
        </Card.Text>

        <div className="row">
          <div className="col-md-4">
            <div className="text-center mb-3">
              <h5>Counter</h5>
              <Badge bg="primary" className="fs-4 mb-2">
                {count}
              </Badge>
              <div className="d-flex gap-2 justify-content-center">
                <Button size="sm" onClick={decrement}>
                  -
                </Button>
                <Button size="sm" onClick={reset}>
                  Reset
                </Button>
                <Button size="sm" onClick={increment}>
                  +
                </Button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="text-center mb-3">
              <h5>Name Input</h5>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="mb-2"
              />
              <Badge bg="info">{name || "No name entered"}</Badge>
            </div>
          </div>

          <div className="col-md-4">
            <div className="text-center mb-3">
              <h5>Toggle State</h5>
              <Badge bg={isActive ? "success" : "secondary"} className="mb-2">
                {isActive ? "Active" : "Inactive"}
              </Badge>
              <div>
                <Button
                  size="sm"
                  onClick={() => setIsActive(!isActive)}
                  variant={isActive ? "outline-success" : "outline-secondary"}
                >
                  Toggle
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

// Object state management
const ObjectStateExample: FC = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field: string, value: string | number) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetUser = () => {
    setUser({
      firstName: "",
      lastName: "",
      age: 0,
      email: "",
    });
  };

  const fullName = `${user.firstName} ${user.lastName}`.trim() || "No name set";

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Object State Management</Card.Title>
        <Card.Text>
          Managing complex objects with multiple properties and nested updates.
        </Card.Text>

        <div className="row">
          <div className="col-md-6">
            <h6>Edit User Information</h6>
            <Form.Group className="mb-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={user.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                placeholder="Enter first name"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={user.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                placeholder="Enter last name"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                value={user.age}
                onChange={(e) =>
                  handleChange("age", parseInt(e.target.value) || 0)
                }
                placeholder="Enter age"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={user.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button onClick={resetUser} variant="outline-secondary" size="sm">
                Reset
              </Button>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "outline-warning" : "outline-primary"}
                size="sm"
              >
                {isEditing ? "Stop Editing" : "Edit Mode"}
              </Button>
            </div>
          </div>

          <div className="col-md-6">
            <h6>Current User State</h6>
            <div className="border rounded p-3">
              <div className="mb-2">
                <strong>Full Name:</strong>{" "}
                <Badge bg="primary">{fullName}</Badge>
              </div>
              <div className="mb-2">
                <strong>Age:</strong>{" "}
                <Badge bg="info">{user.age || "Not set"}</Badge>
              </div>
              <div className="mb-2">
                <strong>Email:</strong>{" "}
                <Badge bg="success">{user.email || "Not set"}</Badge>
              </div>
              <div className="mb-2">
                <strong>Edit Mode:</strong>{" "}
                <Badge bg={isEditing ? "warning" : "secondary"}>
                  {isEditing ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>

            <div className="mt-3">
              <h6>Raw State Object:</h6>
              <pre className="bg-light p-2 rounded small">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

// Array state management
const ArrayStateExample: FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...items];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    setItems(newItems);
  };

  const clearAll = () => {
    setItems([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Array State Management</Card.Title>
        <Card.Text>
          Managing arrays with add, remove, and reorder operations.
        </Card.Text>

        <div className="row">
          <div className="col-md-6">
            <h6>Add New Item</h6>
            <div className="d-flex gap-2 mb-3">
              <Form.Control
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter item and press Enter"
              />
              <Button onClick={addItem} variant="primary">
                Add
              </Button>
            </div>

            <div className="d-flex gap-2 mb-3">
              <Button onClick={clearAll} variant="outline-danger" size="sm">
                Clear All
              </Button>
              <Badge bg="primary">Total Items: {items.length}</Badge>
            </div>
          </div>

          <div className="col-md-6">
            <h6>Item List</h6>
            {items.length === 0 ? (
              <div className="text-center text-muted">
                <p>No items added yet</p>
              </div>
            ) : (
              <div
                className="border rounded p-2"
                style={{ maxHeight: "200px", overflowY: "auto" }}
              >
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center mb-2 p-2 border-bottom"
                  >
                    <span>{item}</span>
                    <div className="d-flex gap-1">
                      {index > 0 && (
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => moveItem(index, index - 1)}
                        >
                          ↑
                        </Button>
                      )}
                      {index < items.length - 1 && (
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => moveItem(index, index + 1)}
                        >
                          ↓
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => removeItem(index)}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

// Complex state with multiple related states
const ComplexStateExample: FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);

    // Reset form
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Complex State Management</Card.Title>
        <Card.Text>
          Managing multiple related states: form data, validation errors, and
          submission status.
        </Card.Text>

        <div className="row">
          <div className="col-md-6">
            <h6>Registration Form</h6>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  isInvalid={!!errors.username}
                  placeholder="Enter username"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  isInvalid={!!errors.email}
                  placeholder="Enter email"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  isInvalid={!!errors.password}
                  placeholder="Enter password"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  isInvalid={!!errors.confirmPassword}
                  placeholder="Confirm password"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                variant={isValid ? "success" : "secondary"}
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </Button>
            </Form>
          </div>

          <div className="col-md-6">
            <h6>Form State</h6>
            <div className="border rounded p-3">
              <div className="mb-2">
                <strong>Form Valid:</strong>{" "}
                <Badge bg={isValid ? "success" : "danger"}>
                  {isValid ? "Valid" : "Invalid"}
                </Badge>
              </div>
              <div className="mb-2">
                <strong>Submitting:</strong>{" "}
                <Badge bg={isSubmitting ? "warning" : "secondary"}>
                  {isSubmitting ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="mb-2">
                <strong>Error Count:</strong>{" "}
                <Badge bg="info">
                  {Object.keys(errors).filter((key) => errors[key]).length}
                </Badge>
              </div>
            </div>

            <div className="mt-3">
              <h6>Current Errors:</h6>
              {Object.keys(errors).filter((key) => errors[key]).length === 0 ? (
                <p className="text-success small">No validation errors</p>
              ) : (
                <ul className="small">
                  {Object.entries(errors)
                    .filter(([_, error]) => error)
                    .map(([field, error]) => (
                      <li key={field} className="text-danger">
                        <strong>{field}:</strong> {error}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

// Main component that demonstrates state management
const StateExamples: FC = () => {
  return (
    <div>
      <h2>State Management Examples</h2>
      <p className="mb-4">
        State management is the core of React applications. It determines how
        data flows through your components and how the UI responds to user
        interactions. Understanding different state patterns is crucial for
        building robust React applications.
      </p>

      <div className="row">
        <div className="col-12">
          <h4>1. Primitive State Values</h4>
          <PrimitiveStateExample />
          <small className="text-muted">
            Managing simple data types like numbers, strings, and booleans.
          </small>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h4>2. Object State Management</h4>
          <ObjectStateExample />
          <small className="text-muted">
            Managing complex objects with multiple properties and nested
            updates.
          </small>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h4>3. Array State Management</h4>
          <ArrayStateExample />
          <small className="text-muted">
            Managing arrays with add, remove, and reorder operations.
          </small>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h4>4. Complex State Management</h4>
          <ComplexStateExample />
          <small className="text-muted">
            Managing multiple related states: form data, validation errors, and
            submission status.
          </small>
        </div>
      </div>

      <div className="mt-4">
        <h4>Key Concepts Demonstrated:</h4>
        <ul>
          <li>
            <strong>Primitive State:</strong> Managing simple data types
            (number, string, boolean)
          </li>
          <li>
            <strong>Object State:</strong> Managing complex objects with
            multiple properties
          </li>
          <li>
            <strong>Array State:</strong> Managing lists with add, remove, and
            reorder operations
          </li>
          <li>
            <strong>Related States:</strong> Managing multiple states that
            depend on each other
          </li>
          <li>
            <strong>State Updates:</strong> Immutable updates using spread
            operator and functional updates
          </li>
        </ul>
      </div>

      <div className="mt-4">
        <h4>Code Structure:</h4>
        <pre className="bg-light p-3 rounded">
          {`// 1. Primitive state
const [count, setCount] = useState(0);
const [name, setName] = useState("");
const [isActive, setIsActive] = useState(false);

// 2. Object state
const [user, setUser] = useState({
  firstName: "",
  lastName: "",
  age: 0,
  email: ""
});

// 3. Array state
const [items, setItems] = useState([]);

// 4. Multiple related states
const [formData, setFormData] = useState({});
const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);

// 5. Immutable updates
const updateUser = (field, value) => {
  setUser(prev => ({
    ...prev,
    [field]: value
  }));
};

// 6. Array operations
const addItem = (newItem) => {
  setItems([...items, newItem]);
};

const removeItem = (index) => {
  setItems(items.filter((_, i) => i !== index));
};

// 7. Complex state logic
const validateForm = () => {
  const newErrors = {};
  // validation logic
  setErrors(newErrors);
  setIsValid(Object.keys(newErrors).length === 0);
};`}
        </pre>
      </div>

      <Alert variant="info" className="mt-4">
        <strong>Important Notes:</strong>
        <ul className="mb-0 mt-2">
          <li>Always use immutable updates - never modify state directly</li>
          <li>Use the spread operator (...) for object and array updates</li>
          <li>Consider using useReducer for complex state logic</li>
          <li>Group related state together in objects when possible</li>
          <li>
            Use functional updates when new state depends on previous state
          </li>
        </ul>
      </Alert>
    </div>
  );
};

export default StateExamples;
