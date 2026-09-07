import React from 'react';
import Link from 'next/link';
import LogoIcon from './LogoIcon';

const Logo = () => {
  return (
    <Link href="/" className="fixed top-0 left-0 p-6 md:p-8 z-50 flex items-center space-x-3 cursor-pointer select-none group">
      <div className="transition-transform duration-300 group-hover:scale-110">
        <LogoIcon size={28} className="text-white" />
      </div>
      <span className="text-white text-2xl md:text-3xl font-bold tracking-tight">
        Luimo
      </span>
    </Link>
  );
};

export default Logo;
