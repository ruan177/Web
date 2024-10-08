import { useState } from 'react';
import avatar from '../../assets/logos/avatar.jpg';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/loginContext';
import { useUser } from '../../hooks/user/useUpdateUser';
import { FaUser, FaCog, FaSave, FaSignOutAlt } from 'react-icons/fa';
import { GrAdd } from "react-icons/gr";
import { HiAcademicCap } from "react-icons/hi2";

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const { updatedUser, isFetching, isError } = useUser(); // Use o hook personalizado

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (isFetching) {
    return <div className="animate-pulse flex items-center relative inline-block gap-2">
      <a className="font-medium rounded-lg text-sm text-black"></a>
      <button
        type="button"
        className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full focus:outline-none"

      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden">
          <img className="w-full h-full object-cover" />
        </div>
      </button>;
    </div>
  }

  if (isError) {
    logout() // Exibir uma mensagem de erro se houver um problema ao buscar os dados
  }

  // Use 'updatedUser' em vez de 'user' para exibir as informações atualizadas
  return (
    <>
      <div className="flex items-center relative inline-block gap-2">
        <a className="font-medium rounded-lg text-sm text-black">Olá, {updatedUser?.username}</a>
        <button
          type="button"
          className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full focus:outline-none"
          onClick={toggleDropdown}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden">
            <img src={updatedUser?.profileImageUrl ? updatedUser?.profileImageUrl : avatar} className="w-full h-full object-cover" />
          </div>
        </button>

        {isOpen && (
   <ul className="grid grid-cols-1 justify-items-center absolute right-0 z-10 w-36 py-2 mt-2 bg-white rounded-md shadow-xl dropdown-menu top-10 right-0 min-w-[200px]">
   {updatedUser?.isAdmin && (
      <li className="px-4 py-2 hover-bg-gray-100 hover:bg-gray-200 flex items-center min-w-[200px] whitespace-nowrap overflow-hidden text-overflow-ellipsis">
        <FaUser className="mr-2" />
        <NavLink to={`/admin`}>Admin</NavLink>
      </li>
   )}
   <li className="px-4 py-2 hover-bg-gray-100 hover:bg-gray-200 flex items-center min-w-[200px] whitespace-nowrap overflow-hidden text-overflow-ellipsis">
      <HiAcademicCap  className="mr-2" />
      <NavLink to={`/mycourses/${updatedUser?.id}`}>Meus Cursos</NavLink>
   </li>
   <li className="px-4 py-2 hover-bg-gray-100 hover:bg-gray-200 flex items-center min-w-[200px] whitespace-nowrap overflow-hidden text-overflow-ellipsis">
      <GrAdd className="mr-2" />
      <NavLink to="/course/create">Criar</NavLink>
   </li>
   <li className="px-4 py-2 hover-bg-gray-100 hover:bg-gray-200 flex items-center min-w-[200px] whitespace-nowrap overflow-hidden text-overflow-ellipsis">
      <FaCog className="mr-2" />
      <NavLink to="/account/update">Alterar Conta</NavLink>
   </li>
   <li className="px-4 py-2 hover-bg-gray-100 hover:bg-gray-200 flex items-center min-w-[200px] whitespace-nowrap overflow-hidden text-overflow-ellipsis">
      <FaSave className="mr-2" />
      <NavLink to="/saved">Conteudo Salvo</NavLink>
   </li>
   <li className="px-4 py-2 hover-bg-gray-100 bg-color-red hover:bg-gray-200 flex items-center min-w-[200px] whitespace-nowrap overflow-hidden text-overflow-ellipsis">
      <FaSignOutAlt className="mr-2" />
      <NavLink to="/" onClick={logout} className="text-red-500">Deslogar</NavLink>
   </li> 
  </ul>
        )}
      </div>
    </>
  );
};

export default UserProfile;
