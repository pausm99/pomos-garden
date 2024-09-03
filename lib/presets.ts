import { db } from "@/db/db";
import { PresetUncheckedCreateInputSchema } from "@/prisma/generated/zod";

//Function to create a Preset.

export async function serverCreatePreset(
  userId: string,
  name: string,
  focusTime: number,
  breakTime: number
) {
  const data = {
    userId,
    name,
    focusTime,
    breakTime,
  };
  try {
    PresetUncheckedCreateInputSchema.parse(data);
  } catch (error) {
    throw new Error(`Failed to parse preset data: ${error}`);
  }
  try {
    const newPreset = await db.preset.create({
      data,
    });
    return newPreset;
  } catch (error) {
    throw new Error(`Failed to create preset: ${error}`);
  }
}

//Function to get all presets by userId

export async function serverGetAllPresetsForUser(userId: string) {
  try {
    const presets = await db.preset.findMany({
      where: {
        userId: userId,
      },
    });
    return presets;
  } catch (error) {
    throw new Error(`Failed to get presets: ${error}`);
  }
}

//Function to update a preset.

export async function serverUpdatePreset(
  presetId: string,
  name?: string,
  focusTime?: number,
  breakTime?: number
) {
  try {
    const dataToUpdate: { name?: string; focusTime?: number; breakTime?: number } = {};
    if (name !== undefined) dataToUpdate.name = name;
    if (focusTime !== undefined) dataToUpdate.focusTime = focusTime;
    if (breakTime !== undefined) dataToUpdate.breakTime = breakTime;

    const updatedPreset = await db.preset.update({
      where: {
        id: presetId,
      },
      data: dataToUpdate,
    });

    return updatedPreset;
  } catch (error) {
    throw new Error(`Failed to update preset: ${error}`);
  }
}


// Function to delete a Preset
export async function serverDeletePreset(presetId: string) {
  try {
    const deletedPreset = await db.preset.delete({
      where: {
        id: presetId,
      },
    });
    return deletedPreset;
  } catch (error) {
    throw new Error(`Failed to delete preset: ${error}`);
  }
}
