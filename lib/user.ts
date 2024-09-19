import { db } from "@/db/db";
import {
  PresetCreateInputSchema,
  TagCreateInputSchema,
  UserCreateInputSchema
} from "@/prisma/generated/zod";
import { z } from "zod";

export async function serverCreateUser(name: string, email: string) {
  const data = {
    name,
    email,
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

    createUserBasicProps(newUser.id);

    return newUser;
  } catch (error) {
    throw new Error(`Failed to create user: ${error}`);
  }
}

export async function serverGetUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
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

type TagCreate = z.infer<typeof TagCreateInputSchema>;
type PresetCreate = z.infer<typeof PresetCreateInputSchema>;

const createUserBasicProps = async (userId: string) => {
  const tags: TagCreate[] = [
    { userId, tagDesc: "Work", color: "bg_red_200" },
    { userId, tagDesc: "Personal", color: "bg_orange_200" },
    { userId, tagDesc: "Projects", color: "bg_yellow_200" },
    { userId, tagDesc: "Ideas", color: "bg_lime_200" },
    { userId, tagDesc: "Urgent", color: "bg_emerald_200" },
    { userId, tagDesc: "Meetings", color: "bg_sky_200" },
    { userId, tagDesc: "Tasks", color: "bg_indigo_200" },
    { userId, tagDesc: "Reminders", color: "bg_fuchsia_200" },
    { userId, tagDesc: "Finance", color: "bg_red_200" },
    { userId, tagDesc: "Hobbies", color: "bg_orange_200" },
  ];

  const presets: PresetCreate[] = [
    {
      userId,
      name: "Pomodoro",
      focusTime: 1500,
      breakTime: 300,
    },
    {
      userId,
      name: "Deep Work",
      focusTime: 5400,
      breakTime: 900,
    },
    {
      userId,
      name: "Short Sessions",
      focusTime: 900,
      breakTime: 300,
    },
    {
      userId,
      name: "Long Sessions",
      focusTime: 3600,
      breakTime: 600,
    },
    {
      userId,
      name: "Evening Work",
      focusTime: 2700,
      breakTime: 600,
    },
    {
      userId,
      name: "Morning Boost",
      focusTime: 1800,
      breakTime: 300,
    },
    {
      userId,
      name: "Custom",
      focusTime: 3000,
      breakTime: 600,
    },
  ];

  await db.tag.createMany({
    data: tags,
  });

  await db.preset.createMany({
    data: presets,
  });
};
