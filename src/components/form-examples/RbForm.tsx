import { Button, Form } from "react-bootstrap";
// src/components/FormExample.tsx
import React, { useState } from "react";

const FormExample: React.FC = () => {
  // Using useState to manage form input values for each field
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Event handler to update state when an input field changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log({ eventObject: event, targetObject: event.target });
    // Access the name of the field and its value from the event object
    const { name, value } = event.target;

    // Update the state using the input's name to target the specific field
    setFormData({
      ...formData, // Keep the previous form data
      [name]: value, // Update the specific field that triggered the change
    });
  };

  // Event handler for form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission behavior (which would reload the page)
    event.preventDefault();

    // Log the form data (in a real app, you'd typically send this data to a server)
    console.log("Form submitted with data:", formData);

    // Reset the form data
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <h2>React-bootstrap Form Example</h2>

      {/* The form element, with an onSubmit handler */}
      <Form onSubmit={handleSubmit}>
        {/* Name Input */}
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name" // Name attribute links the input to the state object
            value={formData.name} // Value is controlled by React state
            onChange={handleChange} // Calls handleChange whenever user types
            placeholder="Enter your name"
            required
          />
        </Form.Group>

        {/* Email Input */}
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email" // Name attribute links the input to the state object
            value={formData.email} // Value is controlled by React state
            onChange={handleChange} // Calls handleChange whenever user types
            placeholder="Enter your email"
            required
          />
        </Form.Group>

        {/* Password Input */}
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password" // Name attribute links the input to the state object
            value={formData.password} // Value is controlled by React state
            onChange={handleChange} // Calls handleChange whenever user types
            placeholder="Password"
            required
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default FormExample;
