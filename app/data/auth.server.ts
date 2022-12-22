import { hash, compare } from "bcryptjs";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

import { User } from "~/types/user";

import { prisma } from "./database.server";

const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET ?? ""],
    sameSite: "lax",
    maxAge: 30 * 24 * 3600, // 30 days
    httpOnly: true,
  },
});

const createUserSession = async (userId: string, redirectPath: string) => {
  // Create a section
  const session = await sessionStorage.getSession();

  // Define session details, such who is the user
  session.set("userId", userId);

  // After creating the session for that user, redirect to an auth route but return in the header the assigned cookie header
  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
};

export const signup = async ({ email, password }: User) => {
  // Check if a user already exists with that email
  const existingUser = await prisma.users.findFirst({ where: { email } });

  // If yes, warn the user that their email already exists
  if (existingUser) {
    const error = new Error("A user with the provided email already exists");
    error.status = 422;

    throw error;
  }

  // HASH the password to  store it ecrypted in the MongoDB
  const passwordHash = await hash(password, 12);

  try {
    // Create the user in the db
    const user = await prisma.users.create({
      data: { email, password: passwordHash },
    });

    // Create the session for the user and cookie
    return createUserSession(user.id, "/expenses");
  } catch (error) {
    throw new Error("Something went wrong. Please try again later.");
  }
};

export const login = async ({ email, password }: User) => {
  // Check if a user exists with this credentials
  const existingUser = await prisma.users.findFirst({ where: { email } });

  // If it does not exist, then warn the user
  if (!existingUser) {
    const error = new Error("A user with the provided email does not exist");

    error.status = 401;

    throw error;
  }

  // If user exists, check if the password is correct
  const isPasswordCorrect = await compare(password, existingUser.password);

  // And if not, then warn the user
  if (!isPasswordCorrect) {
    const error = new Error("Incorrect credentials");

    error.status = 401;

    throw error;
  }

  // If all good then create a user session to assign a cookie
  return createUserSession(existingUser.id, "/expenses");
};
