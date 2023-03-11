import logo from '../../assets/logos/coffe.png'
import { NavLink } from 'react-router-dom'

export function Header(){

    return(
        
            <NavLink className="italic flex items-center " to="/home">
                <img src={logo} width="50" height="50">
                </img>
                CoffeForCoding 
            </NavLink>

    )
}