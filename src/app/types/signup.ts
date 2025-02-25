export interface SignUp {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  department: string;
}

enum Roles {
  ADMIN = "admin",
  EMPLOYEE = "employee",
}

type Role = Roles.ADMIN | Roles.EMPLOYEE;
