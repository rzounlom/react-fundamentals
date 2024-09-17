import { CSSProperties, FC } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { User } from "../../types";
import UserCard from "./UserCard";

interface UsersListProps {
  users: User[];
}

const UsersList: FC<UsersListProps> = ({ users }) => {
  return (
    <Container style={styles}>
      <Row>
        {users.map((user) => (
          <Col key={user.id} md={4} className="mb-4">
            <UserCard user={user} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

const styles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "50px",
};

export default UsersList;
