import { Container, Nav, Navbar } from "react-bootstrap";

import ComplexStateForm from "./components/complex-state-form/ComplexStateForm";
import ConditionalRendering from "./components/conditional-rendering/ConditionalRendering";
import Counter from "./components/counter/Counter";
import { FC } from "react";
import FormExample from "./components/form-example/FormExample";
import Input from "./components/input/Input";
import TodoApp from "./components/todos/TodoApp";
import ToggleTheme from "./components/toggle-theme/ToggleTheme";

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
            <Nav.Link href="#input">Input State</Nav.Link>
            <Nav.Link href="#form">Form Example</Nav.Link>
            <Nav.Link href="#complex-state">Complex State</Nav.Link>
            <Nav.Link href="#todo-app">Todo App</Nav.Link>
            {/* <Nav.Link href="#fetch">Fetch Data</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>

      <section id="counter" style={styles.section}>
        <Counter />
      </section>
      <section id="toggle-theme" style={styles.section}>
        <ToggleTheme />
      </section>
      <section id="conditional-rendering" style={styles.section}>
        <ConditionalRendering name="John Doe" />
      </section>
      <section id="input" style={styles.section}>
        <Input />
      </section>
      <section id="form" style={styles.section}>
        <FormExample />
      </section>
      <section id="complex-state" style={styles.section}>
        <ComplexStateForm />
      </section>
      <section id="todo-app" style={styles.section}>
        <TodoApp />
      </section>
    </div>
  );
};

// styles for the component
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
