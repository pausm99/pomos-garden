"use server";

import {
  serverCreateTag,
  serverUpdateTag,
  serverDeleteTag,
  serverGetAllTagsForUser,
} from "@/lib/tags";
import { tagColor } from "@prisma/client";

// Creating the CRUD actions for tags

//Create Tag Function
export async function actionCreateTag(
  userId: string,
  tagDesc: string,
  color: tagColor,
  taskId: string[]
) {
  return await serverCreateTag(userId, tagDesc, color, taskId);
}

//Get All Tags Function

export async function actionGetAllTagsForUser(userId: string) {
  return await serverGetAllTagsForUser(userId);
}

//Update Tag Function

export async function actionUpdateTag(
  tagId: string,
  tagDesc?: string,
  color?: tagColor,
  taskId?: string[]
) {
  return await serverUpdateTag(tagId, tagDesc, color, taskId);
}

//Delete Tag Function

export async function actionDeleteTag(tagId: string) {
  return await serverDeleteTag(tagId);
}
