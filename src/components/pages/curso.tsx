import { useEffect, useState, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../../App";
import { axios } from "../../lib/axios";
import '../../styles/global.css';
import { Link } from "react-router-dom";
import Header from "../headers/header";


interface Course {
    id: string,
    name: string,
    description: string,
}
export function Courses() {
    const navigate = useNavigate();
    const location = useLocation();
    const [courses, setCourses] = useState<Course[]>([])
    const { loggedIn, changeLoggedIn } = useContext(LoginContext);
    const [search, setSearch] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {

        const getCoursers = async function () {
            try {
                const response = await axios.get('/courses',)
                setCourses(response.data.courses)

            } catch (error: any) {
                setError(error.response.data.error)
            }

        }
        getCoursers();
    }



    )

    return (
        <div>
            <div className="flex flex-col gap-8 ">
                <Header />
                <div className="items-center">
                    <input
                        name="search"
                        type="text"
                        placeholder="Buscar..."
                        onChange={e => setSearch(e.target.value)}
                        value={search}>

                    </input>

                    <ul>
                        {courses.map(course => {
                            return (
                                <li className="underline" key={course.name}>
                                    <Link to={`${course.id}`}>
                                        {course.name}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>

                </div>
            </div>
        </div>
    )
}