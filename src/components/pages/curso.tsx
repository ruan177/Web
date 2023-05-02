import { useEffect, useState, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../../App";
import axios from "axios";
import { baseUrl } from "../../lib/baseUrl";
import '../../styles/global.css';


interface Course {
    id: string,
    name: string,
    description: string,
}
export function Courses() {
    const navigate = useNavigate();
    const location = useLocation();
    const [courses, setCourses] = useState<Course[]>([])
    const {loggedIn, changeLoggedIn} = useContext(LoginContext);
    const [search, setSearch] = useState('')

    useEffect(()=>{
        const url = '/courses'
        axios.get(url, {
            /*headers: {
                'Authorization': 'Bearer'+ localStorage.getItem('access')
            },*/
            baseURL: baseUrl
        })
        .then(response=>{
            if(response.status === 401){
                //changeLoggedIn(false);
                navigate('/login')
            }
            setCourses(response.data.courses)

        })
        .catch()
    }, [])

    return(
        <div>
            <input 
            name="search" 
            type="text" 
            placeholder="Buscar..."
            onChange={e => setSearch(e.target.value)}
            value={search}>

            </input>

            <ul>
            {courses.map(course=>{
                    return (
                        <li key={course.name}
                        >{course.name}
                        </li>
                    )
                })}
            </ul>
        </div>
    )

}




