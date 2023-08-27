import React from "react";
import NavLinksContainer from "./NavLinksContainer";
import NavPrompt from "./NavPrompt";
import NewChat from "./NewChat";

const NavContent = ({ chats, setChats, setChatLog, setChatId, setShowMenu }) => {
  return (
    <>
      <NewChat setChatLog={setChatLog} setShowMenu={setShowMenu} />
      <div className="navPromptWrapper">
        {chats != null && chats.map(
          (chat, idx) =>
            chat.name && (
              <NavPrompt chat={chat} setChatLog={setChatLog} setChatId={setChatId} setShowMenu={setShowMenu} key={idx} />
            )
        )}
      </div>
      <NavLinksContainer chatLog={[]} setChatLog={setChatLog} />
    </>
  );
};

export default NavContent;
