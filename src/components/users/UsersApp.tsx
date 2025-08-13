import { Alert, Badge, Button, Card, Form } from "react-bootstrap";
import { FC, useState } from "react";
import { NewUser, User } from "../../types";

import AddUserModal from "./AddUserModal";
import UserList from "./UserList";
import { users as defaultUsers } from "../../data/users";

// Simple user management with basic CRUD
const SimpleUserApp: FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      title: "Software Engineer",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      bio: "Passionate about React and modern web development.",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      title: "Frontend Developer",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      bio: "Specializing in TypeScript and UI/UX design.",
    },
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleAddUser = (user: NewUser) => {
    const newUser = { ...user, id: Date.now().toString() };
    setUsers([...users, newUser]);
    setShowModal(false);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Simple User Management</Card.Title>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <Badge bg="primary" className="me-2">
              Total Users: {users.length}
            </Badge>
            <Badge bg="success">Active Users: {users.length}</Badge>
          </div>
          <Button onClick={() => setShowModal(true)} variant="primary">
            Add User
          </Button>
        </div>
        <UserList
          users={users}
          onDeleteUser={handleDeleteUser}
          showActions={true}
        />
        <AddUserModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleAddUser={handleAddUser}
        />
      </Card.Body>
    </Card>
  );
};

// Advanced user management with search and filtering
const AdvancedUserApp: FC = () => {
  const [users, setUsers] = useState<User[]>(defaultUsers);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTitle, setFilterTitle] = useState("all");

  const handleAddUser = (user: NewUser) => {
    const newUser = { ...user, id: Date.now().toString() };
    setUsers([...users, newUser]);
    setShowModal(false);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleContactUser = (email: string) => {
    alert(`Opening email client for: ${email}`);
  };

  // Filter users based on search term and title filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTitle = filterTitle === "all" || user.title === filterTitle;

    return matchesSearch && matchesTitle;
  });

  const uniqueTitles = Array.from(new Set(users.map((user) => user.title)));

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Advanced User Management</Card.Title>

        <div className="row mb-3">
          <div className="col-md-6">
            <Form.Group>
              <Form.Label>Search Users</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group>
              <Form.Label>Filter by Title</Form.Label>
              <Form.Select
                value={filterTitle}
                onChange={(e) => setFilterTitle(e.target.value)}
              >
                <option value="all">All Titles</option>
                {uniqueTitles.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <Badge bg="primary" className="me-2">
              Total: {users.length}
            </Badge>
            <Badge bg="info" className="me-2">
              Filtered: {filteredUsers.length}
            </Badge>
            <Badge bg="success">Showing: {filteredUsers.length}</Badge>
          </div>
          <Button onClick={() => setShowModal(true)} variant="success">
            Add New User
          </Button>
        </div>

        {filteredUsers.length === 0 ? (
          <Alert variant="info">
            No users found matching your search criteria.
          </Alert>
        ) : (
          <UserList
            users={filteredUsers}
            onDeleteUser={handleDeleteUser}
            onContactUser={handleContactUser}
            showActions={true}
          />
        )}

        <AddUserModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleAddUser={handleAddUser}
        />
      </Card.Body>
    </Card>
  );
};

