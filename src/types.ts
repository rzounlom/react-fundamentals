export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  bio: string;
}

export type NewUser = Omit<User, "id">; // NewUser type without 'id' property
