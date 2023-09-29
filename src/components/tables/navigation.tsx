// Navigation.tsx
import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

interface NavigationProps {
  setActiveTab: (tab: 'users' | 'courses') => void;
  activeTab: 'users' | 'courses';
}

const Navigation: React.FC<NavigationProps> = ({ setActiveTab, activeTab }) => {
  return (
    <div className="w-1/4 bg-gray-200 p-4">
      <NavLink className="font-bold text-xl mb-4" to="/">
        <AiOutlineArrowLeft />
      </NavLink>

      <ul>
        <li
          className={`cursor-pointer py-2 border-b border-gray-300 ${activeTab === 'users' ? 'font-bold' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </li>
        <li
          className={`cursor-pointer py-2 border-b border-gray-300 ${activeTab === 'courses' ? 'font-bold' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          Courses
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
