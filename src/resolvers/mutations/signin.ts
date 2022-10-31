import { Context } from "./../../context";

export interface UserInput {
  signinInput: { name: string | null; email: string; password: string };
}

export interface User {
  id: string;
  name: string | null;
  email: string;
}

export interface UserResponse {
  success: boolean;
  message: string;
  user: User | null;
}

export const signin = async (
  _: any,
  { signinInput: { email, name, password } }: UserInput,
  { prisma }: Context
): Promise<UserResponse> => {
  console.log(email, name, password);

  if (!name || !email || !password) {
    return { message: "Invalid credentials", success: false, user: null };
  }

  const user = await prisma.user.create({ data: { email, name, password } });

  return {
    message: "Well-done",
    success: true,
    user: user,
  };
};
