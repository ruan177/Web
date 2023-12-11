// Navigation.tsx
import React, { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
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

 

  return (
    <>
    {!isDrawerOpen && (
      <button onClick={openDrawer}>
        <FiChevronRight className="text-black" />
      </button>
    )}

    {isDrawerOpen && (
    <div className={`w-1/4 bg-gray-200 p-4 `}>
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
          onClick={() => {
            setActiveTab('users');
            setIsDrawerOpen(false); // Fechar o drawer ao clicar em uma opção
          }}
        >
          Users
        </li>
        <li
          className={`cursor-pointer py-2 border-b border-gray-300 ${activeTab === 'courses' ? 'font-bold' : ''}`}
          onClick={() => {
            setActiveTab('courses');
            setIsDrawerOpen(false); // Fechar o drawer ao clicar em uma opção
          }}
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

