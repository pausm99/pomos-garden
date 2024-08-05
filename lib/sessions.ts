import { db } from "@/db/db";
import {
  SessionUncheckedCreateInputSchema,
  SessionUncheckedUpdateInputSchema,
} from "@/prisma/generated/zod";

//Function to create a new Session

export async function serverCreateSession(
  userId: string,
  focusDuration: number,
  breakDuration: number,
  rounds: number
) {
  const now = new Date();
  const endTime = new Date(
    now.getTime() + (focusDuration + breakDuration) * rounds * 60000
  );
  const data = {
    userId,
    focusDuration,
    breakDuration,
    rounds,
    endTime,
  };
  try {
    SessionUncheckedCreateInputSchema.parse(data);
  } catch (error) {
    throw new Error(`Failed to parse session data: ${error}`);
  }
  try {
    const newSession = await db.session.create({
      data,
    });
    return newSession;
  } catch (error) {
    throw new Error(`Failed to create session: ${error}`);
  }
}

//Function to get all sessions by userId

export async function serverGetAllSessionsForUser(userId: string) {
  try {
    const sessions = await db.session.findMany({
      where: {
        userId: userId,
      },
    });
    return sessions;
  } catch (error) {
    throw new Error(`Failed to get sessions: ${error}`);
  }
}

//Function to get one session by id

export async function serverGetOneSession(id: string) {
  try {
    const session = await db.session.findUnique({
      where: {
        id,
      },
    });
    return session;
  } catch (error) {
    throw new Error(`Failed to get session: ${error}`);
  }
}

//Function to update a session

export async function serverUpdateSession(
  id: string,
  focusDuration?: number,
  breakDuration?: number,
  rounds?: number,
  endTime?: Date,
  userId?: string,
  taskIds?: string[]
) {
  const data = {
    focusDuration,
    breakDuration,
    rounds,
    endTime,
    userId,
    tasks: {
      connect: taskIds?.map((id) => ({ id })),
    },
  };
  try {
    SessionUncheckedUpdateInputSchema.parse(data);
  } catch (error) {
    throw new Error(`Failed to parse session data: ${error}`);
  }
  try {
    const updatedSession = await db.session.update({
      where: {
        id,
      },
      data,
    });
    return updatedSession;
  } catch (error) {
    throw new Error(`Failed to update session: ${error}`);
  }
}

//Function to delete a session

export async function serverDeleteSession(id: string) {
  try {
    const session = await db.session.delete({
      where: {
        id,
      },
    });
    return session;
  } catch (error) {
    throw new Error(`Failed to delete session: ${error}`);
  }
}
