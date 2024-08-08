import {
  serverCreateSession,
  serverGetAllSessionsForUser,
  serverGetOneSession,
  serverUpdateSession,
  serverDeleteSession,
} from "@/lib/sessions";

// Creating the CRUD actions for sessions

//Create Session Function

export async function actionCreateSession(
  userId: string,
  focusDuration: number,
  breakDuration: number,
  rounds: number
) {
  return await serverCreateSession(
    userId,
    focusDuration,
    breakDuration,
    rounds
  );
}

//Get All Sessions Function

export async function actionGetAllSessionsForUser(userId: string) {
  return await serverGetAllSessionsForUser(userId);
}

//Get One Session Function

export async function actionGetOneSession(id: string) {
  return await serverGetOneSession(id);
}

//Update Session Function

export async function actionUpdateSession(
  id: string,
  focusDuration?: number,
  breakDuration?: number,
  rounds?: number,
  endTime?: Date,
  userId?: string,
  taskIds?: string[]
) {
  return await serverUpdateSession(
    id,
    focusDuration,
    breakDuration,
    rounds,
    endTime,
    userId,
    taskIds
  );
}

//Delete Session Function

export async function actionDeleteSession(sessionId: string) {
  return await serverDeleteSession(sessionId);
}
