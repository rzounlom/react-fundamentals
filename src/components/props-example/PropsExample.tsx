import { Badge, Button, Card } from "react-bootstrap";

// src/components/props-example/PropsExample.tsx
import { FC } from "react";

// Simple props interface - just a name
interface SimpleCardProps {
  name: string;
}

// Basic props interface - name, age, email
interface BasicCardProps {
  name: string;
  age: number;
  email: string;
}

// Define the props interface for our component
interface UserCardProps {
  name: string;
  age: number;
  email: string;
  isActive: boolean;
  skills: string[];
  onContact?: (email: string) => void;
  children?: React.ReactNode;
}

// Simple component with just one prop
const SimpleCard: FC<SimpleCardProps> = ({ name }) => {
  return (
    <Card className="mb-3" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Hello, {name}!</Card.Title>
        <Card.Text>This is a simple card with just a name prop.</Card.Text>
      </Card.Body>
    </Card>
  );
};

// Basic component with three props
const BasicCard: FC<BasicCardProps> = ({ name, age, email }) => {
  return (
    <Card className="mb-3" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          <strong>Age:</strong> {age} years old
          <br />
          <strong>Email:</strong> {email}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

// Component that receives props
const UserCard: FC<UserCardProps> = ({
  name,
  age,
  email,
  isActive,
  skills,
  onContact,
  children,
}) => {
  return (
    <Card className="mb-3" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          <strong>Age:</strong> {age} years old
          <br />
          <strong>Email:</strong> {email}
          <br />
          <strong>Status:</strong>{" "}
          <Badge bg={isActive ? "success" : "secondary"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </Card.Text>

        <div>
          <strong>Skills:</strong>
          <div className="mt-2">
            {skills.map((skill, index) => (
              <Badge key={index} bg="info" className="me-1">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {onContact && (
          <Button
            variant="primary"
            className="mt-3"
            onClick={() => onContact(email)}
          >
            Contact {name}
          </Button>
        )}

        {children && <div className="mt-3">{children}</div>}
      </Card.Body>
    </Card>
  );
};

// Main component that demonstrates props usage
const PropsExample: FC = () => {
  const handleContact = (email: string) => {
    alert(`Contacting ${email}`);
  };

  return (
    <div>
      <h2>Props Example</h2>
      <p className="mb-4">
        Props (properties) are a way to pass data from parent components to
        child components. They are read-only and help make components reusable.
      </p>

      <div className="mb-4">
        <h4>1. Simple Props - Just One Prop</h4>
        <div className="row">
          <div className="col-md-6">
            <SimpleCard name="Alice" />
          </div>
          <div className="col-md-6">
            <SimpleCard name="Bob" />
          </div>
        </div>
        <small className="text-muted">
          This component only accepts a <code>name</code> prop - the simplest
          form of props.
        </small>
      </div>

      <div className="mb-4">
        <h4>2. Basic Props - Three Props</h4>
        <div className="row">
          <div className="col-md-6">
            <BasicCard name="Charlie" age={28} email="charlie@example.com" />
          </div>
          <div className="col-md-6">
            <BasicCard name="Diana" age={32} email="diana@example.com" />
          </div>
        </div>
        <small className="text-muted">
          This component accepts <code>name</code>, <code>age</code>, and{" "}
          <code>email</code> props.
        </small>
      </div>

      <div className="mb-4">
        <h4>3. Advanced Props - Multiple Types</h4>
        <div className="col-md-6">
          <h5>User Card with All Props</h5>
          <UserCard
            name="John Doe"
            age={25}
            email="john.doe@example.com"
            isActive={true}
            skills={["React", "TypeScript", "JavaScript"]}
            onContact={handleContact}
          >
            <small className="text-muted">
              This is additional content passed as children prop!
            </small>
          </UserCard>
        </div>

        <div className="col-md-6">
          <h5>User Card with Minimal Props</h5>
          <UserCard
            name="Jane Smith"
            age={30}
            email="jane.smith@example.com"
            isActive={false}
            skills={["Python", "Django"]}
          />
        </div>
      </div>
      <small className="text-muted">
        This component demonstrates advanced props including arrays, booleans,
        functions, and children.
      </small>

      <div className="mt-4">
        <h4>Key Concepts Demonstrated:</h4>
        <ul>
          <li>
            <strong>Type Safety:</strong> Props are typed with TypeScript
            interfaces
          </li>
          <li>
            <strong>Required vs Optional:</strong> Some props are required
            (name, age, email, isActive, skills), others are optional
            (onContact, children)
          </li>
          <li>
            <strong>Different Data Types:</strong> String, number, boolean,
            array, function, and React nodes
          </li>
          <li>
            <strong>Children Prop:</strong> Special prop for passing JSX content
          </li>
          <li>
            <strong>Function Props:</strong> Passing callbacks from parent to
            child
          </li>
        </ul>
      </div>

      <div className="mt-4">
        <h4>Code Structure:</h4>
        <pre className="bg-light p-3 rounded">
          {`// 1. Define props interface
interface UserCardProps {
  name: string;           // Required string prop
  age: number;           // Required number prop
  email: string;         // Required string prop
  isActive: boolean;     // Required boolean prop
  skills: string[];      // Required array prop
  onContact?: (email: string) => void;  // Optional function prop
  children?: React.ReactNode;           // Optional children prop
}

// 2. Use props in component
const UserCard: FC<UserCardProps> = ({ name, age, email, ... }) => {
  // Component logic here
}

// 3. Pass props from parent
<UserCard
  name="John Doe"
  age={25}
  email="john@example.com"
  isActive={true}
  skills={["React", "TypeScript"]}
  onContact={handleContact}
>
  Additional content
</UserCard>`}
        </pre>
      </div>
    </div>
  );
};

export default PropsExample;
