// components/Sidebar.tsx
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PersonIcon from '@mui/icons-material/Person';

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <aside
      className={`h-screen duration-300 flex flex-col items-start 
        ${open ? 'w-48' : 'w-16'} 
        border-r border-pink1 bg-sidebar text-white relative transition-all`}
    >
      {/* Toggle Button */}
      <div
        className="p-2 cursor-pointer self-end mr-3 mt-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-200 w-10 h-10 flex items-center justify-center"
        onClick={() => setOpen(!open)}
      >
        {open ? <ChevronLeftIcon className="text-pink1" /> : <MenuIcon className="text-pink1" />}
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-3 px-2 py-4 w-full text-pink1">
        <SidebarItem icon={<PersonIcon />} label="Profile" open={open} />
      </div>
    </aside>
  );
};

// Sidebar Item Component
interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  open: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, open }) => (
  <div className="flex items-center gap-3 cursor-pointer hover:bg-[#793c3c] text-white px-3 py-2 rounded-md transition-all">
    <div className="text-pink1">{icon}</div>
    <div
      className={`text-sm text-pink1 transition-all duration-300 ease-in-out origin-left 
        ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} 
        whitespace-nowrap`}
    >
      {label}
    </div>
  </div>
);

export default Sidebar;
