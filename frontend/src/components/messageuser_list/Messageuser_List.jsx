import React from 'react';
import './Messageuser_List.css'
import messageuserlogo from '../../assets/image/user-image.jpg';

const Messageuser_List = () => {
  return (
    <div>
       <div className="message-container" style={{backgroundColor:"white"}}>
           <div className="message-header d-flex align-items-center justify-content-between">
              <div>
                <div>
                    <img src={messageuserlogo} alt="message-user-logo" />
                </div>
              </div>
              <div></div>
           </div>
       </div>
    </div>
  );
}

export default Messageuser_List;
