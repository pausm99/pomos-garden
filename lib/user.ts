import { db } from "@/db/db";
import { UserCreateInputSchema } from "@/prisma/generated/zod";

export async function serverCreateUser(
  name: string,
  email: string
) {
  const data = {
    name,
    email
  };
  try {
    UserCreateInputSchema.parse(data);
  } catch (error) {
    throw new Error(`Failed to parse user data: ${error}`);
  }
  try {
    const newUser = await db.user.create({
      data,
    });
    return newUser;
  } catch (error) {
    throw new Error(`Failed to create user: ${error}`);
  }
}

export async function serverGetUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        email
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error(`Failed to get user: ${error}`);
  }
}
