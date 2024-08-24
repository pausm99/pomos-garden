import { db } from "@/db/db";
import { UserCreateInputSchema } from "@/prisma/generated/zod";

export async function serverCreateUser(
  name: string,
  email: string,
  userClerkId: string
) {
  const data = {
    name,
    email,
    userClerkId,
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
