import React from "react";

function OtherChatMessage({ chats }) {
  const { message, date, sender } = chats;

  return (
    <div className="flex items-center mb-4">
      <img
        src={sender.avatar}
        alt="Sender Avatar"
        className="w-10 h-10 rounded-full mr-4 object-cover"
      />
      <div className="max-w-sm w-full rounded-lg bg-gray-200 text-gray-800 py-2 px-4">
        <p className="font-semibold">{message}</p>
        <p className="text-xs">{new Date(date).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default OtherChatMessage;
