import React from "react";

function ChatMessage({ chats }) {
  const { message, date } = chats;

  return (
    <div className="flex justify-end mb-4">
      <div className="max-w-sm w-full rounded-lg bg-blue-600 text-white py-2 px-4">
        <p className="font-semibold">{message}</p>
        <p className="text-xs">{new Date(date).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default ChatMessage;
