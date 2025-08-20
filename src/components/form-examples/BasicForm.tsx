// src/components/form-examples/BasicForm.tsx
import { Alert, Badge, Button, Card } from "react-bootstrap";
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

  console.log({ formData });

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Simple Form with Validation</Card.Title>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label">
              Name
            </label>
            <input
              id="nameInput"
              type="text"
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              Email
            </label>
            <input
              id="emailInput"
              type="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <Button type="submit" variant="primary">
            Submit
          </Button>
        </form>
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
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="firstNameInput" className="form-label">
                  First Name
                </label>
                <input
                  id="firstNameInput"
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="lastNameInput" className="form-label">
                  Last Name
                </label>
                <input
                  id="lastNameInput"
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="advancedEmailInput" className="form-label">
              Email
            </label>
            <input
              id="advancedEmailInput"
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="ageInput" className="form-label">
                  Age
                </label>
                <input
                  id="ageInput"
                  type="number"
                  name="age"
                  className="form-control"
                  value={formData.age}
                  onChange={handleChange}
                  min="0"
                  max="120"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="genderSelect" className="form-label">
                  Gender
                </label>
                <select
                  id="genderSelect"
                  name="gender"
                  className="form-select"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Interests</label>
            <div>
              {["Reading", "Gaming", "Sports", "Music", "Travel"].map(
                (interest) => (
                  <div key={interest} className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="interests"
                      id={`interest-${interest}`}
                      value={interest}
                      checked={formData.interests.includes(interest)}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`interest-${interest}`}
                    >
                      {interest}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="bioTextarea" className="form-label">
              Bio
            </label>
            <textarea
              id="bioTextarea"
              name="bio"
              className="form-control"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              rows={3}
            />
          </div>

          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="newsletter"
                id="newsletterCheck"
                checked={formData.newsletter}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="newsletterCheck">
                Subscribe to newsletter
              </label>
            </div>
          </div>

          <Button type="submit" variant="success">
            Submit Advanced Form
          </Button>
        </form>
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
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="originalNameInput" className="form-label">
                  Name
                </label>
                <input
                  id="originalNameInput"
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="originalEmailInput" className="form-label">
                  Email
                </label>
                <input
                  id="originalEmailInput"
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">
                  Password
                </label>
                <input
                  id="passwordInput"
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>

              <Button type="submit" variant="primary">
                Submit
              </Button>
            </form>

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
