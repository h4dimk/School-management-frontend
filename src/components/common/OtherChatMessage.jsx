import React from "react";

function OtherChatMessage({ message }) {
  const { text, timestamp, sender } = message;

  return (
    <div className="flex items-center mb-4">
      <img
        src="https://via.placeholder.com/50"
        alt="Sender Avatar"
        className="w-10 h-10 rounded-full mr-4 object-cover"
      />
      <div className="max-w-sm w-full rounded-lg bg-gray-200 text-gray-800 py-2 px-4">
        <p className="font-semibold">{text}</p>
        <p className="text-xs">{timestamp}</p>
      </div>
    </div>
  );
}

export default OtherChatMessage;
