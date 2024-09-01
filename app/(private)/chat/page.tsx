"use client";

import { useState, useEffect } from "react";
import {
  Message,
  continueConversation,
  getConversations,
  getConversationMessages,
} from "@/actions/chat";
import { readStreamableValue } from "ai/rsc";

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<
    Array<{ id: string; createdAt: Date }>
  >([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const userConversations = await getConversations();
      setConversations(userConversations);
    };

    fetchConversations();
  }, []);

  const loadConversation = async (id: string) => {
    const conversationMessages = await getConversationMessages(id);

    // Transform the fetched messages to match the Message type
    const formattedMessages: Message[] = conversationMessages.map(
      (message) => ({
        ...message,
        role: message.role as "user" | "assistant", // Ensure the role matches the expected type
      })
    );

    setConversation(formattedMessages);
    setConversationId(id);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-4">
      <div className="w-64 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Past Conversations</h2>
        <ul className="space-y-2">
          {conversations.map((conv) => (
            <li
              key={conv.id}
              onClick={() => loadConversation(conv.id)}
              className={`p-2 rounded-lg cursor-pointer ${
                conversationId === conv.id
                  ? "bg-lime-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {new Date(conv.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 bg-gray-100 p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4 overflow-y-auto max-h-[500px]">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`p-3 my-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-50 text-blue-900"
                    : "bg-lime-50 text-lime-900"
                }`}
              >
                <strong>{message.role}:</strong> {message.content}
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
              }}
              className="flex-grow border rounded-l p-3 text-gray-700"
              placeholder="Type your message..."
            />
            <button
              onClick={async () => {
                const { messages, newMessage } = await continueConversation(
                  [...conversation, { role: "user", content: input }],
                  conversationId
                );

                let textContent = "";

                for await (const delta of readStreamableValue(newMessage)) {
                  textContent = `${textContent}${delta}`;

                  setConversation([
                    ...messages,
                    { role: "assistant", content: textContent },
                  ]);
                }
              }}
              className="bg-lime-500 text-white p-3 rounded-r hover:bg-lime-600"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
