import { FormEvent, useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { axios } from "../../../lib/axios";
import { useParams } from "react-router-dom"
import Header from "../../headers/header";
import '../../../styles/global.css'
import MDEditor from '@uiw/react-md-editor'

export function UpdateCourse() {
  const [preview, setPreview] = useState(false)
  const [CourseName, setCourseName] = useState('');
  const [BodyCourseContent, setBodyCourseContent] = useState('');


  const handleSubmit = async function (event: FormEvent) {
    event.preventDefault();

    try {
      await axios.get("", {

      })
    } catch (error: any) {

    }

  }
  return (
    <>


<div className="container px-28 gap-4 grid py-16">
      <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900">Update Course</h1>
      
      <input 
      className=" border border-gray-300" 
      placeholder="Titulo" 
      defaultValue={CourseName}  
      onChange={event => setCourseName(event.target.value)}
      ></input>
              
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
