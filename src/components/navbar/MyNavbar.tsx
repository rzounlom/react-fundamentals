import { Container, Nav, Navbar } from "react-bootstrap";

import { sections } from "../../data/sections";

const MyNavbar: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        {/* Navbar brand */}
        <Navbar.Brand href="#home" className="me-4">
          React Fundamentals
        </Navbar.Brand>

        {/* Navbar toggle button for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible section */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-wrap">
            {sections.map(({ id, label }) => (
              <Nav.Link
                key={id}
                href={`#${id}`}
                className="px-3 py-2 text-nowrap"
                style={{
                  fontSize: "0.9rem",
                  whiteSpace: "nowrap",
                  minWidth: "fit-content",
                }}
              >
                {label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
