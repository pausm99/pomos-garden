"use client";

import {
  Message,
  continueConversation,
  getConversationMessages,
  getConversations,
} from "@/actions/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserContext } from "@/contexts/UserContext";
import { readStreamableValue } from "ai/rsc";
import { Bot } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const { user } = useUserContext();
  const { data: session } = useSession();

  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<
    Array<{ id: string; createdAt: Date }>
  >([]);

  let avatarFallback = "PG";
  if (session?.user?.name) avatarFallback = session.user?.name[0].toUpperCase();

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      if (user) {
        const userConversations = await getConversations(user?.id);
        setConversations(userConversations);
      }
    };

    fetchConversations();
  }, [user]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const loadConversation = async (id: string) => {
    if (user) {
      const conversationMessages = await getConversationMessages(user?.id, id);

      const formattedMessages: Message[] = conversationMessages.map(
        (message: { role: string; content: string }) => ({
          ...message,
          role: message.role as "user" | "assistant",
          content: message.content,
        })
      );

      setConversation(formattedMessages);
      setConversationId(id);
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    if (user) {
      const { messages, newMessage } = await continueConversation(
        user?.id,
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
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-full bg-gray-100 p-4 sm:flex-row overflow-y-auto">
      <div className="w-full h-full rounded-lg">
        <div className="h-full bg-white rounded-lg shadow-lg p-4 flex flex-col">
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto mb-4">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`flex items-center gap-2.5 p-3 my-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-50 text-blue-900"
                    : "bg-lime-50 text-lime-900"
                }`}
              >
                {message.role === "user" ? (
                  <Avatar className="h-8 w-8 flex-shrink-0 flex-grow-0">
                    <AvatarImage
                      src={session?.user?.image || undefined}
                      alt="@shadcn"
                    />
                    <AvatarFallback>{avatarFallback}</AvatarFallback>
                  </Avatar>
                ) : (
                  <Bot className="h8 w-8 flex-shrink-0 flex-grow-0" />
                )}

                <p>{message.content}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center mt-4 gap-2.5">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow border rounded-lg p-3 text-zinc-800 h-12"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-lime-300 text-zinc-800 p-3 rounded-lg h-12 hover:bg-lime-400"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-full flex flex-col sm:w-1/3 bg-white rounded-lg shadow-lg p-4 mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
        <h2 className="text-xl font-semibold mb-4">Past Conversations</h2>
        <ul className="h-full flex flex-col gap-2.5 overflow-y-auto">
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
    </div>
  );
}
