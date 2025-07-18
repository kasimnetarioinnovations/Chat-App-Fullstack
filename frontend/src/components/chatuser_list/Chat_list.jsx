// import React, { useEffect, useState } from "react";
// import "./Chat_list.css";
// import { CiSearch } from "react-icons/ci";
// import messageuserlogo from "../../assets/image/user-image.jpg";
// import { io } from "socket.io-client";

// const Chat_list = ({ onUserSelect }) => {
//   const backendurl = import.meta.env.VITE_BACKEND_URL;
//   // const socket = io(import.meta.env.VITE_BACKEND_URL);

//   const [user, setUser] = useState([]);

//   const [error, setError] = useState("");
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [lastMessages, setLastMessages] = useState([]);

//   const fetchUser = () => {
//     fetch(`${backendurl}/user/list`)
//       .then((res) => res.json())
//       .then((data) => {
//         setUser(data.user);
//       })
//       .catch((error) => {
//         setError("Server Response : " + error.message);
//       });
//   };
// //  useEffect(() => {
// //   fetchUser();
// // }, []);
// useEffect(() => {
//   if (currentUser && currentUser._id) {
//     fetchUser();
//     fetchLastMessages();
//   }
// }, []);

//    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   useEffect(() => {
//   const socket = io(import.meta.env.VITE_BACKEND_URL);

//   socket.emit("user-connected", currentUser._id); // Send current user ID

//  socket.on("update-user-status", (users) => {
//   setOnlineUsers(users);
// });

//   return () => {
//     socket.disconnect(); // Clean up
//   };
// }, []);
// const isUserOnline = (userId) => {
//   return onlineUsers.includes(userId);
// };

//   // ✅ Filter logic to hide current user on this system only
//   const filteredUsers = user.filter((u) => u._id !== currentUser?._id);

//   const handleImageClick = (userId) => {
//   const input = document.createElement('input');
//   input.type = 'file';
//   input.accept = 'image/*';

//   input.onchange = async () => {
//     const file = input.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const res = await fetch(`${backendurl}/user/upload/${userId}`, {
//         method: 'POST',
//         body: formData
//       });
//       if (res.ok) {
//         fetchUser(); // Refresh user list with new image
//       }
//     } catch (err) {
//       console.error("Upload failed", err);
//     }
//   };

//   input.click();
// };

// const fetchLastMessages = () => {
//   fetch(`${backendurl}/chat/last-messages`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ userId: currentUser._id }),
//   })

//     .then((res) => res.json())
//     .then((data) => {
//       setLastMessages(data);
//     })
//     .catch((err) => {
//       console.error("Error fetching last messages:", err);
//     });
// };

// useEffect(() => {
//   fetchUser();
//   fetchLastMessages();
// }, []);
// const getLastMessageData = (userId) => {
//   return lastMessages.find((msg) => msg.userId === userId);
// };

//   return (
//     <div className="chat-list-header">
//       {/* header */}
//       <div>
//         <span className="chat-list-name">Chats</span>
//       </div>

//       {/* search bar */}
//       <div className="chat-list-search-box">
//         <input
//           type="text"
//           placeholder="Search for Contacts or Messages"
//           className="chat-list-search-input"
//         />
//         <CiSearch />
//       </div>

//       <div className="chat-list-usersection">
//         {error && <p>{error}</p>}

//         {filteredUsers.map((users) => (
//           <div
//             className="chat-list-user"
//             key={users._id}
//             onClick={() => onUserSelect(users)}
//           >
//             {/* image name text*/}
//             <div className="chat-list-user-leftbox  position-relative">
//               <div
//                 className="chat-list-user-image-box"
//                 onClick={() => handleImageClick(users._id)}
//               >
//                 {users.image ? (
//                   <img
//                     src={`${backendurl}/uploads/${users.image}`}
//                     alt={users.name}
//                     className="chat-list-user-image"
//                   />
//                 ) : (
//                   <div className="user-initials">
//                     {users.name.slice(0, 2).toUpperCase()}
//                   </div>
//                 )}

//               </div>
//                 <div
//               style={{
//                 backgroundColor: "green",
//                 borderRadius: "50%",
//                 width: "7px",
//                 height: "7x",
//                 padding: "6px",
//                 position: "absolute",
//                 left: "30px",
//                 bottom: "0px",
//                 border: "2px solid white",
//                 zIndex:"1px"
//               }}
//             ></div>
//               <div>
//                 <div>
//                   <span className="txt0">
//                     <b>{users.name}</b>
//                   </span>
//                 </div>
//                 <div style={{ marginTop: "-8px" }}>
//                   <span className="txt">is typing ...</span>
//                 </div>
//               </div>
//             </div>

