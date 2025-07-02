import React, { useState } from "react";
import "./Messageuser_List.css";
import message_user_logo from "../../assets/image/user-image.jpg";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import HeaderNotificationSetting_Model from "./HeaderNotificationSetting_Model";
import { IoCheckmarkDone } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { GrEmoji } from "react-icons/gr";
import { CiFolderOn } from "react-icons/ci";
import { BsSend } from "react-icons/bs";
import SendFileModel from "./SendFileModel";

const Messageuser_List = () => {
  const [clickDropdown, setClickDropdown] = useState();
  const [clickDropdowntwo, setClickDropdownTwo] = useState();
  return (
    <div>
      <div
        className="message-container"
        style={{
          backgroundColor: "white",
          height: "800px",
          position: "relative",
        }}
      >
        <div
          className="message-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 10px",
            borderBottom: "1px solid #e7e0e0",
          }}
        >
          <div className="d-flex gap-2">
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                position: "relative",
              }}
            >
              <img
                src={message_user_logo}
                alt="message-user-logo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
              <div
                style={{
                  backgroundColor: "green",
                  borderRadius: "50%",
                  width: "7px",
                  height: "7x",
                  padding: "6px",
                  position: "absolute",
                  right: "0px",
                  bottom: "0px",
                  border: "2px solid white",
                }}
              ></div>
            </div>
            <div>
              <strong>Anthony Lewis</strong>
              <p style={{ marginBottom: "0", color: "grey" }}>Online</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ fontSize: "20px", color: "grey" }}>
              <IoIosSearch />
            </span>
            <span
              onClick={() => setClickDropdown(!clickDropdown)}
              style={{ color: "grey", position: "relative" }}
            >
              <HiOutlineDotsVertical className="threedot-setting" />
            </span>
            {clickDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "50px",
                  right: "10px",
                  zIndex: "100",
                }}
              >
                <HeaderNotificationSetting_Model />
              </div>
            )}
          </div>
        </div>

        <div className="message-chat-box" style={{ padding: "20px 90px",}}>
          <div className="you-message-conatiner d-flex justify-content-end  position-relative">
            <div
              className="message-box"
              style={{
                backgroundColor: "#f3f2f2",
                width: "500px",
                borderRadius: "5px",
                padding: "5px 12px",
              }}
            >
              <p className="mb-0">
                Hi, this is Mark from freshmart. I'm reaching out to confirm
                this week's delivery schedule.
              </p>
            </div>
            <div
              style={{
                position: "absolute",
                top: "50px",
                right: "-70px",
                display: "flex",
                alignItems: "end",
                gap: "8px",
              }}
            >
              <span style={{ color: "grey" }}>
                <IoCheckmarkDone style={{ color: "green" }} /> 08:00 AM
                <GoDotFill style={{ color: "#e3e0e0" }} />
                <span style={{ color: "black" }}>You</span>
              </span>
              <span className="d-flex gap-3">
                {" "}
                <span
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                >
                  <img
                    src={message_user_logo}
                    alt="message-user-logo"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </span>
              </span>
            </div>
          </div>

          <div className="other-message-conatiner py-5  position-relative">
            <div
              className="message-box"
              style={{
                backgroundColor: "#f3f2f2",
                width: "500px",
                borderRadius: "5px",
                padding: "5px 12px",
              }}
            >
              <p className="mb-0">
                Hi, Mark, good to hear from you! Your delivery is schedule for
                Friday at 10:00 AM. Is that time still convenient for you?
              </p>
            </div>
            <div
              style={{
                position: "absolute",
                top: "100px",
                left: "-70px",
                display: "flex",
                alignItems: "end",
                gap: "8px",
              }}
            >
              <span>
                {" "}
                <span
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                >
                  <img
                    src={message_user_logo}
                    alt="message-user-logo"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      paddingLeft: "3px",
                    }}
                  />
                </span>
              </span>

              <span style={{ color: "grey" }}>
                <span style={{ color: "black" }}>Anthony Lewis</span>
                <GoDotFill style={{ color: "#e3e0e0" }} />
                08:00 AM
                <IoCheckmarkDone style={{ color: "green" }} />
              </span>
            </div>
          </div>

          <div className="message-date d-flex justify-content-center align-items-center">
            <hr style={{ width: "100% " }} />
            <div
              style={{
                width: "300px",
                backgroundColor: "#1b2a52",
                color: "white",
                padding: "5px 10px",
                borderRadius: "20px",
                textAlign: "center",
              }}
            >
              Today, July 02
            </div>
            <hr style={{ width: "100% " }} />
          </div>
        </div>
        <div style={{ padding: "10px", position: "fixed", bottom: "20px" }}>
          <div
            className="message-send-container"
            style={{
              backgroundColor: "#f7f7f7",
              width: "75.36vw",
              border: "1px solid #e7e0e0",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 10px",
              position:"relative"
            }}
          >
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <MdOutlineKeyboardVoice style={{ fontSize: "25px" }} />
              {/* <span >Type Your Message</span> */}
              <input
                style={{
                  width: "100%",
                  height: "auto",
                  backgroundColor: "#f7f7f7",
                  color: "grey",
                  fontSize: "13px",
                  border: "none",
                  outline: "none",
                }}
                type="text"
                placeholder="Type Your Message"
              />
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <GrEmoji style={{ fontSize: "20px" }} />
              <CiFolderOn style={{ fontSize: "20px" }} />
              <span
                onClick={() => setClickDropdownTwo(!clickDropdowntwo)}
                style={{ color: "grey", position: "relative" }}
              >
                <HiOutlineDotsVertical style={{ fontSize: "20px" }} />
              </span>
               {clickDropdowntwo && (
              <div
                style={{
                  position: "absolute",
                  top: "-200px",
                  right: "70px",
                  zIndex: "100",
                }}
              >
                <SendFileModel/>
              </div>
            )}
              <span
                style={{
                  backgroundColor: "#fe9f43",
                  color: "white",
                  padding: "8px 15px",
                  borderRadius: "10px",
                }}
              >
                <BsSend />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messageuser_List;
