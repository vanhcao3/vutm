export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  role: 'ADMIN' | 'USER';
  username: string;
  unitCode: string;
};

export type UserResponse = {
  token: string;
  pass_status_msg?: string;
};
