import { NavLink } from 'react-router-dom'
import '../../styles/global.css'
import logo from '../../assets/logos/coffe.png'
import { HomeButton } from '../buttons/button'
import { LoginContext } from '../../App'
import { useContext } from 'react'

export default function Header(props: any){
    const {loggedIn, changeLoggedIn} = useContext(LoginContext)
    
    return(
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-white border-b-2 border-slate-300">
            <div className='container px-4 mx-auto flex flex-wrap items-center justify-between mx-auto '>
              <ul className="flex flex-row gap-8 items-center justify-around ">
                <NavLink className="italic flex items-center" to="/home">
                    <img src={logo} width="50" height="50">
                    </img>
                    CoffeForCoding 
                </NavLink>
                <NavLink className="flex italic" to="/home">Cursos</NavLink>   
                </ul>

                <div className="flex md:order-2">  
                    {loggedIn ?
                        <NavLink to="/login" className="bg-indigo-900 hover:bg-indigo-300 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-full" onClick={()=>{changeLoggedIn(false); localStorage.clear()}}>
                               Logout
                        </NavLink>
                         
                    :
                        <button className="bg-indigo-300 rounded-full hover:bg-blue-800">
                            <HomeButton name={'Cadastre-se'} route={'/register'} bgColor={'bg-indigo-900 hover:bg-indigo-300'} />     
                            <HomeButton name={'Entrar'}route={'/login'} bgColor={''} />      
                        </button>
                 
                            
                    }
                    
                           
                </div>

                </div>
                
         </nav>
         
            
    )
}