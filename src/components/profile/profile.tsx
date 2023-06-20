import React, { useContext, useEffect, useState } from 'react';
import avatar from '../../assets/logos/avatar.jpg'
import { NavLink } from 'react-router-dom';
import { LoginContext } from '../../App';
import { axios } from '../../lib/axios';


interface User{
    username: string
    email: string 
    isAdmin: boolean
}
const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loggedIn, changeLoggedIn } = useContext(LoginContext)
  const [error, setError] = useState('')
  const [user, setUser] = useState<User>()
  const userUuid = localStorage.getItem('user')

 const getUserInfo = async function () {
        try {
            
            const response = await axios.get(`/users/${userUuid}`,)
            setUser(response.data)
            

        } catch (error: any) {
            setError(error.response.data.error)
        }

    }

  useEffect(()=>{
         getUserInfo();
         setInterval(getUserInfo, 1000*60*5);
  })
 
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOptionClick = (option: string) => {
    if(option === 'Yes'){
        
        axios.delete(`/users/${userUuid}`)
        changeLoggedIn(false)

    }else{
        closeModal();
    }
    

    
  };
  return (
    <>
      <div className="flex items-center relative inline-block gap-2">
        <button
          type="button"
          className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full focus:outline-none"
          onClick={toggleDropdown}
        >
          <img className="w-6 h-6 rounded-full" src={avatar} alt="User Avatar" />
        </button>
  
        {isOpen && (
          <ul className="absolute right-0 z-10 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dropdown-menu top-10 right-4">
            <li className="px-4 py-2 hover:bg-gray-100 items-center ml-2 text-sm font-medium">
              Olá <span>{user?.username}</span>
            </li>
  
            <li className="px-4 py-2 hover:bg-gray-100">
              <NavLink to="/login">Settings</NavLink>
            </li>
  
            <li className="px-4 py-2 hover:bg-gray-100">
              <NavLink to="/course/create">Create Course</NavLink>
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
  
            <li className="px-4 py-2 hover:bg-gray-100" onClick={openModal}>
              Delete Account
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
}

export default UserProfile;
