import React from 'react';
import Chat_list from '../../components/chatuser_list/Chat_list';

const ChatPage = () => {
  return (
    <div>
       <div style={{backgroundColor:"#f7f7f7"}}>
        <div className="chat-header"></div>

        <div className="message-box-container">
            <div>
                <Chat_list/>
            </div>
            <div></div>
        </div>
           
       </div>
    </div>
  );
}

export default ChatPage;
