"use client";

import { useState, useEffect, useRef } from "react";
import {
  Message,
  continueConversation,
  getConversations,
  getConversationMessages,
} from "@/actions/chat";
import { readStreamableValue } from "ai/rsc";
import Section from "@/components/Section";

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<
    Array<{ id: string; createdAt: Date }>
  >([]);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      const userConversations = await getConversations();
      setConversations(userConversations);
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const loadConversation = async (id: string) => {
    const conversationMessages = await getConversationMessages(id);

    const formattedMessages: Message[] = conversationMessages.map(
      (message: { role: string; content: string }) => ({
        ...message,
        role: message.role as "user" | "assistant",
        content: message.content,
      })
    );

    setConversation(formattedMessages);
    setConversationId(id);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

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

    setInput("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Section name={"Chatbot"} section={"Chatbot"}>
      <div className="flex flex-col h-full bg-gray-100 p-4 sm:flex-row overflow-y-auto">
        <div className="w-full sm:w-1/3 bg-white rounded-lg shadow-lg p-4 mb-4 sm:mb-0 sm:mr-4 flex-shrink-0 overflow-y-auto">
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

        <div className="flex flex-col flex-1 bg-gray-100 p-4">
          <div className="w-full bg-white rounded-lg shadow-lg p-6 flex flex-col h-full">
            <div
              ref={chatContainerRef}
              className="mb-4 overflow-y-auto flex-1 max-h-[calc(100vh-200px)]"
            >
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

            <div className="flex items-center mt-4">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow border rounded-l p-3 text-gray-700 h-12"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-lime-500 text-white pr-1 pl-1 rounded-r h-12 hover:bg-lime-600"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
