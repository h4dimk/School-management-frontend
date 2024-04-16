import React from "react";

function ChatMessage({ message }) {
  const { text, timestamp, sender } = message;

  return (
    <div className="flex justify-end mb-4">
      <div className="max-w-sm w-full rounded-lg bg-blue-600 text-white py-2 px-4">
        <p className="font-semibold">{text}</p>
        <p className="text-xs">{timestamp}</p>
      </div>
    </div>
  );
}

export default ChatMessage;
