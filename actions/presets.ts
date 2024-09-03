"use server";

import { serverCreatePreset, serverDeletePreset, serverGetAllPresetsForUser, serverUpdatePreset } from "@/lib/presets";

// Creating the CRUD actions for presets

//Create Preset Function
export async function actionCreatePreset(
  userId: string,
  name: string,
  focusTime: number,
  breakTime: number
) {
  return await serverCreatePreset(userId, name, focusTime, breakTime);
}

//Get All Presets Function

export async function actionGetAllPresetsForUser(userId: string) {
  return await serverGetAllPresetsForUser(userId);
}

//Update Preset Function

export async function actionUpdatePreset(
  presetId: string,
  name?: string,
  focusTime?: number,
  breakTime?: number
) {
  return await serverUpdatePreset(presetId, name, focusTime, breakTime);
}

//Delete Preset Function

export async function actionDeletePreset(presetId: string) {
  return await serverDeletePreset(presetId);
}
