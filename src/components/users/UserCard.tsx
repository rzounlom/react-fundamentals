import { Badge, Button, Card } from "react-bootstrap";
import { FC } from "react";
import { User } from "../../types";

interface UserCardProps {
  user: User;
  onDelete?: (id: string) => void;
  onContact?: (email: string) => void;
  showActions?: boolean;
}

const UserCard: FC<UserCardProps> = ({
  user,
  onDelete,
  onContact,
  showActions = false,
}) => {
  const getTitleBadgeVariant = (title: string) => {
    if (title.includes("Engineer")) return "primary";
    if (title.includes("Developer")) return "success";
    if (title.includes("Designer")) return "warning";
    if (title.includes("Scientist")) return "info";
    return "secondary";
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <Card.Title className="mb-1">{`${user.firstName} ${user.lastName}`}</Card.Title>
            <Badge bg={getTitleBadgeVariant(user.title)} className="mb-2">
              {user.title}
            </Badge>
          </div>
          {showActions && onDelete && (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onDelete(user.id)}
              title="Delete user"
            >
              ×
            </Button>
          )}
        </div>

        <Card.Text>
          <div className="mb-2">
            <strong>Email:</strong> {user.email}
          </div>
          <div className="mb-2">
            <strong>Phone:</strong> {user.phone}
          </div>
          <div className="mb-3">
            <strong>Bio:</strong> {user.bio}
          </div>
        </Card.Text>

        {showActions && onContact && (
          <div className="d-flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onContact(user.email)}
            >
              Contact
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => window.open(`tel:${user.phone}`, "_blank")}
            >
              Call
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default UserCard;
