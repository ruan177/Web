import { useEffect, useState, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../../App";
import { baseUrl } from "../../lib/baseUrl";
import '../../styles/global.css'


interface Course {

}
export function Courses() {
    const navigate = useNavigate();
    const location = useLocation();
    const [courses, setCourses] = useState<Course[]>()
    const {loggedIn, changeLoggedIn} = useContext(LoginContext);

    /*useEffect(()=>{
        const url = baseUrl + '/courses'
        axios.post(url, {
            headers: {
                'Authorization': 'Bearer'+ localStorage.getItem('access')
            }
        })
        .then(response=>{
            if(response.status === 401){
                setLoggedIn(false);
                navigate('/login')
            }

        })
        .catch()
    }, [])*/

    return(
        <div>
            hello World
        </div>
    )

}




