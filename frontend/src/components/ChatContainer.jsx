import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser,subscribeToMessages,unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages()
    } 
    return () => unsubscribeFromMessages()
  }, [selectedUser?._id, getMessages,subscribeToMessages,unsubscribeFromMessages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add these debug logs to check your data
  console.log("Selected User:", selectedUser);
  console.log("Messages:", messages);
  console.log("Auth User:", authUser);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col h-full bg-black">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  if (!selectedUser) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-gray-500">
        <div className="text-center p-6 max-w-md">
          <h3 className="text-xl font-medium mb-2">No conversation selected</h3>
          <p>Select a contact to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-black">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 bg-black-50">
        {messages?.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`flex mb-4 ${message.senderId === authUser?._id ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex max-w-xs md:max-w-md ${message.senderId === authUser?._id ? "flex-row-reverse" : ""}`}>
                <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden border border-gray-200">
                  <img
                    src={
                      message.senderId === authUser?._id
                        ? authUser?.profilePic || "/avatar.png"
                        : selectedUser?.profilePic || "/avatar.png"
                    }
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className={`mx-2 flex flex-col ${message.senderId === authUser?._id ? "items-end" : "items-start"}`}>
                  <span className="text-xs text-gray-500 mb-1">
                    {formatMessageTime(message.createdAt)}
                  </span>
                  <div
                    className={`rounded-lg px-3 py-2 ${message.senderId === authUser?._id
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"}`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="max-w-full rounded mb-1 max-h-60 object-contain"
                      />
                    )}
                    {message.text && <p className="break-words">{message.text}</p>}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;