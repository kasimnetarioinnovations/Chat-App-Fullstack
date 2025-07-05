import React from "react";
import { CiCamera } from "react-icons/ci";
import { GrGallery } from "react-icons/gr";
import { MdOutlineAudiotrack } from "react-icons/md";
import { VscLocation } from "react-icons/vsc";
import { RiUserFollowLine } from "react-icons/ri";
import './sendFileModel.css';

const SendFileModel = () => {
  return (
    <div>
      <div
        className="send-file-container"
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
          <label for="file-upload2" className="custom-file-upload2"><CiCamera  style={{color:"#4a4848"}}/> <span style={{color:"#4a4848"}}>Camera</span></label>
          <input id="file-upload2" type="file" accept="image/*;capture=camera" style={{color:"#4a4848"}} />
        </div>
        <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
          <label for="file-upload3" className="custom-file-upload3"><GrGallery style={{color:"#4a4848"}}/> Gallery</label>
          <input id="file-upload3" type="file" accept=".jpg,.jpeg,.pdf" style={{color:"#4a4848"}} />
        </div>
        <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
          <MdOutlineAudiotrack  style={{color:"#4a4848"}}/>
          <span style={{color:"#4a4848"}}>Audio</span>
        </div>
        <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
          <VscLocation  style={{color:"#4a4848"}}/>
          <span style={{color:"#4a4848"}}>Location</span>
        </div>
        <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
          <RiUserFollowLine  style={{color:"#4a4848"}}/>
          <span style={{color:"#4a4848"}}>Contact</span>
        </div>
      </div>
    </div>
  );
};

export default SendFileModel;
