import React from "react";
import "../../styles/button.css"

interface Props {
  border: string;
  color: string;
  children?: React.ReactNode;
  height: string;
  onClick: () => void;
  radius: string;
  width: string;
}

const Button = ({ 
    border,
    color,
    children,
    height,
    onClick, 
    radius,
    width
  }:Props) => { 
  return (
    <button 
      className="button"
      onClick={onClick}
      style={{
         backgroundColor: color,
         border,
         borderRadius: radius,
         height,
         width
      }}
    >
    {children}
    </button>
  );
}

export default Button;
