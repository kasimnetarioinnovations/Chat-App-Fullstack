import React from "react";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { TbClearAll } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdBlockFlipped } from "react-icons/md";

const HeaderNotificationSetting_Model = () => {
  return (
    <div>
      <div
        className="setting-notification-container"
        style={{
          backgroundColor: "white",
          width: "200px",
          height: "210px",
          border: "1px solid #dfd8d8",
          padding:"10px 15px",
          display:"flex",
          flexDirection:"column",
          gap:"17px"
          
        }}
      >
        <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
          <IoVolumeMuteOutline  style={{color:"#4a4848"}}/>
          <span style={{color:"#4a4848"}}>Mute Notification</span>
        </div>
        <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
          <GoClock style={{color:"#4a4848"}}/>
          <span style={{color:"#4a4848"}}>Disappearing</span>
        </div>
        <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
          <TbClearAll  style={{color:"#4a4848"}}/>
          <span style={{color:"#4a4848"}}>Clear Message</span>
        </div>
        <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
          <RiDeleteBinLine  style={{color:"#4a4848"}}/>
          <span style={{color:"#4a4848"}}>Delete Chat</span>
        </div>
        <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
          <MdBlockFlipped  style={{color:"#4a4848"}}/>
          <span style={{color:"#4a4848"}}>Block</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderNotificationSetting_Model;
