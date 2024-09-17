import { CSSProperties, FC, useState } from "react";

import AddUserModal from "./AddUserModal";
import { Button } from "react-bootstrap";
import { NewUser } from "../../types";
import UserList from "./UserList";
import { users as defaultUsers } from "../../data/users";

const UsersApp: FC = () => {
  const [users, setUsers] = useState(defaultUsers);
  const [showModal, setShowModal] = useState(false);
  // Function to open the modal
  const handleShow = () => setShowModal(true);

  // Function to close the modal
  const handleClose = () => setShowModal(false);

  // Function to add a new user
  const handleAddUser = (user: NewUser) => {
    const newUser = { ...user, id: Date.now().toString() };

    setUsers([...users, newUser]);
  };

  return (
    <div style={styles}>
      <AddUserModal
        show={showModal}
        handleClose={handleClose}
        handleAddUser={handleAddUser}
      />
      <Button
        style={{ marginTop: "50px" }}
        variant="primary"
        onClick={handleShow}
      >
        Add User
      </Button>
      <UserList users={users} />
    </div>
  );
};

const styles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default UsersApp;
