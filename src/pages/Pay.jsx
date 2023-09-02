import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Good } from "../components/Good"

export const PayView=()=> {
  const { currentUser } = useContext(AuthContext);
  const [goodList, setGoodList] = useState([{'name':'基础版', 'items':['GPT-3.5 300次', 'GPT-4 30次', '文心一言不限次数'], 'amount':30}]);
  const [choiceGood, setChoiceGood] = useState([goodList[0]]);
    return (
    <div className='payDonate'>
      <h4>在线充值</h4>
      <div className='payGoodList'>
        {
          goodList.map((good, idx) => (
            <div key={idx}>
              <Good good={good}></Good>
            </div> 
          ))
        }
      </div>
      <div className='payChannel'>
        <div>
        <img
          src="/wechatPay.png"
          alt="wechat pay"
          style={{
            height: "40px",
            position: "relative",
            left: "4px",
            display: "block",
          }}
        />
        </div>
        <button type="button" className='paySub'>
            <span>立即充值</span>
        </button>
      </div>

    </div>
  )
}