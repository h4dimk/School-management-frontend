import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../../services/axiosService";
import ChatMessage from "../../components/common/ChatMessage";
import OtherChatMessage from "../../components/common/OtherChatMessage";
import TeacherSideBar from "../../components/teacher/TeacherSideBar";

function BatchChat() {
  const { currentUser } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getMessages = async () => {
    try {
      const response = await axios.get(
        `/teacher/get-chats/${currentUser.batchId}`
      );
      console;
      setMessages(response.data.chats);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    const messageData = {
      message: newMessage,
      sender: currentUser._id,
      group: currentUser.batchId,
    };
    try {
      await axios.post("/teacher/add-message", messageData);
      getMessages();
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  console.log(messages);

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
        <div className="mt-24 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              {message.sender._id === currentUser._id ? (
                <ChatMessage chats={message} />
              ) : (
                <OtherChatMessage chats={message} />
              )}
            </React.Fragment>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="fixed w-full bottom-5">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-3/4 p-3 border border-gray-300 rounded-l"
          />
          <button
            type="submit"
            className="bg-gray-600 text-lg text-gray-300 hover:text-white px-6 py-3 rounded-r"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default BatchChat;
