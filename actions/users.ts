"user server";

import { serverCreateUser } from "@/lib/user";

export async function actionCreateUser(
  name: string,
  email: string,
  clerkId: string
) {
  return await serverCreateUser(name, email, clerkId);
}
