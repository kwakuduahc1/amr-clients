export interface IUsers {
  title: string;
  userName: string;
  password: string | null;
  usersID: string;
  id: string;
  email: string;
  phoneNumber: string;
  fullName: string;
  confirmPassword: string;
}

export interface RegisterVm {
  title: string;
  userName: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phoneNumber: string[];
}

export interface ILogin extends IUsers {
  role: string;
}

export interface IRoles {
  id: string;
  name: string;
}

export interface URoles {
  role: string;
  id: string;
}

export interface IUserRoles {
  id: number;
  userId: string;
  claimValue: string;
  claimType: string;
}

export interface LoginVm {
  userName: string;
  password: string | null;
}

export interface ApprovalVm {
  iD: string;
  userName: string;
  teamsID: number;
}