//             {/* timing */}
//             <div className="chat-list-user-rightbox">
//               <span className="txt">02:35 AM</span>
//               <br />
//               <span
//                 className="txt"
//                 style={{ display: "flex", justifyContent: "end" }}
//               >
//                 52
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Chat_list;

import React, { useEffect, useState } from "react";
import "./Chat_list.css";
import { CiSearch } from "react-icons/ci";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

const Chat_list = ({ onUserSelect }) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  // ✅ Parse currentUser safely before using it
  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch {
      return null;
    }
  })();

  const [user, setUser] = useState([]);
  const [error, setError] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);

  const fetchUser = () => {
    fetch(`${backendurl}/user/list`)
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch((err) => setError("Server Response: " + err.message));
  };

  const fetchLastMessages = () => {
    if (!currentUser?._id) return;
    fetch(`${backendurl}/chat/last-messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser._id }),
    })
      .then((res) => res.json())
      .then((data) => setLastMessages(data))
      .catch((err) => console.error("Error fetching last messages:", err));
  };

  // ✅ Load initial data if currentUser exists
  useEffect(() => {
    if (currentUser?._id) {
      fetchUser();
      fetchLastMessages();
    }
  }, [currentUser]);

  // ✅ Set up socket for user presence
  // useEffect(() => {
  //   if (!currentUser?._id) return;

  //   const socket = io(backendurl);
  //   socket.emit("user-connected", currentUser._id);
  //   socket.on("update-user-status", (users) => setOnlineUsers(users));

  //   return () => socket.disconnect();
  // }, [currentUser]);
  useEffect(() => {
    if (!currentUser?._id) return;

    const socket = io(backendurl);
    socket.emit("user-connected", currentUser._id);
    socket.on("update-user-status", (users) => setOnlineUsers(users));

    // 👇 Add this to listen for new messages and update the last message list
    socket.on("receive-message", () => {
      fetchLastMessages(); // Refresh the last messages
    });

    return () => socket.disconnect();
  }, [currentUser]);

  const filteredUsers = user.filter((u) => u._id !== currentUser?._id);

  const handleImageClick = (userId) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const form = new FormData();
      form.append("image", file);

      try {
        const res = await fetch(`${backendurl}/user/upload/${userId}`, {
          method: "POST",
          body: form,
        });
        if (res.ok) fetchUser();
      } catch (err) {
        console.error("Upload failed", err);
      }
    };

    input.click();
  };

  const isUserOnline = (userId) => onlineUsers.includes(userId);

  const getLastMessageData = (userId) =>
    lastMessages.find((msg) => msg.userId === userId) || {};

  // ✅ Early return if no user logged in
  if (!currentUser?._id) {
    return <p>Please <Link to="/register">login</Link> to view your chats.</p>;
  }

  return (
    <div className="chat-list-header">
      <div>
        <span className="chat-list-name">Chats</span>
      </div>

      <div className="chat-list-search-box">
        <input
          type="text"
          placeholder="Search for Contacts or Messages"
          className="chat-list-search-input"
        />
        <CiSearch />
      </div>

      {/* users */}
      <div className="chat-list-usersection">
        {error && <p>{error}</p>}

        {filteredUsers.map((u) => {
          const last = getLastMessageData(u._id);
          return (
            <div
              className="chat-list-user"
              key={u._id}
              onClick={() => onUserSelect(u)}
            >
              <div className="chat-list-user-leftbox position-relative">
                <div
                  className="chat-list-user-image-box"
                  onClick={() => handleImageClick(u._id)}
                >
                  {u.image ? (
                    <img
                      // src={`${backendurl}/uploads/${u.image}`}
                      // alt={u.name}
                      // className="chat-list-user-image"
                      src={`${backendurl}/uploads/${
                        u.image
                      }?timestamp=${Date.now()}`}
                      alt={u.name}
                      className="chat-list-user-image"
                    />
                  ) : (
                    <div className="user-initials">
                      {u.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    backgroundColor: isUserOnline(u._id) ? "green" : "gray",
                    borderRadius: "50%",
                    width: "7px",
                    height: "7px",
                    padding: "6px",
                    position: "absolute",
                    left: "30px",
                    bottom: "0px",
                    border: "2px solid white",
                    zIndex: "1",
                  }}
                />
                <div>
                  <div>
                    <span className="txt0">
                      <b>{u.name}</b>
                    </span>
                  </div>
                  <div style={{ marginTop: "-8px" }}>
                    <span className="txt">
                      {last.text
                        ? last.text.slice(0, 30) +
                          (last.text.length > 30 ? "…" : "")
                        : "No messages yet"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="chat-list-user-rightbox">
                <span className="txt">
                  {last.timestamp
                    ? new Date(last.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
                <br />
                {last.unreadCount > 0 && (
                  <span
                    className="txt"
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      fontWeight: "bold",
                    }}
                  >
                    {last.unreadCount}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chat_list;
