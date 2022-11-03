import { Context } from "./../../context";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export interface SigninInput {
  credentialInput: { email: string; password: string };
}

export interface User {
  id: string;
  name: string | null;
  email: string;
}

export interface UserResponse {
  success: boolean;
  message: string;
  token: string | null;
}

export const signin = async (
  _: any,
  { credentialInput: { email, password } }: SigninInput,
  { prisma }: Context
): Promise<UserResponse> => {
  // check for the user with the provided inputs in db
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { message: "Invalid credentials.", success: false, token: null };
  }
  // we check for password validity
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return {
      message: "Invalid password.",
      success: false,
      token: null,
    };
  }
  // all is well from here... hopefully
  return {
    message: `Dear, ${user.name}, you've been successfully signed in. Enjoy! 😊🚀`,
    success: true,
    token: JWT.sign({ userId: user.id }, process.env.JWT_SIGNATURE!, {
      expiresIn: "24h",
    }),
  };
};
