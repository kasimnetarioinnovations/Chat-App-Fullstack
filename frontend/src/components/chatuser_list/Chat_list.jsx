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
  });
   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
  const socket = io(import.meta.env.VITE_BACKEND_URL);

  socket.emit("user-connected", currentUser._id); // Send current user ID

  socket.on("getOnlineUsers", (users) => {
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
          <>
            {/* user list */}
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
                  
                </div>
                  <div
                style={{
                  backgroundColor: "green",
                  borderRadius: "50%",
                  width: "7px",
                  height: "7x",
                  padding: "6px",
                  position: "absolute",
                  left: "30px",
                  bottom: "0px",
                  border: "2px solid white",
                  zIndex:"1px"
                }}
              ></div>
                <div>
                  <div>
                    <span className="txt0">
                      <b>{users.name}</b>
                    </span>
                  </div>
                  <div style={{ marginTop: "-8px" }}>
                    <span className="txt">is typing ...</span>
                  </div>
                </div>
              </div>

              {/* timing */}
              <div className="chat-list-user-rightbox">
                <span className="txt">02:35 AM</span>
                <br />
                <span
                  className="txt"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  52
                </span>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Chat_list;
