"use client";

import { useState } from "react";
import { Message, continueConversation } from "@/actions/chat";
import { readStreamableValue } from "ai/rsc";
import { useUser } from "@clerk/nextjs";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null); // Track conversation ID
  const [input, setInput] = useState<string>("");

  const { user } = useUser(); // Get the current user

  if (!user) {
    return <div>Please sign in to continue.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
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
              const {
                messages,
                newMessage,
                conversationId: newConvId,
              } = await continueConversation(
                [...conversation, { role: "user", content: input }],
                "66c60077cfa9f183ca355e23", //Frank to update Logic
                conversationId || undefined // Pass conversationId if it exists, otherwise pass undefined
              );

              let textContent = "";

              for await (const delta of readStreamableValue(newMessage)) {
                textContent = `${textContent}${delta}`;

                setConversation([
                  ...messages,
                  { role: "assistant", content: textContent },
                ]);
              }

              // Update conversationId if this is a new conversation
              if (!conversationId) {
                setConversationId(newConvId);
              }
            }}
            className="bg-lime-500 text-white p-3 rounded-r hover:bg-lime-600"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
