// build out sign-up mutation
import { UserResponse } from "./signin";
import { Context } from "./../../context";
import validator from "validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

interface signupInput {
  name: string;
  credentialInput: {
    email: string;
    password: string;
  };
}

export const signup = async (
  _: any,
  { name, credentialInput: { email, password } }: signupInput,
  { prisma }: Context
): Promise<UserResponse> => {
  // check both input
  if (!name || !email || !password) {
    return { message: "Invalid credentials.", success: false, token: null };
  }
  // validate email
  if (!validator.isEmail(email)) {
    return { message: "Incorrect email.", success: false, token: null };
  }
  // we can also check if a user already exists with the same email (we shouldn't allow such duplication)
  if (await prisma.user.findUnique({ where: { email } })) {
    return {
      message: `User with ${email} already exists.`,
      success: false,
      token: null,
    };
  }
  // hash the password
  let hashedPassword = await bcrypt.hash(password, 10);
  // create user in db
  try {
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });
    const token = await JWT.sign(
      { userId: user.id },
      process.env.JWT_SIGNATURE!, // non-null assertion: we will always get a value. BELIEVE IN THE PROCESS!
      { expiresIn: "24h" }
    );
    return { message: `Welcome ${name}`, success: true, token };
  } catch (error) {
    return {
      message: "oops... something went wrong",
      success: false,
      token: null,
    };
  }
};
