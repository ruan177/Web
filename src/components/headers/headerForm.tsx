import logo from '../../assets/logos/coffe.png'
import '../../styles/global.css'
import { NavLink } from 'react-router-dom'
import UserProfile from '../profile/profile'

export function Header(){

    return(
           
            <NavLink className="italic flex items-center text-white " to="/">
                <img src={logo} width="50" height="50">
                </img>
                CoffeForCoding 
                
            </NavLink>
            
           
            

    )
}