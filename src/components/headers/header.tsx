import { NavLink } from 'react-router-dom'
import '../../styles/global.css'
import logo from '../../assets/logos/coffe.png'
import { HomeButton } from '../buttons/button'

export function Header(){

    
    return(
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-white border-b-2 border-slate-300">
            <div className='container px-4 mx-auto flex flex-wrap items-center justify-between mx-auto '>
              <ul className="bg-indigo-900 flex flex-row divide-x divide-indigo-900 gap-6 items-center justify-center ">
                <NavLink className="italic gap-4 flex items-center" to="/home">
                    <img src={logo} width="50" height="50">
                    </img>
                    CoffeForCoding 
                </NavLink>
                <NavLink className="italic" to="/home">Cursos</NavLink>   
                </ul>

                <div className="flex md:order-2">  
                    <button className="bg-indigo-300 rounded-full hover:bg-blue-800">
                        <HomeButton name={'Cadastre-se'} route={'/register'} bgColor={'bg-indigo-900 hover:bg-indigo-300'} />     
                        <HomeButton name={'Entrar'}route={'/login'} bgColor={''} />      
                    </button>
                                            
                </div>

                </div>
                
         </nav>
         
            
    )
}