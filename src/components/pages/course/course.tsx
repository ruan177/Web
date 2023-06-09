import { useEffect, useState } from "react"
import { axios } from "../../../lib/axios";
import { useParams } from "react-router-dom"
import Header from "../../headers/header";
import MarkdownPreview from '@uiw/react-markdown-preview';
import '../../../styles/global.css'

interface Course {
    uuid: string,
    name: string,
    author: string,
    body: string,
}

export function Course() {
    const [postContent, setPostContent] = useState('');
    const [course, setCourse] = useState<Course>();
    const [error, setError] = useState('')
    const { uuid } = useParams();

    useEffect(() => {
        const getCourse = async function () {
            try {
                const response = await axios.get(`/courses/${uuid}`,)
                setCourse(response.data.course)
                console.log(response.data.course)

            } catch (error: any) {
                setError(error.response.data.error)
            }

        }
        getCourse();
    })



    return (

        <div className=" flex justify-center items-center">
            <div className="flex flex-col gap-8 ">
                <Header />
                
                <div className="px-64 space-y-4">
                    <h2 className="text-center ">{course?.name}</h2>
                    <hr />
                    <div data-color-mode="light">
                        <MarkdownPreview source={course?.body} />
                    </div>
                </div>

            </div>
        </div>
        


    );

}