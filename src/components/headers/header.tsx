import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logos/sparkle.png';
import { HomeButton } from '../buttons/button';
import UserProfile from '../dropdown/profile';
import { useAuth } from '../../context/loginContext';
import { Link } from 'react-scroll';

export default function Header(props: any) {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex flex-wrap items-center justify-between px-4 py-3 bg-white border-b-2 border-slate-300">
      <div className="h-fuull w-full mx-auto flex items-center justify-between ">
        <div className="flex items-center">
          <NavLink className="italic flex items-center font-medium rounded-lg text-sm text-indigo-900" to="/">
            <img src={logo} width="60" height="60" alt="Logo" />
          </NavLink>
        </div>
        

        {/* Menu Button */}
        {user ? (
            <>
          <button
            className="md:hidden text-black focus:outline-none"

          >
              <UserProfile />
            </button></>
        ) : (
          <button
            className="md:hidden text-black focus:outline-none"
            onClick={handleMenuToggle}
          >
            ☰
          </button>
        )}

        {/* Mobile Menu */}
        <div className={`md:hidden absolute text-center top-16 right-0 bg-white p-4 ${menuOpen ? 'block' : 'hidden'}`}>

          {!user && (
            <><NavLink className="block font-medium rounded-lg text-sm text-black mb-2" to="/courses">
              Cursos
              </NavLink>
              <Link className="block font-medium rounded-lg text-sm text-black mb-2"
              to="about"
              spy={true}
              smooth={true}
              offset={-70} // Ajuste conforme necessário
              duration={500}
            >
              Sobre nos
            </Link>
              <hr className="my-2" /><NavLink className=" block font-medium rounded-lg italic 2 text-sm text-black mb-2" to="/login">
                Sign-in
              </NavLink><NavLink className="block font-medium rounded-lg italic bg-black  text-sm text-white mb-2" to="/register">
                Sign-up
              </NavLink></>
          )}
        </div>
        {/* ... */}

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <NavLink className="flex font-medium rounded-lg text-base text-black" to="/courses">
            Cursos
          </NavLink>
       
          <Link className="flex font-medium rounded-lg text-base text-black"
              to="about"
              spy={true}
              smooth={true}
              offset={-70} // Ajuste conforme necessário
              duration={500}
            >
              About Us
            </Link>

        </div>

        {/* Avatar */}
        <div className="hidden md:flex gap-4 items-center">
          {user ? (
            // Renderize UserProfile apenas uma vez aqui
            <UserProfile />
          ) : (
            <div className="flex gap-4">
              <HomeButton
                name={'Entrar'}
                route={'/login'}
                bgColor={'text-black border border-black hover:border-indigo-900 '}
              />
              <HomeButton
                name={'Registrar'}
                route={'/register'}
                bgColor={'text-white bg-black hover:bg-gray-500'}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
