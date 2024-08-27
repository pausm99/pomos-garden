"use server";

import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";
import { db } from "@/db/db"; // Assuming this is where your Prisma client is imported

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function continueConversation(
  history: Message[],
  userId: string,
  conversationId?: string // Optional, only provided when continuing an existing conversation
) {
  "use server";

  let conversation;

  if (conversationId) {
    // Continue existing conversation
    conversation = await db.conversation.findUnique({
      where: { id: conversationId },
      include: { messages: true },
    });

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    // Add the existing conversation's messages to the history
    history = [
      ...conversation.messages.map((msg) => ({
        role: msg.role as "user" | "assistant", // Cast the role to the expected type
        content: msg.content,
      })),
      ...history,
    ];
  } else {
    // Start a new conversation
    conversation = await db.conversation.create({
      data: {
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    conversationId = conversation.id;
  }

  const stream = createStreamableValue();

  (async () => {
    const { textStream } = await streamText({
      model: openai("gpt-3.5-turbo"),
      system:
        "You are a business casual professional productivity coach. You are helping a user with their productivity and answering questions, or supporting them in activities.",
      messages: history,
    });

    let assistantResponse = "";

    for await (const text of textStream) {
      stream.update(text);
      assistantResponse += text;
    }

    stream.done();

    // Save the user's message and the assistant's response to the database
    await db.message.create({
      data: {
        conversationId,
        role: "user",
        content: history[history.length - 1].content, // last message in history is the user's input
      },
    });

    await db.message.create({
      data: {
        conversationId,
        role: "assistant",
        content: assistantResponse,
      },
    });

    // Update the conversation's updatedAt field
    await db.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });
  })();

  return {
    messages: history,
    newMessage: stream.value,
    conversationId,
  };
}
