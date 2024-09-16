"use server";

import { serverCreateUser, serverGetUserByEmail } from "@/lib/user";

export async function actionCreateUser(
  name: string,
  email: string,
) {
  return await serverCreateUser(name, email);
}

export async function actionGetUserByEmail(id: string) {
  return await serverGetUserByEmail(id);
}
