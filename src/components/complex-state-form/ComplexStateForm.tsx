import { Alert, Badge, Button, Card, Col, Form, Row } from "react-bootstrap";
import { ChangeEvent, FC, FormEvent, useState } from "react";

// Simple form with basic object state
const SimpleObjectForm: FC = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Simple form submitted:", user);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Simple Object State</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
        <div className="mt-2">
          <strong>Current State:</strong>
          <div className="mt-1">
            {Object.entries(user).map(([key, value]) => (
              <Badge key={key} bg="light" text="dark" className="me-1">
                {key}: {value || "empty"}
              </Badge>
            ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

// Form with nested object state
const NestedObjectForm: FC = () => {
  const [profile, setProfile] = useState({
    personal: {
      firstName: "",
      lastName: "",
      age: "",
    },
    contact: {
      email: "",
      phone: "",
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [section, field] = name.split(".");

    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Nested form submitted:", profile);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Nested Object State</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="personal.firstName"
                  value={profile.personal.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="personal.lastName"
                  value={profile.personal.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="personal.age"
                  value={profile.personal.age}
                  onChange={handleChange}
                  placeholder="Age"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="contact.email"
                  value={profile.contact.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="contact.phone"
                  value={profile.contact.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" variant="success">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

// Form with array state
const ArrayStateForm: FC = () => {
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [newHobby, setNewHobby] = useState("");

  const addHobby = () => {
    if (newHobby.trim() && !hobbies.includes(newHobby.trim())) {
      setHobbies([...hobbies, newHobby.trim()]);
      setNewHobby("");
    }
  };

  const removeHobby = (index: number) => {
    setHobbies(hobbies.filter((_, i) => i !== index));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Hobbies submitted:", hobbies);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Array State Management</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Add Hobbies</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                placeholder="Enter a hobby"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addHobby())
                }
              />
              <Button
                type="button"
                onClick={addHobby}
                variant="outline-primary"
              >
                Add
              </Button>
            </div>
          </Form.Group>
          <div className="mb-3">
            <strong>Current Hobbies:</strong>
            <div className="mt-2">
              {hobbies.map((hobby, index) => (
                <Badge key={index} bg="info" className="me-2 mb-1">
                  {hobby}
                  <Button
                    size="sm"
                    variant="outline-light"
                    className="ms-2"
                    onClick={() => removeHobby(index)}
                  >
                    ×
                  </Button>
                </Badge>
              ))}
              {hobbies.length === 0 && (
                <span className="text-muted">No hobbies added yet</span>
              )}
            </div>
          </div>
          <Button type="submit" variant="warning">
            Submit Hobbies
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

// Main component that demonstrates complex state management
const ComplexStateForm: FC = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Updated Profile:", profile);
  };

  return (
    <div>
      <h2>Complex State Management Examples</h2>
      <p className="mb-4">
        Complex state management involves handling objects, nested objects, and
        arrays in React. This demonstrates different patterns for managing more
        sophisticated state structures.
      </p>

      <div className="row">
        <div className="col-md-6">
          <h4>1. Simple Object State</h4>
          <SimpleObjectForm />
          <small className="text-muted">
            Basic object state with flat structure and single event handler.
          </small>
        </div>

        <div className="col-md-6">
          <h4>2. Nested Object State</h4>
          <NestedObjectForm />
          <small className="text-muted">
            Complex nested objects with dot notation for field names.
          </small>
        </div>
      </div>

      <div className="mt-4">
        <h4>3. Array State Management</h4>
        <ArrayStateForm />
        <small className="text-muted">
          Managing arrays with add/remove operations and dynamic content.
        </small>
      </div>

      <div className="mt-4">
        <h4>4. Original Complex Form</h4>
        <Card>
          <Card.Body>
            <Card.Title>Classic Complex Form State</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  placeholder="Write a short bio..."
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>

            <div className="mt-3">
              <strong>Current Profile State:</strong>
              <div className="mt-2">
                {Object.entries(profile).map(([key, value]) => (
                  <Badge key={key} bg="light" text="dark" className="me-1">
                    {key}: {value || "empty"}
                  </Badge>
                ))}
              </div>
            </div>
          </Card.Body>
        </Card>
        <small className="text-muted">
          The original example showing complex form state with multiple fields.
        </small>
      </div>

      <div className="mt-4">
        <h4>Key Concepts Demonstrated:</h4>
        <ul>
          <li>
            <strong>Object State:</strong> Managing complex data structures with
            multiple properties
          </li>
          <li>
            <strong>Nested Objects:</strong> Deep state updates using spread
            operator
          </li>
          <li>
            <strong>Array State:</strong> Adding, removing, and updating array
            elements
          </li>
          <li>
            <strong>Dynamic Field Names:</strong> Using bracket notation for
            flexible state updates
          </li>
          <li>
            <strong>State Immutability:</strong> Always creating new objects
            instead of mutating existing ones
          </li>
        </ul>
      </div>

      <div className="mt-4">
        <h4>Code Structure:</h4>
        <pre className="bg-light p-3 rounded">
          {`// 1. Object state
const [user, setUser] = useState({
  name: "",
  email: ""
});

// 2. Update object state
const handleChange = (event) => {
  const { name, value } = event.target;
  setUser(prev => ({
    ...prev,
    [name]: value
  }));
};

// 3. Nested object update
const [profile, setProfile] = useState({
  personal: { firstName: "", lastName: "" },
  contact: { email: "", phone: "" }
});

// 4. Array state
const [items, setItems] = useState([]);

// 5. Add to array
const addItem = (newItem) => {
  setItems([...items, newItem]);
};

// 6. Remove from array
const removeItem = (index) => {
  setItems(items.filter((_, i) => i !== index));
};`}
        </pre>
      </div>

      <Alert variant="info" className="mt-4">
        <strong>Important Notes:</strong>
        <ul className="mb-0 mt-2">
          <li>Always use the spread operator (...) to maintain immutability</li>
          <li>For nested objects, spread each level to avoid mutations</li>
          <li>
            Use functional updates when new state depends on previous state
          </li>
          <li>Consider using useReducer for very complex state logic</li>
          <li>Arrays and objects should be treated as immutable in React</li>
        </ul>
      </Alert>
    </div>
  );
};

export default ComplexStateForm;
