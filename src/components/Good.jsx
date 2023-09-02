import React from "react";

export const Good = ({ good }) => {
  return (
    <div className="good">
        <p className="goodField">{good.name}</p>
        {
            good.items.map((desc, key) =>{
                return <p className="goodField" key={key}>{desc}</p>;
            })
        }
        <p className="goodField">{good.amount}元</p>
    </div>
  );
};