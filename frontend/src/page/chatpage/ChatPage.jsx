import React from "react";
import Chat_list from "../../components/chatuser_list/Chat_list";
import { SlRefresh } from "react-icons/sl";
import { RiArrowDropUpLine } from "react-icons/ri";
import Messageuser_List from "../../components/messageuser_list/Messageuser_List";

const ChatPage = () => {
  return (
    <div>
      <div style={{ backgroundColor: "#f7f7f7" }}>
        <div className="chat-header d-flex justify-content-between align-items-center px-4 py-2">
          <div>
            <strong style={{fontSize:"22px", color:"#304154"}}>Chat</strong>
            <p style={{color:"#a7acb2"}}>Manage your chats</p>
          </div>
          <div className="d-flex gap-2">
            <span style={{backgroundColor:"white", padding:"6px 10px", borderRadius:"5px", border:"1px solid rgb(227 221 221)"}}><SlRefresh /></span>
            <span style={{backgroundColor:"white", padding:"6px 10px", borderRadius:"5px", border:"1px solid rgb(227 221 221)"}}><RiArrowDropUpLine /></span>
          </div>
        </div>

        <div className="message-box-container d-flex px-4 py-2 gap-5">
          <div className="">
            <Chat_list />
          </div>
          <div className="w-100"><Messageuser_List/></div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
