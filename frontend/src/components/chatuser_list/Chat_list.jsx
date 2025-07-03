import React, { useEffect, useState } from "react";
import "./Chat_list.css";
import { CiSearch } from "react-icons/ci";
import messageuserlogo from "../../assets/image/user-image.jpg";
import { io } from "socket.io-client";


const Chat_list = ({ onUserSelect }) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  // const socket = io(import.meta.env.VITE_BACKEND_URL);

  const [user, setUser] = useState([]);

  const [error, setError] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);

  const fetchUser = () => {
    fetch(`${backendurl}/user/list`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => {
        setError("Server Response : " + error.message);
      });
  };
 useEffect(() => {
  fetchUser();
}, []);

   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
  const socket = io(import.meta.env.VITE_BACKEND_URL);

  socket.emit("user-connected", currentUser._id); // Send current user ID

 socket.on("update-user-status", (users) => {
  setOnlineUsers(users);
});

  return () => {
    socket.disconnect(); // Clean up
  };
}, []);
const isUserOnline = (userId) => {
  return onlineUsers.includes(userId);
};



 

  // ✅ Filter logic to hide current user on this system only
  const filteredUsers = user.filter((u) => u._id !== currentUser?._id);

  const handleImageClick = (userId) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.onchange = async () => {
    const file = input.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${backendurl}/user/upload/${userId}`, {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        fetchUser(); // Refresh user list with new image
      }
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  input.click();
};

const fetchLastMessages = () => {
  fetch(`${backendurl}/chat/last-messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: currentUser._id }),
  })
    .then((res) => res.json())
    .then((data) => {
      setLastMessages(data);
    })
    .catch((err) => {
      console.error("Error fetching last messages:", err);
    });
};

useEffect(() => {
  fetchUser();
  fetchLastMessages();
}, []);
const getLastMessageData = (userId) => {
  return lastMessages.find((msg) => msg.userId === userId);
};

  return (
    <div className="chat-list-header">
      {/* header */}
      <div>
        <span className="chat-list-name">Chats</span>
      </div>

      {/* search bar */}
      <div className="chat-list-search-box">
        <input
          type="text"
          placeholder="Search for Contacts or Messages"
          className="chat-list-search-input"
        />
        <CiSearch />
      </div>

      <div className="chat-list-usersection">
        {error && <p>{error}</p>}

        {filteredUsers.map((users) => (
          <div
            className="chat-list-user"
            key={users._id}
            onClick={() => onUserSelect(users)}
          >
            {/* image name text*/}
            <div className="chat-list-user-leftbox  position-relative">
              <div
                className="chat-list-user-image-box"
                onClick={() => handleImageClick(users._id)}
              >
                {users.image ? (
                  <img
                    src={`${backendurl}/uploads/${users.image}`}
                    alt={users.name}
                    className="chat-list-user-image"
                  />
                ) : (
                  <div className="user-initials">
                    {users.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                {/* Online/Offline dot */}
                <span
                  style={{
                    position: "absolute",
                    left: "30px",
                    bottom: "0px",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: isUserOnline(users._id) ? "green" : "grey",
                    border: "2px solid white",
                    zIndex: 2
                  }}
                ></span>
              </div>
              <div>
                <div>
                  <span className="txt0">
                    <b>{users.name}</b>
                  </span>
                </div>
                <div style={{ marginTop: "-5px" }}>
                  <span className="txt">
                    {lastMessages[users._id]?.text || ""}
                  </span>
                </div>
              </div>
            </div>

            {/* timing */}
            <div className="chat-list-user-rightbox">
              <span
                className="txt"
                style={{ display: "flex", justifyContent: "end" }}
              >
                {lastMessages[users._id]?.timestamp
                  ? new Date(lastMessages[users._id].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : ""}
              </span>
              <span style={{backgroundColor:'orange',borderRadius:'50%', color:'white', padding:'2px 5px'}}>{totalMessages[users._id] || 0}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat_list;
