import { useEffect, useState } from "react";
import { baseUrl } from "../../lib/baseUrl";

interface Course {

}
export function Courses() {
    const [courses, setCourses] = useState<Course[]>()

    /*useEffect(()=>{
        const url = baseUrl + '/courses'
        fetch(url, {
            headers: {
                'Content-type': "application/json",
                 Authorization: 'Bearer'+ localStorage.getItem('token')
            }
        })
        .then(response=>{
            if(response.status== 401){

            }
            return response.json()
        })
        .then()
    }, [])*/

    return(
        <div>
            hello World
        </div>
    )

}




