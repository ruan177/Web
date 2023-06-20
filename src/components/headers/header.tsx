import { NavLink } from 'react-router-dom'
import '../../styles/global.css'
import logo from '../../assets/logos/coffe.png'
import { HomeButton } from '../buttons/button'
import { LoginContext } from '../../App'
import { useContext, useState } from 'react'
import UserProfile from '../profile/profile'


export default function Header(props: any) {
  const { loggedIn, changeLoggedIn } = useContext(LoginContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-white border-b-2 border-slate-300">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between mx-auto">
        <ul className="flex flex-row gap-8 items-center justify-start md:justify-around">
          <NavLink className="italic flex items-center font-medium rounded-lg text-sm text-indigo-900" to="/">
            <img src={logo} width="50" height="50" alt="Logo" />
            CoffeForCoding
          </NavLink>
        </ul>

        {/* Menu Button */}
        <button
          className="block md:hidden text-black focus:outline-none"
          onClick={handleMenuToggle}
        >
          Menu
        </button>

        {/* Menu Options */}
        <div
          className={`${
            menuOpen ? 'block' : 'hidden'
          } md:flex flex-col md:flex-row md:items-center md:justify-center md:gap-8 w-full md:w-auto mt-4 md:mt-0`}
        >
          <NavLink className="flex font-medium rounded-lg text-sm text-black" to="/courses">
            Courses
          </NavLink>
          <NavLink className="flex font-medium rounded-lg text-sm text-black" to="/">
            Exercises
          </NavLink>
          <NavLink className="flex font-medium rounded-lg text-sm text-black" to="/">
            How it Works
          </NavLink>
          <NavLink className="flex font-medium rounded-lg text-sm text-black" to="/">
            About Us
          </NavLink>
          {!loggedIn && (
            <>
              <NavLink className="flex font-medium rounded-lg text-sm text-black" to="/login">
                Sign-in
              </NavLink>
              <NavLink className="flex font-medium rounded-lg text-sm text-black" to="/register">
                Sign-up
              </NavLink>
            </>
          )}
        </div>

        {/* Avatar */}
        <div className="hidden md:flex">
          {loggedIn ? (
            <UserProfile />
          ) : (
            <div className="flex gap-4">
              <HomeButton
                name={'Sign-in'}
                route={'/login'}
                bgColor={'text-violet-900 hover:border-indigo-900 '}
              />
              <HomeButton
                name={'Sign-up'}
                route={'/register'}
                bgColor={'bg-indigo-900 hover:bg-indigo-300'}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
