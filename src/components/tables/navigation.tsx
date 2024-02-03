// Navigation.tsx
import React, { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai';
import { FiChevronRight } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

interface NavigationProps {
  setActiveTab: (tab: 'users' | 'courses') => void;
  activeTab: 'users' | 'courses';
}

const Navigation: React.FC<NavigationProps> = ({ setActiveTab, activeTab }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleTabClick = (tab: 'users' | 'courses') => {
    setActiveTab(tab);
    setIsDrawerOpen(false);
  };

 

  return (
    <>
    {!isDrawerOpen && (
      <button onClick={openDrawer}>
        <FiChevronRight className="text-black" />
      </button>
    )}

    {isDrawerOpen && (
    <div className={`w-1/12 h-full bg-gray-200 p-4 `}>
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold text-xl">
          <NavLink to="/">
            <AiOutlineArrowLeft />
          </NavLink>
        </div>
        <div className="cursor-pointer text-black">
         
            <AiOutlineClose  onClick={closeDrawer} />
         
        </div>
      </div>

      <ul>
        <li
          className={`cursor-pointer py-2 border-b border-gray-300 ${activeTab === 'users' ? 'font-bold' : ''}`}
          onClick={() => handleTabClick('users')}

        >
          Users
        </li>
        <li
          className={`cursor-pointer py-2 border-b border-gray-300 ${activeTab === 'courses' ? 'font-bold' : ''}`}
          onClick={() => handleTabClick('courses')}

        >
          Courses
        </li>
      </ul>
    </div>
    )}
    </>
  
  );
};

export default Navigation;

