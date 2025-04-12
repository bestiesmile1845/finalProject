// components/Sidebar.tsx
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <aside
      className={`h-screen duration-300 flex flex-col items-start 
        ${open ? 'w-30' : 'w-20'} 
        border-r border-pink1 bg-sidebar text-white relative`}>
      {/* Toggle Button */}
      <div className="p-6 cursor-pointer items-center " onClick={() => setOpen(!open)}>
        <MenuIcon className="text-pink1" />
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-3 p-4 w-full text-pink1">
        {/* General Section */}
        <SidebarItem icon={<HomeIcon />} label="Home" open={open} />
        <SidebarItem icon={<WhatshotIcon />} label="Popular" open={open} />
        <SidebarItem icon={<QuestionAnswerIcon />} label="My Ask" open={open} />

        {/* Divider */}
        <hr className="my-2 border-t border-white/30 w-full" />

        {/* Profile Section */}
        <SidebarItem icon={<PersonIcon />} label="My Profile" open={open} />
        <SidebarItem icon={<EditIcon />} label="Edit Profile" open={open} />
        <SidebarItem icon={<InfoIcon />} label="About Me" open={open} />
      </div>
    </aside>
  );
};

// ✅ Sidebar Item Component with pink1 icon color
interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  open: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, open }) => (
  <div className="flex items-center gap-2 cursor-pointer hover:bg-white/10 px-2 py-1 rounded-md">
    <div className="text-pink1">{icon}</div>
    {open && <span className="text-sm text-pink1">{label}</span>}
  </div>
);

export default Sidebar;
