import { Alert, Badge, Button, Card, Form } from "react-bootstrap";
import { FC, useState } from "react";

import TodoList from "./TodoList";
import { Todo as TodoType } from "../../types";
import { defaultTodos } from "../../data/todos";

// Simple todo app with basic functionality
const SimpleTodoApp: FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Build a project", completed: true },
  ]);
  const [newTodo, setNewTodo] = useState<string>("");

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: TodoType = {
        id: Date.now(),
        title: newTodo.trim(),
        completed: false,
      };
      setTodos([...todos, todo]);
      setNewTodo("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodo();
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Simple Todo App</Card.Title>
        <div className="d-flex gap-2 mb-3">
          <Form.Control
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a task and press Enter"
          />
          <Button onClick={addTodo} variant="primary">
            Add
          </Button>
        </div>
        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
        <div className="mt-2">
          <strong>Stats:</strong>{" "}
          <Badge bg="primary" className="me-2">
            Total: {todos.length}
          </Badge>
          <Badge bg="success" className="me-2">
            Completed: {todos.filter((t) => t.completed).length}
          </Badge>
          <Badge bg="warning" text="dark">
            Pending: {todos.filter((t) => !t.completed).length}
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );
};

// Advanced todo app with categories and filtering
const AdvancedTodoApp: FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([
    { id: 1, title: "Learn React Hooks", completed: false },
    { id: 2, title: "Build a todo app", completed: true },
    { id: 3, title: "Write documentation", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: TodoType = {
        id: Date.now(),
        title: newTodo.trim(),
        completed: false,
      };
      setTodos([...todos, todo]);
      setNewTodo("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodo();
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Advanced Todo App</Card.Title>
        <div className="d-flex gap-2 mb-3">
          <Form.Control
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a task and press Enter"
          />
          <Button onClick={addTodo} variant="primary">
            Add
          </Button>
        </div>

        <div className="d-flex gap-2 mb-3">
          <Button
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "primary" : "outline-primary"}
            size="sm"
          >
            All ({todos.length})
          </Button>
          <Button
            onClick={() => setFilter("active")}
            variant={filter === "active" ? "warning" : "outline-warning"}
            size="sm"
          >
            Active ({todos.filter((t) => !t.completed).length})
          </Button>
          <Button
            onClick={() => setFilter("completed")}
            variant={filter === "completed" ? "success" : "outline-success"}
            size="sm"
          >
            Completed ({todos.filter((t) => t.completed).length})
          </Button>
          <Button onClick={clearCompleted} variant="outline-danger" size="sm">
            Clear Completed
          </Button>
        </div>

        <TodoList
          todos={filteredTodos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      </Card.Body>
    </Card>
  );
};

// Main component that demonstrates todo functionality
const TodoApp: FC = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoType[]>(defaultTodos);
  const [newTodo, setNewTodo] = useState<string>("");

  const addTodo = () => {
    if (!newTodo.trim()) {
      setShowAlert(true);
      return;
    }
    const todo: TodoType = {
      id: Date.now(),
      title: newTodo.trim(),
      completed: false,
    };
    setTodos([...todos, todo]);
    setNewTodo("");
    setShowAlert(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodo();
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div>
      <h2>Todo App Examples</h2>
      <p className="mb-4">
        Todo apps demonstrate state management, user interactions, and data
        manipulation in React. They showcase how to handle lists, user input,
        and dynamic content updates.
      </p>

      <div className="row">
        <div className="col-md-6">
          <h4>1. Simple Todo App</h4>
          <SimpleTodoApp />
          <small className="text-muted">
            Basic todo functionality with Enter key support and statistics.
          </small>
        </div>

        <div className="col-md-6">
          <h4>2. Advanced Todo App</h4>
          <AdvancedTodoApp />
          <small className="text-muted">
            Advanced features with filtering, clear completed, and better UX.
          </small>
        </div>
      </div>

      <div className="mt-4">
        <h4>3. Original Todo App</h4>
        <Card>
          <Card.Body>
            <Card.Title>Classic Todo App</Card.Title>
            {showAlert && (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>Error!</Alert.Heading>
                <p>Please enter a task before adding it to the list!</p>
              </Alert>
            )}
            <div className="d-flex gap-2 mb-3">
              <Form.Control
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter a task and press Enter"
              />
              <Button onClick={addTodo} variant="primary">
                Add Todo
              </Button>
            </div>
            <TodoList
              todos={todos}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
            <div className="mt-3">
              <strong>Progress:</strong>
              <div className="mt-2">
                <Badge bg="success" className="me-2">
                  Completed: {completedCount}
                </Badge>
                <Badge bg="warning" text="dark" className="me-2">
                  Pending: {pendingCount}
                </Badge>
                <Badge bg="info">Total: {todos.length}</Badge>
              </div>
              {todos.length > 0 && (
                <div className="mt-2">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${(completedCount / todos.length) * 100}%`,
                      }}
                      aria-valuenow={completedCount}
                      aria-valuemin={0}
                      aria-valuemax={todos.length}
                    >
                      {Math.round((completedCount / todos.length) * 100)}%
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
        <small className="text-muted">
          The original example with enhanced functionality and progress
          tracking.
        </small>
      </div>

      <div className="mt-4">
        <h4>Key Concepts Demonstrated:</h4>
        <ul>
          <li>
            <strong>State Management:</strong> Managing arrays of objects with
            CRUD operations
          </li>
          <li>
            <strong>User Input:</strong> Form handling with Enter key support
          </li>
          <li>
            <strong>List Rendering:</strong> Mapping over arrays to render
            components
          </li>
          <li>
            <strong>Event Handling:</strong> Click events, keyboard events, and
            form submission
          </li>
          <li>
            <strong>Conditional Rendering:</strong> Showing different content
            based on todo status
          </li>
        </ul>
      </div>

      <div className="mt-4">
        <h4>Code Structure:</h4>
        <pre className="bg-light p-3 rounded">
          {`// 1. State for todos
const [todos, setTodos] = useState([]);
const [newTodo, setNewTodo] = useState("");

// 2. Add todo function
const addTodo = () => {
  if (newTodo.trim()) {
    const todo = {
      id: Date.now(),
      title: newTodo.trim(),
      completed: false
    };
    setTodos([...todos, todo]);
    setNewTodo("");
  }
};

// 3. Handle Enter key
const handleKeyPress = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTodo();
  }
};

// 4. Toggle completion
const toggleComplete = (id) => {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
};

// 5. Delete todo
const deleteTodo = (id) => {
  setTodos(todos.filter(todo => todo.id !== id));
};

// 6. Render todo list
{todos.map(todo => (
  <TodoItem
    key={todo.id}
    todo={todo}
    onToggle={toggleComplete}
    onDelete={deleteTodo}
  />
))}`}
        </pre>
      </div>

      <Alert variant="info" className="mt-4">
        <strong>Important Notes:</strong>
        <ul className="mb-0 mt-2">
          <li>Always use unique IDs for list items (Date.now() works well)</li>
          <li>Use trim() to remove whitespace from user input</li>
          <li>Implement Enter key support for better UX</li>
          <li>Use immutable state updates with spread operator</li>
          <li>Consider adding validation and error handling</li>
        </ul>
      </Alert>
    </div>
  );
};

export default TodoApp;
