import React from 'react';
import './Chat_list.css'
import { CiSearch } from "react-icons/ci";
import messageuserlogo from '../../assets/image/user-image.jpg';

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
        <div className='chat-list-user-leftbox'>

          <div className='chat-list-user-image-box'>
            <img src={messageuserlogo} alt="profile image"  className='chat-list-user-image' />
          </div>

          <div>
          <div>
          <span className='txt0'><b>Anthony Lewis</b></span>
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

    </div>
  );
}

export default Chat_list;
