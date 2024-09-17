import BasicForm from "../components/form-examples/BasicForm";
import BasicInput from "../components/input-examples/BasicInput";
import ComplexStateForm from "../components/complex-state-form/ComplexStateForm";
import ConditionalRendering from "../components/conditional-rendering/ConditionalRendering";
import Counter from "../components/counter/Counter";
import RbForm from "../components/form-examples/RbForm";
import ReactBootstrapInput from "../components/input-examples/RbInput";
import TodoApp from "../components/todos/TodoApp";
import ToggleTheme from "../components/toggle-theme/ToggleTheme";
import UseEffectBasics from "../components/useeffect-basics/UseEffect";
import UsersApp from "../components/users/UsersApp";

export const sections = [
  { id: "counter", label: "Counter", component: Counter },
  { id: "toggle-theme", label: "Toggle Theme", component: ToggleTheme },
  {
    id: "conditional-rendering",
    label: "Conditional Rendering",
    component: ConditionalRendering,
  },
  { id: "basic-input", label: "Basic Input", component: BasicInput },
  { id: "rb-input", label: "RB Input", component: ReactBootstrapInput },
  { id: "basic-form", label: "Basic Form", component: BasicForm },
  { id: "rb-form", label: "Rb Form", component: RbForm },
  {
    id: "complex-state",
    label: "Complex State Form",
    component: ComplexStateForm,
  },
  {
    id: "useeffect-basics",
    label: "useEffect Basics",
    component: UseEffectBasics,
  },
  { id: "todo-app", label: "Todo App", component: TodoApp },
  { id: "users-app", label: "Users App", component: UsersApp },
];
