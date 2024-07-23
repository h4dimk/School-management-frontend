import React from "react";

function OtherChatMessage({ chats }) {
  const { message, date, sender } = chats;

  return (
    <div className="flex items-end mb-4">
      <img
        src={sender.avatar}
        alt="Sender Avatar"
        className="w-10 h-10 rounded-full mr-4 object-cover"
      />
      <div className="flex flex-col space-y-2 px-4 py-3 rounded-lg bg-gray-200 text-gray-700">
        <p className="font-semibold">{message}</p>
        <div className="text-gray-400 text-xs">
          {new Date(date).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default OtherChatMessage;
