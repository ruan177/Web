import React, { useContext, useEffect, useState } from 'react';
import avatar from '../../assets/logos/avatar.jpg'
import { NavLink } from 'react-router-dom';
import { LoginContext } from '../../App';
import { axios } from '../../lib/axios';

interface User{
    name: string
}
const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { loggedIn, changeLoggedIn } = useContext(LoginContext)
  const userUuid =localStorage.getItem('user')
  const [error, setError] = useState('')
  const [user, setUser] = useState<>()

  useEffect(()=>{
    
        const getUserInfo = async function () {
            try {
                const response = await axios.get(`/courses/${userUuid}`,)
                setUser(response.data.course)
                console.log(response.data.course)

            } catch (error: any) {
                setError(error.response.data.error)
            }

        }
        getUserInfo();
    
  })

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

    

  return (
    <>
    <div className="relative inline-block  gap-2">

          <button
              type="button"
              className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full focus:outline-none"
              onClick={toggleDropdown}
          >

              <img
                  className="w-6 h-6 rounded-full"
                  src={avatar}
                  alt="User Avatar" />

          </button>

          {isOpen && (
              <ul className="absolute right-0 z-10 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
                <li className="px-4 py-2 hover:bg-gray-100 items-center ml-2 text-sm font-medium">
                <span >Nome do Usuário</span>
                </li>
                

                 
                  <li className="px-4 py-2 hover:bg-gray-100">
                      <NavLink to="/login" >
                          Settings
                      </NavLink>
                  </li>

                  <li className="px-4 py-2 hover:bg-gray-100">
                      <NavLink to="/login"  onClick={() => { changeLoggedIn(false); localStorage.clear(); } }>
                          Logout
                      </NavLink>
                  </li>

              </ul>
          )}
      </div></>
  );
};

export default UserProfile;


