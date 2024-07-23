import React from "react";

function ChatMessage({ chats }) {
  const { message, date } = chats;

  return (
    <div className="flex items-end justify-end mb-4">
      <div className="flex flex-col space-y-2 px-4 py-3 rounded-lg bg-gray-700 text-white">
        <p className="font-semibold">{message}</p>
        <p className="text-xs">{new Date(date).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default ChatMessage;