// Main component that demonstrates user management
const UsersApp: FC = () => {
  const [users, setUsers] = useState(defaultUsers);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleAddUser = (user: NewUser) => {
    const newUser = { ...user, id: Date.now().toString() };
    setUsers([...users, newUser]);
    setShowModal(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleContactUser = (email: string) => {
    window.open(`mailto:${email}`, "_blank");
  };

  const userStats = {
    total: users.length,
    engineers: users.filter((u) => u.title.includes("Engineer")).length,
    developers: users.filter((u) => u.title.includes("Developer")).length,
    designers: users.filter((u) => u.title.includes("Designer")).length,
  };

  return (
    <div className="px-4">
      <h2>User Management Examples</h2>
      <p className="mb-4">
        User management demonstrates complex state management, data
        manipulation, and user interactions. It showcases how to handle lists of
        objects, search, filtering, and CRUD operations.
      </p>

      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>Success!</Alert.Heading>
          <p>New user has been added successfully!</p>
        </Alert>
      )}

      <div className="row">
        <div className="col-md-6">
          <h4>1. Simple User Management</h4>
          <SimpleUserApp />
          <small className="text-muted">
            Basic CRUD operations with user cards and delete functionality.
          </small>
        </div>

        <div className="col-md-6">
          <h4>2. Advanced User Management</h4>
          <AdvancedUserApp />
          <small className="text-muted">
            Search, filtering, and enhanced user interactions.
          </small>
        </div>
      </div>

      <div className="mt-4">
        <h4>3. Original User Management</h4>
        <Card>
          <Card.Body>
            <Card.Title>Classic User Management</Card.Title>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <Badge bg="primary" className="me-2">
                  Total Users: {userStats.total}
                </Badge>
                <Badge bg="success" className="me-2">
                  Engineers: {userStats.engineers}
                </Badge>
                <Badge bg="info" className="me-2">
                  Developers: {userStats.developers}
                </Badge>
                <Badge bg="warning" text="dark">
                  Designers: {userStats.designers}
                </Badge>
              </div>
              <Button onClick={handleShow} variant="primary">
                Add User
              </Button>
            </div>
            <UserList
              users={users}
              onDeleteUser={handleDeleteUser}
              onContactUser={handleContactUser}
              showActions={true}
            />
            <AddUserModal
              show={showModal}
              handleClose={handleClose}
              handleAddUser={handleAddUser}
            />
          </Card.Body>
        </Card>
        <small className="text-muted">
          The original example with enhanced functionality and user statistics.
        </small>
      </div>

      <div className="mt-4">
        <h4>Key Concepts Demonstrated:</h4>
        <ul>
          <li>
            <strong>Complex State Management:</strong> Managing arrays of user
            objects with multiple properties
          </li>
          <li>
            <strong>CRUD Operations:</strong> Create, read, update, and delete
            user data
          </li>
          <li>
            <strong>Search and Filtering:</strong> Real-time search and filter
            functionality
          </li>
          <li>
            <strong>Modal Components:</strong> Form handling in modal dialogs
          </li>
          <li>
            <strong>Data Visualization:</strong> Statistics and badges for user
            information
          </li>
        </ul>
      </div>

      <div className="mt-4">
        <h4>Code Structure:</h4>
        <pre className="bg-light p-3 rounded">
          {`// 1. State for users
const [users, setUsers] = useState([]);
const [showModal, setShowModal] = useState(false);

// 2. Add user function
const handleAddUser = (userData) => {
  const newUser = {
    ...userData,
    id: Date.now().toString()
  };
  setUsers([...users, newUser]);
};

// 3. Delete user function
const handleDeleteUser = (id) => {
  setUsers(users.filter(user => user.id !== id));
};

// 4. Search and filter
const filteredUsers = users.filter(user => {
  const matchesSearch = user.name.includes(searchTerm);
  const matchesFilter = filter === "all" || user.category === filter;
  return matchesSearch && matchesFilter;
});

// 5. Render user list
{users.map(user => (
  <UserCard
    key={user.id}
    user={user}
    onDelete={handleDeleteUser}
    onContact={handleContactUser}
  />
))}

// 6. Modal form
<Modal show={showModal} onHide={handleClose}>
  <Form onSubmit={handleSubmit}>
    {/* form fields */}
  </Form>
</Modal>`}
        </pre>
      </div>

      <Alert variant="info" className="mt-4">
        <strong>Important Notes:</strong>
        <ul className="mb-0 mt-2">
          <li>
            Use unique IDs for user identification (Date.now() works well)
          </li>
          <li>Implement search and filtering for better user experience</li>
          <li>Use modals for forms to keep the UI clean</li>
          <li>Always validate user input before adding to state</li>
          <li>Consider implementing pagination for large user lists</li>
        </ul>
      </Alert>
    </div>
  );
};

export default UsersApp;
