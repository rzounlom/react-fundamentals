import { Container, Nav, Navbar } from "react-bootstrap";

import ConditionalRendering from "./components/conditional-rendering/ConditionalRendering";
import Counter from "./components/counter/Counter";
import { FC } from "react";
import Input from "./components/input/Input";

// import Example4TodoApp from './components/Example4TodoApp';
// import Example5FetchData from './components/Example5FetchData';
// import Example6ToggleTheme from './components/Example6ToggleTheme';

const App: FC = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#home">React Fundamentals</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#counter">Counter</Nav.Link>
            <Nav.Link href="#toggle-theme">Toggle Theme</Nav.Link>
            <Nav.Link href="#conditional-rendering">
              Conditional Rendering
            </Nav.Link>
            <Nav.Link href="#todo">Todo App</Nav.Link>
            <Nav.Link href="#input">Input State</Nav.Link>
            <Nav.Link href="#fetch">Fetch Data</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <section id="counter" style={styles.section}>
        <Counter />
      </section>
      <section id="toggle-theme" style={styles.section}>
        {/* <Example6ToggleTheme /> */}
      </section>
      <section id="conditional-rendering" style={styles.section}>
        <ConditionalRendering name="John Doe" />
      </section>
      <section id="todo" style={styles.section}>
        {/* <Example4TodoApp /> */}
      </section>
      <section id="input" style={styles.section}>
        <Input />
      </section>
      <section id="fetch" style={styles.section}>
        {/* <Example5FetchData /> */}
      </section>
    </div>
  );
};

const styles = {
  section: {
    height: "75vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "3px solid #ddd",
  },
};

export default App;
