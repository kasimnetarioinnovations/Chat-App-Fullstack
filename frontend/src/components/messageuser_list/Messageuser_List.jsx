import React, { useState, useEffect } from "react";
import "./Messageuser_List.css";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import HeaderNotificationSetting_Model from "./HeaderNotificationSetting_Model";
import { IoCheckmarkDone } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { GrEmoji } from "react-icons/gr";
import { CiFolderOn } from "react-icons/ci";
import { BsSend } from "react-icons/bs";
import SendFileModel from "./SendFileModel";
import { io } from "socket.io-client";


const Messageuser_List = ({ selectedUser }) => {
  const [clickDropdown, setClickDropdown] = useState();
  const [clickDropdowntwo, setClickDropdownTwo] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);

  const person = selectedUser?._id;
  const personname = selectedUser?.name;
  const profileimage = selectedUser?.image;

  const currentuser = JSON.parse(localStorage.getItem("currentUser"));
  const user = currentuser._id;
  
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: currentuser._id }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (currentuser?._id) {
      fetchUserData();
    }
  }, [currentuser]);

  const [msg, setText] = useState("");

  const [chat, setChat] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // const socket = io(import.meta.env.VITE_BACKEND_URL);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch(${backendUrl}/chat/sendmsg, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         user,
  //         person,
  //         msg: Array.isArray(msg) ? msg : [msg], // Ensure text is an array
  //       }),
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       setMessage("Message Send");
  //       setText("");
  //     } else {
  //       setMessage("Server Response : " + data.error || "Error");
  //     }
  //   } catch (error) {
  //     setMessage("Error : " + error.message);
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!msg.trim()) return;

  try {
    const res = await fetch(`${backendUrl}/chat/sendmsg`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user,
        person,
        msg: [msg],
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setText("");         // clear input
      fetchChat();         // reload messages from backend after send
    } else {
      setError("Server Response: " + (data.error || "Error"));
    }
  } catch (error) {
    setError("Error: " + error.message);
  }
};



  //call server to list products
  const fetchChat = () => {
    fetch(`${backendUrl}/chat/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, person }),
    })
      .then((res) => res.json())
      .then((data) => {
        setChat(data.messages);
      })
      .catch((error) => {
        setError("Server Response : " + error.message);
      });
  };

  //to fetch list of products
  // useEffect(() => {
  //   fetchChat();
  // });
  useEffect(() => {
  fetchChat();
}, [person]);
//   useEffect(() => {
//   const socket = io(import.meta.env.VITE_BACKEND_URL);

//   socket.emit("user-connected", currentuser._id); // Send current user ID

//  socket.on("update-user-status", (users) => {
//   setOnlineUsers(users);
// });

//   return () => {
//     socket.disconnect(); // Clean up
//   };
// }, []);
useEffect(() => {
  const socket = io(import.meta.env.VITE_BACKEND_URL);

  socket.emit("user-connected", currentuser._id);

  socket.on("update-user-status", (users) => {
    setOnlineUsers(users);
  });

  // 👇 New: Listen for incoming messages
  socket.on("receive-message", (newMessage) => {
    setChat((prev) => [...prev, newMessage]);
  });

  return () => {
    socket.disconnect();
  };
}, []);


const isUserOnline = (userId) => {
  return onlineUsers.includes(userId);
};


  return (
    <div className="w-100">
      <div
        className="message-container"
        style={{
          backgroundColor: "white",
          height: "85vh",
          position: "relative",
        }}
      >
        <div
          className="message-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 10px",
            borderBottom: "1px solid #e7e0e0",
          }}
        >
          <div className="d-flex gap-2">
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                position: "relative",
              }}
            >
                {profileimage ? (  
                <img
                  src={`${backendUrl}/uploads/${profileimage}`}
                  alt={user.name}
                  className=""
                  style={{width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%"}}
                />
                  ) : (
                    <div className="user-initials" style={{width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%"}}>
                      {selectedUser && selectedUser.name ? selectedUser.name.slice(0, 2).toUpperCase() : ""}
                    </div>
                  )}

              <div
                style={{
                  backgroundColor: isUserOnline(selectedUser._id) ? "green" : "grey",
                  borderRadius: "50%",
                  width: "7px",
                  height: "7x",
                  padding: "6px",
                  position: "absolute",
                  right: "0px",
                  bottom: "0px",
                  border: "2px solid white",
                }}
              ></div>
            </div>
            <div>
              <strong>{personname}</strong>
              <p style={{ marginBottom: "0", color: "grey" }}>{isUserOnline(selectedUser._id) ? "Online" : "Offline"}</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ fontSize: "20px", color: "grey" }}>
              <IoIosSearch />
            </span>
            <span
              onClick={() => setClickDropdown(!clickDropdown)}
              style={{ color: "grey", position: "relative" }}
            >
              <HiOutlineDotsVertical className="threedot-setting" />
            </span>
            {clickDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "50px",
                  right: "10px",
                  zIndex: "100",
                }}
              >
                <HeaderNotificationSetting_Model />
              </div>
            )}
          </div>
        </div>

        <div className="message-chat-box" style={{ padding: "20px 90px",}}>
          
          {Array.isArray(chat) && chat.map((msg, index) => (
            <div
              className={
                msg.sender === user
                  ? "you-message-conatiner d-flex justify-content-end position-relative"
                  : "other-message-conatiner d-flex justify-content-start position-relative"
              }
              key={msg._id || index}
              style={{
                marginBottom: "10px",
              }}
            >
              {msg.sender !== user && (
                <span
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                >

                {profileimage ? (  
                <img
                  src={`${backendUrl}/uploads/${profileimage}`}
                  alt={user.name}
                  className=""
                  style={{width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%"}}
                />
                  ) : (
                    <div className="user-initials" style={{width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%"}}>
                      {selectedUser && selectedUser.name ? selectedUser.name.slice(0, 2).toUpperCase() : ""}
                    </div>
                )}

                </span>
              )}

              <div>
              <div className="message-box">
                <p className="mb-0">{msg.text}</p>
              </div>
              <div style={{ fontSize: "11px", color: "#888", marginTop: "4px", textAlign: msg.sender === user ? "right" : "left", marginRight: msg.sender === user ? "-40px" : "0px", marginLeft: msg.sender === user ? "" : "-40px" }}>
                  {msg.timestamp && new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {" · "}
                  {msg.sender === user ? "You" : selectedUser?.name}
              </div>
              </div>
                
                
              {msg.sender === user && (
                <span
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginLeft: "10px",
                  }}
                >

                {userData && userData.user && userData.user.image ? (  
                <img
                  src={`${backendUrl}/uploads/${userData.user.image}`}
                  alt={userData.user.name}
                  className=""
                  style={{width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%"}}
                />
                  ) : (
                    <div className="user-initials" style={{width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%"}}>
                      {userData && userData.user && userData.user.name ? userData.user.name.slice(0, 2).toUpperCase() : ""}
                    </div>
                )}

                </span>
              )}
            </div>
          ))}

          {/* <div className="message-date d-flex justify-content-center align-items-center">
            <hr style={{ width: "100% " }} />
            <div
              style={{
                width: "300px",
                backgroundColor: "#1b2a52",
                color: "white",
                padding: "5px 10px",
                borderRadius: "20px",
                textAlign: "center",
              }}
            >
              Today, July 02
            </div>
            <hr style={{ width: "100% " }} />
          </div> */}

          {error && <p style={{ textAlign: "center" }}>{error}</p>}
        </div>

        <div
          style={{
            width: "100%",
            padding: "10px",
            position: "absolute",
            bottom: "5px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div
              className="message-send-container"
              style={{
                backgroundColor: "#f7f7f7",
                // width: "75.36vw",
                border: "1px solid #e7e0e0",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 10px",
                position: "relative",
              }}
            >
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <MdOutlineKeyboardVoice style={{ fontSize: "25px" }} />
                {/* <span >Type Your Message</span> */}
                <input
                  style={{
                    width: "100%",
                    height: "auto",
                    backgroundColor: "#f7f7f7",
                    color: "grey",
                    fontSize: "13px",
                    border: "none",
                    outline: "none",
                  }}
                  type="text"
                  placeholder="Type Your Message"
                  value={msg}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div
                style={{ display: "flex", gap: "12px", alignItems: "center" }}
              >
                <GrEmoji style={{ fontSize: "20px" }} />
                <CiFolderOn style={{ fontSize: "20px" }} />
                <span
                  onClick={() => setClickDropdownTwo(!clickDropdowntwo)}
                  style={{ color: "grey", position: "relative" }}
                >
                  <HiOutlineDotsVertical style={{ fontSize: "20px" }} />
                </span>
                {clickDropdowntwo && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-200px",
                      right: "70px",
                      zIndex: "100",
                    }}
                  >
                    <SendFileModel />
                  </div>
                )}
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#fe9f43",
                    color: "white",
                    padding: "8px 15px",
                    borderRadius: "10px",
                    border:"none"
                  }}
                >
                  <BsSend />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messageuser_List;