import { Button, Card } from "react-bootstrap";

import { FC } from "react";
import { User } from "../../types";

interface UsersCardProps {
  user: User;
}

const UsersCard: FC<UsersCardProps> = ({ user }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user.title}</Card.Subtitle>
        <Card.Text>
          <strong>Email:</strong> {user.email}
          <br />
          <strong>Phone:</strong> {user.phone}
          <br />
          <strong>Bio:</strong> {user.bio}
        </Card.Text>
        <Button variant="primary">Contact</Button>
      </Card.Body>
    </Card>
  );
};

export default UsersCard;
