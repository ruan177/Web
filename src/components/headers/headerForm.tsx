import logo from '../../assets/logos/sparkle.png';
import '../../styles/global.css'
import { NavLink } from 'react-router-dom'

import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai';
import {useNavigate}  from 'react-router-dom';

interface HeaderProps{
  textColor: string
}

  export function Header({textColor}: HeaderProps){
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate('/');
    };
  
    return (
      <div className="fixed top-0 left-0 w-full bg-transparent py-3 px-4 flex items-center justify-between">
        {/* Seta para voltar */}
        <div className= "flex justify-between">
          <NavLink to="/" className={`${textColor} flex items-center`}>
            <AiOutlineArrowLeft className="mr-2" />
            go back
          </NavLink>
       
        </div>
        <NavLink className="italic flex items-center font-medium rounded-lg text-sm text-indigo-900" to="/">
            <img src={logo} width="60" height="60" alt="Logo" />
          </NavLink>
        <div>
          <button className={`${textColor}`}onClick={handleGoBack}>
            <AiOutlineClose />
          </button>
        </div>
      </div>
    );
  };
            
           
            
