// src/components/FormExample.tsx
import React, { useState } from "react";

const BasicForm: React.FC = () => {
  // Using useState to manage form input values for each field
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Event handler to update state when an input field changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log({
      eventObject: event,
      targetObject: event.target,
      inputName: event.target.name,
      inputValue: event.target.value,
    });
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

  console.log({ formData });

  return (
    <div>
      <h2>Basic Form Example</h2>

      {/* The form element, with an onSubmit handler */}
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-3">
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name" // Name attribute links the input to the state object
            value={formData.name} // Value is controlled by React state
            onChange={handleChange} // Calls handleChange whenever user types
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-3">
          <label>Email address</label>
          <br />
          <input
            type="email"
            name="email" // Name attribute links the input to the state object
            value={formData.email} // Value is controlled by React state
            onChange={handleChange} // Calls handleChange whenever user types
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-3">
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password" // Name attribute links the input to the state object
            value={formData.password} // Value is controlled by React state
            onChange={handleChange} // Calls handleChange whenever user types
            placeholder="Password"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BasicForm;
