"user server";

import { serverCreateUser, serverGetUserIdByClerkId } from "@/lib/user";

export async function actionCreateUser(
  name: string,
  email: string,
  clerkId: string
) {
  return await serverCreateUser(name, email, clerkId);
}

export async function actionGetUserIdByClerkId(clerkId: string) {
  return await serverGetUserIdByClerkId(clerkId);
}
