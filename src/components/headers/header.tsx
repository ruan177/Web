import { NavLink } from 'react-router-dom'
import '../../styles/global.css'
import logo from '../../assets/logos/coffe.png'
import { HomeButton } from '../buttons/button'

export function Header(){

    
    return(
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-white border-b-2 border-slate-300">
            <div className='container px-4 mx-auto flex flex-wrap items-center justify-between mx-auto '>
                <NavLink className="italic gap-4 flex items-center" to="/home">
                    <img src={logo} width="50" height="50">
                    </img>
                    CoffeForCoding 
                </NavLink>
                <div className="flex md:order-2 gap-2">  
                    <HomeButton name={'Entrar'} route={'/login'} bgColor={'bg-indigo-300'} />     
                    <HomeButton name={'Cadastre-se'}route={'/register'} bgColor={'bg-indigo-900'} />                              
                </div>
                <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'>
                    <ul className="flex flex-row gap-6 justify-center">
                        <NavLink className="italic" to="/home"> Home</NavLink>
                        <NavLink className="italic" to="/home"> Cursos</NavLink>        
                     </ul>
                </div>
                </div>
                
         </nav>
         
            
    )
}