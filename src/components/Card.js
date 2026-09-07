import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-[#4a4a4a] border border-[#3a3a3a] rounded-xl p-4 md:p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
