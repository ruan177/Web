import { NavLink } from 'react-router-dom'
import '../../styles/global.css'
import logo from '../../assets/logos/coffe.png'
import { HomeButton } from '../buttons/button'
import { LoginContext } from '../../App'
import { useContext } from 'react'

export default function Header(props: any) {
    const { loggedIn, changeLoggedIn } = useContext(LoginContext)

    return (
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-white border-b-2 border-slate-300">
            <div className='container px-4 mx-auto flex flex-wrap items-center justify-between mx-auto '>
                <ul className="flex flex-row gap-8 items-center justify-around ">
                    <NavLink className="italic flex items-center font-medium rounded-lg text-sm text-indigo-900" to="/">
                        <img src={logo} width="50" height="50">
                        </img>
                        CoffeForCoding
                    </NavLink>
                </ul>
                <div className="justify-items-center flex gap-8">
                    <NavLink className="flex font-medium rounded-lg text-sm text-black" to="/courses">Courses</NavLink>
                    <NavLink className="flex font-medium rounded-lg text-sm text-black" to="/">Exercises</NavLink>
                    <NavLink className="flex font-medium rounded-lg text-sm text-black" to="/">How it Works</NavLink>
                    <NavLink className="flex font-medium rounded-lg text-sm text-black" to="/">About Us</NavLink>
                </div>

                <div className="flex md:order-2">
                    {loggedIn ?
                        <NavLink to="/login" className="bg-indigo-900 hover:bg-indigo-300 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-full" onClick={() => { changeLoggedIn(false); localStorage.clear() }}>
                            Logout
                        </NavLink>

                        :
                        <div>
                            <HomeButton name={'Sign-in'} route={'/login'} bgColor={'text-violet-900 hover:border-indigo-900 '} />
                            <HomeButton name={'Sign-up'} route={'/register'} bgColor={'bg-indigo-900 hover:bg-indigo-300'} />
                        </div>



                    }


                </div>

            </div>

        </nav>


    )
}