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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loggedIn, changeLoggedIn } = useContext(LoginContext);
  const [deleteError, setDeleteError] = useState('');
  const userUuid = localStorage.getItem('user');

  

  const { data, isFetching ,isError, error} = useQuery('userInfo', async () => {
    const response = await axios.get<User>(`/users/${userUuid}`);
    return response.data
});

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOptionClick = async (option: string) => {
    if (option === 'Yes') {
      try {
        const response = await axios.delete(`/users/${userUuid}`);
        if(response.status === 200){
          changeLoggedIn(false);
          localStorage.clear();
          console.log(response);
        }
        
      } catch (error: any) {
        setDeleteError(error.response.data.error);
      }
    } else {
      closeModal();
    }
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
              <NavLink to="/login">Settings</NavLink>
            </li>

            <li className="px-4 py-2 hover:bg-gray-100">
              <NavLink to="/course/create">Create Course</NavLink>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100" onClick={openModal}>
              Delete Account
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <p className="mb-4">Are you sure you want to delete the account?</p>
            <div className="flex justify-center">
              <button
                className="mr-2 px-4 py-2 bg-blue-900 rounded text-white"
                onClick={() => handleOptionClick('Yes')}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-blue-900 rounded text-white"
                onClick={() => handleOptionClick('Not')}
              >
                Not
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
