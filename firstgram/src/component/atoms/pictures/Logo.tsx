import React from 'react';

function Logo() {
  return (
    <div>
        <img src={`${process.env.PUBLIC_URL}/new_logo_transparent.png`} alt="Logo" />
    </div>
  )
}

export default Logo
