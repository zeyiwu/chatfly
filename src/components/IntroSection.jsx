import React from "react";
import BotResponse from "./BotResponse";

const IntroSection = () => {



  return (
    <div id="introsection">
      <h1>
        CDog-ChatAI
        <BotResponse response=" - AI 机器人" />
      </h1>
      <h2>原生ChatGPT体验</h2>
      功能:
      <ul>
        <li>回答问题，写文章，搜文献，写文案</li>
        <li>人类文明最顶尖的智能</li>
        <li>主动学习，持续升级中</li>
        <li>数据加密，保护隐私</li>
        <li>更多功能开发中</li>
      </ul>
      <p>内测期间新用户可免费使用3次，每天赠送1次！</p>
    </div>
  );
};

export default IntroSection;
