import { FC } from "react";
import { Col, Row } from "react-bootstrap";

import { User } from "../../types";
import UserCard from "./UserCard";

interface UserListProps {
  users: User[];
  onDeleteUser?: (id: string) => void;
  onContactUser?: (email: string) => void;
  showActions?: boolean;
}

const UserList: FC<UserListProps> = ({
  users,
  onDeleteUser,
  onContactUser,
  showActions = false,
}) => {
  return (
    <Row>
      {users.map((user) => (
        <Col key={user.id} md={4} className="mb-4">
          <UserCard
            user={user}
            onDelete={onDeleteUser}
            onContact={onContactUser}
            showActions={showActions}
          />
        </Col>
      ))}
    </Row>
  );
};

export default UserList;
