import { Button, Form } from "react-bootstrap";
import { FC, useState } from "react";

import Alert from "react-bootstrap/Alert";
import TodoList from "./TodoList";
import { Todo as TodoType } from "../../types";
import { defaultTodos } from "../../data/todos";

const TodoApp: FC = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoType[]>(defaultTodos);
  const [newTodo, setNewTodo] = useState<string>("");

  const addTodo = () => {
    if (!newTodo) {
      setShowAlert(true);
      return;
    }
    const todo: TodoType = {
      id: todos.length + 1,
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const toggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div style={{ width: "550px" }}>
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Please enter a task before adding it to the list! The task cannot be
            empty.
          </p>
        </Alert>
      )}
      <h2>Todo App Example</h2>
      <Form.Control
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a task"
      />
      <Button onClick={addTodo} className="mt-2 mb-2">
        Add Todo
      </Button>
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default TodoApp;
