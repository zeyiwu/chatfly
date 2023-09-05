import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NewChat = ({ setChatLog, setShowMenu }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div
      className="sideMenuButton"
      onClick={() => {
        if (!currentUser) {
          navigate("/login");
        } else {
          setChatLog([]);
          setShowMenu(false);
        }
      }}
    >
      <span>+</span>
      新建会话
    </div>
  );
};

export default NewChat;
