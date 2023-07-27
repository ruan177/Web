import logo from '../../assets/logos/Sparkle.png'
import '../../styles/global.css'
import { NavLink } from 'react-router-dom'
import UserProfile from '../profile/profile'

export function Header(){

    return(
           
            <NavLink className="italic flex items-center text-purple-600 " to="/">
                <img src={logo} width="50" height="50">
                </img>
                HackTheLearn
                
            </NavLink>
            
           
            

    )
}