import React from 'react';

interface Props {
    width: number;
  }

function Logo({ width }:Props) {
  return (
    <div>
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" width={width} />
    </div>
  )
}

export default Logo
