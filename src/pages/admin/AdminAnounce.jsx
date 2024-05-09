import React, { useState, useEffect, useRef } from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";
import axios from "../../services/axiosService";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { io } from "socket.io-client";

function AdminAnounce() {
  const [announcement, setAnnouncement] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const socket = useRef(null);
  const [expandedMessageId, setExpandedMessageId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [announcementToRemove, setAnnouncementToRemove] = useState(null);

  const handleExpandMessage = (messageId) => {
    setExpandedMessageId(messageId === expandedMessageId ? null : messageId);
  };

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_SERVER_URL);
    socket.current.on("connect", () => {
      console.log(socket.current.id, "Socket Id ");
    });
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get("/admin/get-announcements");
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

  const handleAnnouncementChange = (e) => {
    setAnnouncement(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const announcementText = announcement.replace(/\n/g, "<br>");
      const announcementData = {
        announcement: announcementText,
        date: new Date(),
      };
      const response = await axios.post(
        "/admin/add-announcement",
        announcementData
      );
      socket.current.emit("createAnnouncement", announcementData);
      fetchAnnouncements();
      setAnnouncement("");
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  };

  const handleRemoveAnnouncement = async (id) => {
    setAnnouncementToRemove(id);
    setIsOpen(true);
  };

  const confirmRemoveAnnouncement = async () => {
    try {
      await axios.delete(`/admin/remove-announcement/${announcementToRemove}`);
      fetchAnnouncements();
    } catch (error) {
      console.error("Error removing announcement:", error);
    }
    setIsOpen(false);
  };

  function truncateMessage(message, maxLength) {
    if (message.length <= maxLength) return message;
    return message.slice(0, maxLength) + "...";
  }

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="container mx-auto px-4 py-8 ml-56">
        <h2 className="text-3xl font-semibold mb-6 text-white">
          Announcements
        </h2>
        <div className="flex flex-col md:flex-row justify-start mt-5">
          <div className="w-full lg:w-3/4 bg-gray-200 p-10 rounded-md shadow-md mb-6">
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="mb-4">
                <label
                  htmlFor="announcement"
                  className="block text-lg font-medium text-gray-700 mb-3"
                >
                  Announcement:
                </label>
                <textarea
                  id="announcement"
                  value={announcement}
                  onChange={handleAnnouncementChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700"
                  placeholder="Write your announcement..."
                  rows={6}
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-zinc-700 text-white px-4 py-2 rounded-md hover:bg-zinc-800"
                >
                  Submit Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-3 text-white">
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
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 mt-5 absolute bottom-0 right-0 mb-3 mr-3"
                  onClick={() => handleRemoveAnnouncement(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <Popup
          open={isOpen}
          closeOnDocumentClick
          onClose={() => setIsOpen(false)}
          modal
        >
          <div className="p-5">
            <p className="text-lg font-semibold text-gray-700">
              Are you sure you want to remove this announcement?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-600 text-white hover:bg-red-700 font-bold py-1 px-2 mr-2 rounded-md"
                onClick={confirmRemoveAnnouncement}
              >
                Yes
              </button>
              <button
                className="bg-zinc-600 text-white hover:bg-zinc-700 font-bold py-1 px-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
}

export default AdminAnounce;
