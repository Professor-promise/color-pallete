import React from 'react';

const Dot = ({ color }) => {
  const style = {
    background: color,
  };
  return <div className='w-3 h-3 rounded-full' style={style}></div>;
};

export default Dot;
