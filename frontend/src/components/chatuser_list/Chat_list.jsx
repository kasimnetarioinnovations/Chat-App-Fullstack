import React from 'react';
import './Chat_list.css'
import { CiSearch } from "react-icons/ci";

const Chat_list = () => {
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

      {/* user list */}
      <div className='chat-list-user'>

        {/* image name text*/}
        <div>
          <div>
            <img src={{}} alt="profile image" />
          </div>

          <div>
          <span>Name</span>
          <span>text</span>
          </div>

        </div>

        {/* timing */}
        <div>
          <span>Time</span>
          <span>52</span>
        </div>

      </div>

    </div>
  );
}

export default Chat_list;
