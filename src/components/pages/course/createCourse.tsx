import { FormEvent, useEffect, useState } from "react"
import { axios } from "../../../lib/axios";
import Header from "../../headers/header";
import '../../../styles/global.css'

import MDEditor from "@uiw/react-md-editor";

export function CreateCourse() {
  const [preview, setPreview] = useState(false)
  const [CourseName, setCourseName] = useState('');
  const [BodyCourseContent, setBodyCourseContent] = useState('');
  const [CourseDescription, setCourseDescription] = useState('');

  const handleSubmit = async function (event: FormEvent) {
    event.preventDefault();

    try {
      await axios.post("/", {

      })
    } catch (error: any) {

    }

  }
  return (
    <>

   
    <div className="flex-grow ">
        <Header />
      </div>
  

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        
      <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900">Create Course</h1>
      
      <input 
        className="position-center border border-gray-300 px-4 py-2 mb-4 w-full sm:max-w-md"
        placeholder="Titulo" 
        defaultValue={CourseName}  
        onChange={event => setCourseName(event.target.value)}
      />
              
      <div data-color-mode="light">
      <MDEditor 

        height={400}
        value={BodyCourseContent}
        onChange={(value) => setBodyCourseContent(value || '')}
      />
      </div>
     

      
     

      
      
      
    </div> 






    </>
  );


}
