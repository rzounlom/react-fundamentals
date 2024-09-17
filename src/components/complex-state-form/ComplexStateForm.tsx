import { Button, Col, Form, Row } from "react-bootstrap";
import { ChangeEvent, FC, FormEvent, useState } from "react";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
}

const ComplexStateForm: FC = () => {
  // State with 5 key/value pairs to represent a user profile
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
  });

  // A single event handler to manage changes for all fields
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target; // Get the field's name and value

    // Update the state dynamically based on the field being changed
    setProfile((prevProfile) => ({
      ...prevProfile, // Keep the other fields unchanged
      [name]: value, // Update only the field that changed
    }));
  };

  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Log the entire profile to the console (or handle it with an API request)
    console.log("Updated Profile:", profile);
  };

  return (
    <div>
      <h2>Complex Form State Example</h2>

      {/* The form element with onSubmit handler */}
      <Form onSubmit={handleSubmit}>
        {/* First Name and Last Name on the same row */}
        <Row>
          <Col md={6}>
            <Form.Group controlId="formFirstName" className="mb-3">
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
            <Form.Group controlId="formLastName" className="mb-3">
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

        {/* Email and Phone Number on the same row */}
        <Row>
          <Col md={6}>
            <Form.Group controlId="formEmail" className="mb-3">
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
            <Form.Group controlId="formPhoneNumber" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Bio (on its own row) */}
        <Form.Group controlId="formBio" className="mb-3">
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

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ComplexStateForm;
