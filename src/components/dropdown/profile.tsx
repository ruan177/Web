import { useState } from 'react';
import avatar from '../../assets/logos/avatar.jpg'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/loginContext';


const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);


  const { user, logout } = useAuth();



  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };



  return (
    <>
      <div className="flex items-center relative inline-block gap-2">
        <a className="font-medium rounded-lg text-sm text-black">Olá, {user?.username}</a>
        <button
          type="button"
          className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full focus:outline-none"
          onClick={toggleDropdown}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden">
            <img src={user?.profileImageUrl ? user?.profileImageUrl : avatar
            } className="w-full h-full object-cover">
            </img>
          </div>

        </button>

        {isOpen && (
          <ul className="justify-items-center absolute right-0 z-10 w-36 py-2 mt-2 bg-white rounded-md shadow-xl dropdown-menu top-10 right-0">
            {user?.isAdmin && (
              <li className="px-4 py-2 hover-bg-gray-100 hover:bg-gray-200">
                <NavLink to={`/admin`}>Admin</NavLink>
              </li>
            )}
            <li className="px-4 py-2 hover-bg-gray-100 hover:bg-gray-200">
              <NavLink to={`/mycourses/${user?.id}`}>Cursos Criados</NavLink>
            </li>
            <li className="px-4 py-2 hover-bg-gray-100 hover:bg-gray-200">
              <NavLink to="/course/create">Criar Conteudo</NavLink>
            </li>
            <li className="px-4 py-2 hover-bg-gray-100 hover:bg-gray-200">
              <NavLink to="/account/update">Alterar Conta</NavLink>
            </li>
            <li className="px-4 py-2 hover-bg-gray-100 hover:bg-gray-200">
              <NavLink to="/saved">Cursos Salvos</NavLink>
            </li>
            <li className="px-4 py-2 hover-bg-gray-100 hover:bg-gray-200">
              <NavLink to="/" onClick={logout}>Deslogar</NavLink>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default UserProfile;
