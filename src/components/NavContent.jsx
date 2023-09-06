import React from "react";
import NavLinksContainer from "./NavLinksContainer";
import NavPrompt from "./NavPrompt";
import NewChat from "./NewChat";

const NavContent = ({ chatLog, setChatLog, setShowMenu, chatModel, setChatModel }) => {
  return (
    <>
      <NewChat chatLog={chatLog} setChatLog={setChatLog} setShowMenu={setShowMenu} />
      <div className="navPromptWrapper">
        {chatLog.map(
          (chat, idx) =>
            chat.botMessage && (
              <NavPrompt chatPrompt={chat.chatPrompt} key={idx} />
            )
        )}
      </div>
      <NavLinksContainer chatLog={chatLog} setChatLog={setChatLog} chatModel={chatModel} setChatModel={setChatModel} />
    </>
  );
};

export default NavContent;
