import {
  actionCreateTask,
  actionGetOneTask,
  actionGetAllTasksForUser,
  actionUpdateTask,
  actionDeleteTask,
} from "@/actions/tasks";

// Test actionCreateTask
const testCreateTask = async () => {
  try {
    const title = "Task 1";
    const description = "This is task 1";
    const userId = "66ad4e5438ec159324a5c05e";

    const createdTask = await actionCreateTask(title, description, userId);
    console.log("Created Task:", createdTask);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

// Test actionGetOneTask
const testGetOneTask = async () => {
  try {
    const taskId = "66ad53f58651e6854616874d";

    const task = await actionGetOneTask(taskId);
    console.log("Task:", task);
  } catch (error) {
    console.error("Error getting task:", error);
  }
};

// Test actionGetAllTasksForUser
const testGetAllTasksForUser = async () => {
  try {
    const userId = "66ad4e5438ec159324a5c05e";

    const tasks = await actionGetAllTasksForUser(userId);
    console.log("Tasks:", tasks);
  } catch (error) {
    console.error("Error getting tasks:", error);
  }
};

// Test actionUpdateTask
const testUpdateTask = async () => {
  try {
    const taskId = "66ad53f58651e6854616874d";
    const title = "Updated Task";
    const description = "This is the updated task";
    const status = "IN_PROGRESS";

    const updatedTask = await actionUpdateTask(taskId, title, description, status);
    console.log("Updated Task:", updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

// Test actionDeleteTask
const testDeleteTask = async () => {
  try {
    const taskId = "66ad53f58651e6854616874d";

    const deletedTask = await actionDeleteTask(taskId);
    console.log("Deleted Task:", deletedTask);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

// Run the tests
testCreateTask();
testGetOneTask();
testGetAllTasksForUser();
testUpdateTask();
testDeleteTask();