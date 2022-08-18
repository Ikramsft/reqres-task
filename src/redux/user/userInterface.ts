/**
 * @format
 */
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUserState {
  authenticated: boolean;
  loading: boolean;
  errorMessage: string | null;
  accessToken?: string;
  user: IUser;
}
