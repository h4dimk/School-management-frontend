import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../../services/axiosService";
import ChatMessage from "../../components/common/ChatMessage";
import OtherChatMessage from "../../components/common/OtherChatMessage";
import StudentSideBar from "../../components/student/StudentSideBar";
import { io } from "socket.io-client";

function BatchChat() {
  const { currentUser } = useSelector((state) => state.user);
  const socket = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:3000");
    socket.current.on("connect", () => {
      console.log(socket.current.id, "Socket Id ");
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);
  useEffect(() => {
    socket.current.on("newMessage", (messages) => {
      setMessages((prevMessages) => [...prevMessages, messages]);
    });

    return () => {
      socket.current.off("newMessage");
    };
  });

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getMessages = async () => {
    try {
      const response = await axios.get(
        `/student/get-chats/${currentUser.batchId}`
      );
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
    const message = {
      message: newMessage,
      sender: currentUser._id,
      group: currentUser.batchId,
      date: new Date(),
    };
    try {
      await axios.post("/student/add-message", message);
      socket.current.emit("addMessage", message);
      getMessages();
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex">
      <StudentSideBar />
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
        <div className="mt-24 overflow-y-auto mb-8">
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
