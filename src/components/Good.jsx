import React from "react";

export const Good = ({ good }) => {
  return (
    <div className="Good">
        <p className="goodField">{good.name}</p>
        {
            good.items.map((desc, key) =>{
                return <p className="goodField" key={key}>{desc}</p>;
            })
        }
        <p className="goodField">{good.amount}</p>
    </div>
  );
};