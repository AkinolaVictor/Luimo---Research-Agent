import React from 'react';
import Logo from './Logo';

const Layout = ({ children, showLogo = true }) => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans selection:bg-white selection:text-black">
      {showLogo && <Logo />}
      <main className="flex items-center justify-center px-5 py-10 md:px-10 md:py-20">
        <div className="w-full max-w-[600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
