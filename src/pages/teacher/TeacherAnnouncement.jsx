import React, { useEffect, useRef, useState } from "react";
import TeacherSideBar from "../../components/teacher/TeacherSideBar";
import axios from "../../services/axiosService";
import { io } from "socket.io-client";

function TeacherAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const [expandedMessageId, setExpandedMessageId] = useState(null);
  const socket = useRef(null);

  const handleExpandMessage = (messageId) => {
    setExpandedMessageId(messageId === expandedMessageId ? null : messageId);
  };

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_SERVER_URL);

    socket.current.on("newAnnouncement", (announcement) => {
      setAnnouncements((prevAnnouncements) => [
        ...prevAnnouncements,
        announcement,
      ]);
    });
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get("/teacher/get-announcements");
      if (response.data) {
        const announcementsWithLineBreaks = response.data.map((item) => ({
          ...item,
          announcement: item.announcement.replace(/\n/g, "<br>"),
        }));
        setAnnouncements(announcementsWithLineBreaks);
      } else {
        console.error("Response data is null or undefined");
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const truncateMessage = (message, maxLength) => {
    if (!message || message.length <= maxLength) return message;
    return message.slice(0, maxLength) + "...";
  };

  return (
    <div className="flex">
      <TeacherSideBar />
      <div className="container mx-auto px-4 py-8 ml-56">
        <h3 className="text-3xl font-semibold mb-3 text-white">
          Latest Announcements :
        </h3>
        {announcements
          .slice(0)
          .reverse()
          .map((item) => (
            <div
              key={item._id}
              className="mb-4 p-4 border bg-white rounded-md relative"
            >
              <div className="absolute top-0 right-0 mr-4 mt-2 text-gray-500 text-sm">
                {new Date(item.date).toLocaleString()}
              </div>
              <div>
                {expandedMessageId === item._id ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: item.announcement }}
                  />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: truncateMessage(item.announcement, 100),
                    }}
                  />
                )}
              </div>
              {item.announcement.length > 100 && (
                <button
                  className="font-semibold text-sm hover:text-gray-600"
                  onClick={() => handleExpandMessage(item._id)}
                >
                  {expandedMessageId === item._id ? "Read Less" : "Read More"}
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default TeacherAnnouncement;
