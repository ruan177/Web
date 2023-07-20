import React, { useContext, useEffect, useState } from 'react';
import avatar from '../../assets/logos/avatar.jpg'
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../App';
import { axios } from '../../lib/axios';
import { useQuery } from 'react-query';

interface User{
  username: string
  email: string 
  isAdmin: boolean
}
const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { loggedIn, changeLoggedIn } = useContext(LoginContext);
  const userUuid = localStorage.getItem('user');

  

  const { data, isFetching ,isError, error} = useQuery('userInfo', async () => {
    const response = await axios.get<User>(`/users/${userUuid}`);
    return response.data
});

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  if (isFetching) {
    return <p>Carregando informações do usuário...</p>;
  }
 

  return (
    <>
      <div className="flex items-center relative inline-block gap-2">
        <a className="font-medium rounded-lg text-sm text-black">Olá, {data?.username}</a>
        <button
          type="button"
          className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full focus:outline-none"
          onClick={toggleDropdown}
        >
          <img className="w-10 h-10 rounded-full" src={avatar} alt="User Avatar" />
        </button>

        {isOpen && (
          <ul className="absolute right-0 z-10 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dropdown-menu top-10 right-4">
            
            <li className="px-4 py-2 hover:bg-gray-100">
              <NavLink to={`/mycourses/${userUuid}`}>My Courses</NavLink>
            </li>

            <li className="px-4 py-2 hover:bg-gray-100">
              <NavLink to="/course/create">Create Course</NavLink>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
               <NavLink to="/settings">Settings</NavLink>
            </li>

            <li className="px-4 py-2 hover:bg-gray-100">
              <NavLink
                to="/login"
                onClick={() => {
                  changeLoggedIn(false);
                  localStorage.clear();
                }}
              >
                Logout
              </NavLink>
            </li>
          </ul>
        )}
      </div>

     

    </>
  );
};

export default UserProfile;
