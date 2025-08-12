// src/components/form-examples/BasicForm.tsx
import { Alert, Badge, Button, Card, Form } from "react-bootstrap";
import React, { useState } from "react";

// Simple form with basic validation
const SimpleForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setFormData({ name: "", email: "" });
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Simple Form with Validation</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

// Advanced form with multiple field types
const AdvancedForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    gender: "",
    interests: [] as string[],
    bio: "",
    newsletter: false,
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = event.target as HTMLInputElement;

    if (type === "checkbox") {
      const checked = (event.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (name === "interests") {
      const checked = (event.target as HTMLInputElement).checked;
      const interest = value;
      setFormData({
        ...formData,
        interests: checked
          ? [...formData.interests, interest]
          : formData.interests.filter((i) => i !== interest),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Advanced form submitted:", formData);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Advanced Form with Multiple Field Types</Card.Title>
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="0"
                  max="120"
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Interests</Form.Label>
            <div>
              {["Reading", "Gaming", "Sports", "Music", "Travel"].map(
                (interest) => (
                  <Form.Check
                    key={interest}
                    inline
                    type="checkbox"
                    name="interests"
                    value={interest}
                    checked={formData.interests.includes(interest)}
                    onChange={handleChange}
                    label={interest}
                  />
                )
              )}
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              rows={3}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              label="Subscribe to newsletter"
            />
          </Form.Group>

          <Button type="submit" variant="success">
            Submit Advanced Form
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

// Main component that demonstrates form handling
const BasicForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted with data:", formData);
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <h2>Form Handling Examples</h2>
      <p className="mb-4">
        Forms in React are controlled components where the component state
        serves as the "single source of truth." This means React controls both
        the rendering and the behavior of the form.
      </p>

      <div className="row">
        <div className="col-md-6">
          <h4>1. Simple Form with Validation</h4>
          <SimpleForm />
          <small className="text-muted">
            Basic form with client-side validation and error handling.
          </small>
        </div>

        <div className="col-md-6">
          <h4>2. Advanced Form with Multiple Field Types</h4>
          <AdvancedForm />
          <small className="text-muted">
            Complex form demonstrating various input types and state management.
          </small>
        </div>
      </div>

      <div className="mt-4">
        <h4>3. Original Basic Form</h4>
        <Card>
          <Card.Body>
            <Card.Title>Classic Controlled Form</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Form>

            <div className="mt-3">
              <strong>Current Form State:</strong>
              <div className="mt-2">
                {Object.entries(formData).map(([key, value]) => (
                  <Badge key={key} bg="light" text="dark" className="me-1">
                    {key}: {value || "empty"}
                  </Badge>
                ))}
              </div>
            </div>
          </Card.Body>
        </Card>
        <small className="text-muted">
          The original example showing basic controlled form inputs.
        </small>
      </div>

      <div className="mt-4">
        <h4>Key Concepts Demonstrated:</h4>
        <ul>
          <li>
            <strong>Controlled Components:</strong> Form inputs controlled by
            React state
          </li>
          <li>
            <strong>Event Handling:</strong> onChange events to update state
          </li>
          <li>
            <strong>Form Submission:</strong> Preventing default behavior and
            handling data
          </li>
          <li>
            <strong>Validation:</strong> Client-side validation with error
            states
          </li>
          <li>
            <strong>Complex State:</strong> Managing multiple form fields and
            different input types
          </li>
        </ul>
      </div>

      <div className="mt-4">
        <h4>Code Structure:</h4>
        <pre className="bg-light p-3 rounded">
          {`// 1. State for form data
const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: ""
});

// 2. Handle input changes
const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData({
    ...formData,
    [name]: value
  });
};

// 3. Handle form submission
const handleSubmit = (event) => {
  event.preventDefault();
  console.log("Form data:", formData);
};

// 4. Controlled input
<input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
/>`}
        </pre>
      </div>

      <Alert variant="info" className="mt-4">
        <strong>Important Notes:</strong>
        <ul className="mb-0 mt-2">
          <li>Always use controlled components for form inputs in React</li>
          <li>Prevent default form submission with event.preventDefault()</li>
          <li>Use the name attribute to identify which field changed</li>
          <li>Spread operator (...) is essential for updating nested state</li>
          <li>
            Consider using form libraries like Formik or React Hook Form for
            complex forms
          </li>
        </ul>
      </Alert>
    </div>
  );
};

export default BasicForm;
