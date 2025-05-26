import React from "react";

import "../../App.css";
import Header from "../../components/home/header";
import Sidebar from "../../components/ีuser/Sidebar";

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 ">
        {/* Sidebar */}
        <Sidebar />

        {/* Content Area */}
        <div className="flex-1 flex items-center justify-center p-10 relative bg-[#FBE2E0]">
          {/* Background if needed */}
          <div className="absolute inset-0 -z-10 bg-[#FBE2E0]" />
          
          <div className="bg-white rounded-2xl shadow-lg p-8 h-full w-full">
            <h2 className="text-2xl font-semibold text-center mb-6 text-pink-700">Profile</h2>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
