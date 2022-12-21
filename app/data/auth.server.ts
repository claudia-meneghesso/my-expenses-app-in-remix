import { hash } from "bcryptjs";
import { User } from "~/types/user";

import { prisma } from "./database.server";

export const signup = async ({ email, password }: User) => {
  const existingUser = await prisma.users.findFirst({ where: { email } });

  if (existingUser) {
    const error = new Error("A user with the provided email already exists");
    error.status = 422;

    throw error;
  }

  // HASH the password to not store it unecrypted in the MongoDB
  const passwordHash = await hash(password, 12);

  try {
    return await prisma.users.create({
      data: { email, password: passwordHash },
    });
  } catch (error) {
    throw new Error("Something went wrong. Please try again later.");
  }
};
