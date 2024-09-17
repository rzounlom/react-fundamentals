import { Container, Nav, Navbar } from "react-bootstrap";

import { sections } from "../../data/sections";

const MyNavbar: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        {/* Navbar brand */}
        <Navbar.Brand href="#home">React Fundamentals</Navbar.Brand>

        {/* Navbar toggle button for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible section */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {sections.map(({ id, label }) => (
              <Nav.Link key={id} href={`#${id}`} style={{ fontSize: "14px" }}>
                {label}
              </Nav.Link>
            ))}
            {/* <Nav.Link href="#fetch">Fetch Data</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
