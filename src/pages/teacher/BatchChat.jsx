import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "../../components/common/ChatMessage";
import { useSelector } from "react-redux";
import OtherChatMessage from "../../components/common/OtherChatMessage";
import TeacherSideBar from "../../components/teacher/TeacherSideBar";

function BatchChat() {
  const [messages, setMessages] = useState([
    { text: "Hello there!", timestamp: "10:00 AM", sender: "user1" },
    { text: "How are you?", timestamp: "10:05 AM", sender: "user2" },
    { text: "I'm good, thanks!", timestamp: "10:10 AM", sender: "user1" },
    { text: "What about you?", timestamp: "10:15 AM", sender: "user2" },
    { text: "I'm doing great!", timestamp: "10:20 AM", sender: "user1" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    const message = {
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      sender: currentUser,
    };
    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="flex">
      <TeacherSideBar />
      <div className="container mx-auto px-4 py-8 flex-1 ml-56">
        <div className="fixed w-4/5 flex justify-between px-4 py-8">
          <div>
            <h3 className="text-3xl font-semibold mb-3 text-white">
              Batch Chats
            </h3>
          </div>
          <div>
            <h3 className="text-3xl font-semibold mb-3 text-white">
              {currentUser.batch}
            </h3>
          </div>
        </div>
        <div className="mt-24">
          <div className="overflow-y-auto mb-4 ">
            {messages.map((message, index) =>
              message.sender === currentUser ? (
                <ChatMessage key={index} message={message} />
              ) : (
                <OtherChatMessage key={index} message={message} />
              )
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="fixed w-full bottom-5 ">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-3/4 p-3 border border-gray-300 rounded-l"
            />
            <button
              type="submit"
              className="bg-gray-600 text-lg text-gray-300 hover:text-white px-6 py-3 rounded-r "
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BatchChat;
