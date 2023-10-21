import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logos/icone.png';
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
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <NavLink className="italic flex items-center font-medium rounded-lg text-sm text-indigo-900" to="/">
            <img src={logo} width="60" height="60" alt="Logo" />
          </NavLink>
        </div>

        {/* Menu Button */}
        {user ? (
          // Não renderize UserProfile aqui
          <button
            className="md:hidden text-black focus:outline-none"

          >
            <UserProfile />
          </button>
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
              Courses
              </NavLink><NavLink className="block font-medium rounded-lg text-sm text-black mb-2" to="/">
                How it Works
              </NavLink>
              <Link className="block font-medium rounded-lg text-sm text-black mb-2"
              to="about"
              spy={true}
              smooth={true}
              offset={-70} // Ajuste conforme necessário
              duration={500}
            >
              About Us
            </Link>
              <hr className="my-2" /><NavLink className=" block font-medium rounded-lg italic 2 text-sm text-violet-900 mb-2" to="/login">
                Sign-in
              </NavLink><NavLink className="block font-medium rounded-lg italic bg-indigo-900  text-sm text-white mb-2" to="/register">
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
          <NavLink className="flex font-medium rounded-lg text-base text-black" to="/">
            Como Funciona
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
                bgColor={'text-violet-900 border border-indigo-900 hover:border-indigo-900 '}
              />
              <HomeButton
                name={'Registrar'}
                route={'/register'}
                bgColor={'text-white bg-indigo-900 hover:bg-indigo-300'}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
