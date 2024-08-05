import { actionCreateUser } from "./users";
import {
  actionCreateTask,
  actionGetAllTasksForUser,
  actionGetOneTask,
  actionUpdateTask,
  actionDeleteTask,
} from "./tasks";
import {
  actionCreateTag,
  actionGetAllTagsForUser,
  actionUpdateTag,
  actionDeleteTag,
} from "./tags";
import {
  actionCreateSession,
  actionGetAllSessionsForUser,
  actionGetOneSession,
  actionUpdateSession,
  actionDeleteSession,
} from "./sessions";

async function main() {
  try {
    // Create a user
    console.log("Creating user...");
    const user = await actionCreateUser("User 4", "user4@example.com");
    console.log("User created:", user);

    // Create a task for the user
    console.log("Creating task...");
    const task = await actionCreateTask(
      "Test Task",
      "Task description",
      user.id
    );
    console.log("Task created:", task);

    // Get one task
    console.log("Getting one task...");
    const fetchedTask = await actionGetOneTask(task.id);
    console.log("Fetched Task:", fetchedTask);

    // Get all tasks for the user
    console.log("Getting all tasks for user...");
    const allTasks = await actionGetAllTasksForUser(user.id);
    console.log("All Tasks for User:", allTasks);

    // Update the task
    console.log("Updating task...");
    const updatedTask = await actionUpdateTask(
      task.id,
      "Updated Task",
      "Updated description",
      "IN_PROGRESS"
    );
    console.log("Task updated:", updatedTask);

    // Create a tag
    console.log("Creating tag...");
    const tag = await actionCreateTag(user.id, "Urgent", "red", [task.id]);
    console.log("Tag created:", tag);

    // Get all tags for the user
    console.log("Getting all tags for user...");
    const allTags = await actionGetAllTagsForUser(user.id);
    console.log("All Tags for User:", allTags);

    // Update the tag
    console.log("Updating tag...");
    const updatedTag = await actionUpdateTag(tag.id, "Not Urgent", "blue", [
      task.id,
    ]);
    console.log("Tag updated:", updatedTag);

    // Create a session
    console.log("Creating session...");
    const session = await actionCreateSession(user.id, 25, 5, 4);
    console.log("Session created:", session);

    // Get all sessions for the user
    console.log("Getting all sessions for user...");
    const allSessions = await actionGetAllSessionsForUser(user.id);
    console.log("All Sessions for User:", allSessions);

    // Get one session
    console.log("Getting one session...");
    const fetchedSession = await actionGetOneSession(session.id);
    console.log("Fetched Session:", fetchedSession);

    // Update the session --> Currently we are failing here.

    console.log("Updating session...");
    const updatedSession = await actionUpdateSession(
      session.id,
      30,
      10,
      5,
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    );
    console.log("Session updated:", updatedSession);

    // Delete the session
    console.log("Deleting session...");
    await actionDeleteSession(session.id);
    console.log("Session deleted");

    // Delete the tag
    console.log("Deleting tag...");
    await actionDeleteTag(tag.id);
    console.log("Tag deleted");

    // Delete the task
    console.log("Deleting task...");
    await actionDeleteTask(task.id);
    console.log("Task deleted");

    console.log("All operations completed successfully!");
  } catch (error) {
    console.error("Error during operations:", error);
  } finally {
    // Close the database connection
    // await prisma.$disconnect();
  }
}

main();
