// components/Header.tsx

import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-pink1 mr-5 left-5">
      {/* ชื่อเว็บไซต์ */}
      <h1 className="text-5xl font-bold text-blue1">AWS MOM</h1>
    </header>
  );
};

export default Header;
