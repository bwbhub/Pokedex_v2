import React from "react";
import "./PokeSvg.css"

const PokeSvg = ({ color, animate }) => {

  return (
    <svg
      viewBox="2 2 20 20"
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "100%", 
        height: "100%", 
        animation: animate && "rotate 1s linear 0s infinite", 
      }}
    >
      <path
        d="M21.9012 13H16.8506C16.3873 15.2822 14.3696 17 11.9506 17C9.53167 17 7.51391 15.2822 7.05064 13H2C2.50172 18.0533 6.76528 22 11.9506 22C17.136 22 21.3995 18.0533 21.9012 13Z"
        fill={color ? color : "#2b2b2b"}
        />
      <path
        d="M21.9012 11C21.3995 5.94668 17.136 2 11.9506 2C6.76528 2 2.50172 5.94668 2 11H7.05064C7.51391 8.71776 9.53167 7 11.9506 7C14.3696 7 16.3873 8.71776 16.8506 11H21.9012Z"
        fill={color ? "#ffffff" : "#2b2b2b"}
        />
      <path
        clipRule="evenodd"
        d="M11.9506 15C13.6075 15 14.9506 13.6569 14.9506 12C14.9506 10.3431 13.6075 9 11.9506 9C10.2938 9 8.95062 10.3431 8.95062 12C8.95062 13.6569 10.2938 15 11.9506 15Z"
        fill={color ? "#ffffff" : "#2b2b2b"}
        fillRule="evenodd"
      />
    </svg>
  );
};

export default PokeSvg;



