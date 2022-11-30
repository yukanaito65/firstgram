import React from 'react'

function InputRegister(props:any) {
  return (
    <div>
    <input
    type={props.type}
    name={props.name}
    placeholder={props.placeholder}
    style={{
      width: "80%",
      height: "35px",
      backgroundColor: "#f7f7f7",
      outline: "solid #d3d3d3",
      border: "none",
    }}
    />
    </div>
  )
}

export default InputRegister
