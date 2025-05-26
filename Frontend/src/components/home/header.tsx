import React, { useEffect, useState } from 'react';
import logo from '../../assets/Logo.png';
import avatarImg from '../../assets/avatar.jpg'; // รูปโปรไฟล์จำลอง
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ตรวจสอบ token ใน localStorage ว่ามีหรือไม่
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // แปลงเป็น true / false
  }, []);

  const handleLogout = () => {
    localStorage.clear();        // เคลียร์ token / ข้อมูล
    setIsLoggedIn(false);        // ตั้งค่าสถานะล็อกเอาท์
    navigate('/SignIn');         // กลับไปหน้า login
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-pink1 w-full h-24 relative">
      
      {/* เมนูด้านซ้าย */}
      <nav className="flex items-center space-x-6">
        <Link to="/Home" className="text-sm font-medium hover:text-pink1">HOME</Link>
        <Link to="/board" className="text-sm font-medium hover:text-pink1">BOARD</Link>
      </nav>

      {/* โลโก้ตรงกลาง */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <img src={logo} alt="Logo" className="h-16 object-contain" />
      </div>

      {/* เมนูด้านขวา */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            {/* ปุ่มโปรไฟล์ */}
            <Link to="/Profile" className="flex items-center space-x-2 hover:text-pink1">
              <img src={avatarImg} alt="avatar" className="w-8 h-8 rounded-full border border-gray-300" />
              <span className="text-sm font-medium">Profile</span>
            </Link>

            {/* ปุ่ม logout */}
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/SignIn" className="text-sm font-medium hover:text-pink1">LOGIN</Link>
            <Link to="/Register" className="text-sm font-medium hover:text-pink1">REGISTER</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
