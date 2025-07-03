import React, { useEffect, useState } from 'react';
import './Chat_list.css'
import { CiSearch } from "react-icons/ci";
import messageuserlogo from '../../assets/image/user-image.jpg';

const Chat_list = ({ onUserSelect }) => {
  
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const loginuser = "685a3cba84d4271061452262" // Aditya id

  const [user, setUser] = useState([]);

  const [error, setError] = useState('');

  const fetchUser = () => {
    fetch(`${backendurl}/user/list`)
    .then(res => res.json())
    .then(data => {setUser(data.user);})
    .catch(error => {setError('Server Response : ' + error.message);});
  };
  useEffect(() => { fetchUser(); });

  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // ✅ Filter logic to hide current user on this system only
  const filteredUsers = user.filter(u => u._id !== currentUser?._id)

  return (
    <div className='chat-list-header'>

      {/* header */}
      <div>
        <span className='chat-list-name'>Chats</span>
      </div>

      {/* search bar */}
      <div className='chat-list-search-box'>
        <input type='text' placeholder='Search for Contacts or Messages' className='chat-list-search-input' />
        <CiSearch />
      </div>


      <div className='chat-list-usersection'>
      {error && <p>{error}</p>}

      {filteredUsers.map(users => (
      <>
      {/* user list */}
      <div className='chat-list-user' key={users._id}  onClick={() => onUserSelect(users)}>

        {/* image name text*/}
        <div className='chat-list-user-leftbox'>

          <div className='chat-list-user-image-box'>
            <img src={messageuserlogo} alt="profile image"  className='chat-list-user-image' />
          </div>

          <div>
          <div>
          <span className='txt0'><b>{users.name}</b></span>
          </div>
          <div style={{marginTop:'-8px'}}>
          <span className='txt'>is typing ...</span>
          </div>
          </div>

        </div>

        {/* timing */}
        <div className='chat-list-user-rightbox'>
          <span className='txt'>02:35 AM</span>
          <br/>
          <span className='txt' style={{display:'flex', justifyContent:'end'}}>52</span>
        </div>

      </div>
      </>
      ))}

      </div>

    </div>
  );
}

export default Chat_list;
