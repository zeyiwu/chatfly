import React from "react";
import BotResponse from "./BotResponse";

const IntroSection = () => {
  return (
    <div id="introsection">
      <h1>
        FunChat
        <BotResponse response=" - AI 机器人" />
      </h1>
      <h2>
        原生ChatGPT体验 
      </h2>
      功能:
      <ul>
        <li>回答问题，写文章，搜文献，写文案</li>
        <li>数据加密，保护隐私</li>
      </ul>
      <p>
        新用户免费使用!!!
      </p>
    </div>
  );
};

export default IntroSection;
