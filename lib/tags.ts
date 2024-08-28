import { db } from "@/db/db";
import { TagUncheckedCreateInputSchema } from "@/prisma/generated/zod";
import { tagColor } from "@prisma/client";

//Function to create a Tag. Assumes that everytime you create a tag, you will also connect it to a task.

export async function serverCreateTag(
  userId: string,
  tagDesc: string,
  color: tagColor,
  taskId: string[]
) {
  const data = {
    userId,
    tagDesc,
    color,
    tasks: {
      connect: taskId.map((id) => ({ id })),
    },
  };
  try {
    TagUncheckedCreateInputSchema.parse(data);
  } catch (error) {
    throw new Error(`Failed to parse tag data: ${error}`);
  }
  try {
    const newTag = await db.tag.create({
      data,
    });
    return newTag;
  } catch (error) {
    throw new Error(`Failed to create tag: ${error}`);
  }
}

//Function to get all tasks by userId

export async function serverGetAllTagsForUser(userId: string) {
  try {
    const tags = await db.tag.findMany({
      where: {
        userId: userId,
      },
    });
    return tags;
  } catch (error) {
    throw new Error(`Failed to get tags: ${error}`);
  }
}

//Function to update a Tag. Also with the possibility of adding it to more tasks.

export async function serverUpdateTag(
  tagId: string,
  tagDesc?: string,
  color?: tagColor,
  taskId?: string[]
) {
  try {
    const existingTag = await db.tag.findUnique({
      where: {
        id: tagId,
      },
      include: {
        tasks: true,
      },
    });

    const updatedTasks = existingTag!.tasks.map((task) => task.id);
    if (taskId) {
      taskId.forEach((id) => {
        if (!updatedTasks.includes(id)) {
          updatedTasks.push(id);
        }
      });
    }

    const updatedTag = await db.tag.update({
      where: {
        id: tagId,
      },
      data: {
        tagDesc,
        color,
        tasks: {
          connect: updatedTasks.map((id) => ({ id })),
        },
      },
    });

    return updatedTag;
  } catch (error) {
    throw new Error(`Failed to update tag: ${error}`);
  }
}
//Function to delete a Tag

export async function serverDeleteTag(tagId: string) {
  try {
    const deletedTag = await db.tag.delete({
      where: {
        id: tagId,
      },
    });
    return deletedTag;
  } catch (error) {
    throw new Error(`Failed to delete tag: ${error}`);
  }
}
