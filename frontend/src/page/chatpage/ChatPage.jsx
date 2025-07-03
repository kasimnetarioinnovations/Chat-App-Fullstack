import React, {useState} from "react";
import Chat_list from "../../components/chatuser_list/Chat_list";
import { SlRefresh } from "react-icons/sl";
import { RiArrowDropUpLine } from "react-icons/ri";
import Messageuser_List from "../../components/messageuser_list/Messageuser_List";

const ChatPage = () => {
  const [messageUserList, setMessageUserList] =useState ()
   const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <div style={{ backgroundColor: "#f7f7f7", height:"100vh"}}>
        <div className="chat-header d-flex justify-content-between align-items-center px-4 py-2">
          <div>
            <strong style={{fontSize:"22px", color:"#304154"}}>Chat</strong>
            <p style={{color:"#a7acb2"}}>Manage your chats</p>
          </div>
          <div className="d-flex gap-2">
            <span onClick={() => window.location.reload()} style={{backgroundColor:"white", padding:"6px 10px", borderRadius:"5px", border:"1px solid rgb(227 221 221)", cursor:"pointer"}}><SlRefresh /></span>
            <span style={{backgroundColor:"white", padding:"6px 10px", borderRadius:"5px", border:"1px solid rgb(227 221 221)"}}><RiArrowDropUpLine /></span>
          </div>
        </div>

        <div className="message-box-container d-flex px-4 py-2 gap-4">
          <div  onClick={setMessageUserList} className="" style={{cursor:"pointer"}}>
            <Chat_list onUserSelect={setSelectedUser}/>
          </div>
          {selectedUser && (
  <Messageuser_List selectedUser={selectedUser} />
)}
           
           
          {/* <div className="w-100 d-none"><Messageuser_List/></div> */}

          
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
