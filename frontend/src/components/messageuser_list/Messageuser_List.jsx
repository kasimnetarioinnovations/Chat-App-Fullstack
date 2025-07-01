import React from 'react';
import './Messageuser_List.css'
import message_user_logo  from '../../assets/image/user-image.jpg';
import { IoIosSearch } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";

const Messageuser_List = () => {
  return (
    <div>
       <div className="message-container" style={{backgroundColor:"white"}}>
           <div className="message-header" style={{display:"flex",alignItems:"center", justifyContent:"space-between", padding:"10px 10px"}}>
              <div className='d-flex gap-2'>
                <div style={{ width:"50px", height:"50px", borderRadius:"50%", position:"relative"}}>
                    <img src={message_user_logo} alt="message-user-logo" style={{width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%",}}/>
                     <div style={{backgroundColor:"green", borderRadius:"50%",  width:"7px", height:"7x", padding:"6px", position:"absolute", right:"0px" ,bottom:"0px" ,border:"2px solid white"}}></div>
                </div>
                <div>
                    <strong>Anthony Lewis</strong>
                    <p style={{marginBottom:"0", color:"grey"}}>Online</p>
                </div>
              </div>

              <div style={{display:"flex", alignItems:"center", gap:"20px"}}>
                <span style={{fontSize:"20px", color:"grey"}}><IoIosSearch /></span>
                <span style={{color:"grey"}}><HiOutlineDotsVertical /></span>
              </div>
           </div>
       </div>
    </div>
  );
}

export default Messageuser_List;
