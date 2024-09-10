import { Button } from "react-bootstrap";
import { FC } from "react";
import { Todo as TodoType } from "../../types";

interface TodoProps {
  todo: TodoType;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const Todo: FC<TodoProps> = ({ todo, toggleComplete, deleteTodo }) => {
  const todoSyles = {
    // conditional styling
    todo: {
      textDecoration: todo.completed ? "line-through" : "none",
      color: todo.completed ? "lightgray" : "black",
    },
  };

  return (
    <div style={styles.container}>
      <p style={todoSyles.todo}>{todo?.title}</p>
      <div style={styles.btnGroup}>
        <Button
          style={styles.btn}
          variant="outline-primary"
          onClick={() => toggleComplete(todo.id)}
        >
          {todo.completed ? "Undo" : "Complete"}
        </Button>
        <Button
          style={styles.btn}
          variant="outline-danger"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnGroup: {
    width: "210px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    width: "100px",
  },
};

export default Todo;
