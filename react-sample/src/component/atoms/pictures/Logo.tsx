import React from 'react';

function Logo() {
  return (
    <div>
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" />
    </div>
  )
}

export default Logo
