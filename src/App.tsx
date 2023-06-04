
import Header from './components/headers/header'
import { useEffect,useState, createContext, useContext } from 'react';
import {Routes, Route, Navigate, useNavigate, RouteProps, BrowserRouter } from "react-router-dom";
import { Login } from './components/pages/login';
import { Home } from './components/pages/home';
import { Register } from './components/pages/register';
import { Courses } from './components/pages/courses';
import React from 'react';
import '../src/styles/global.css'
import { axios } from './lib/axios';
import { Course } from './components/pages/course';
import { CreateCourse } from './components/pages/createCourse';
import UserProfile from './components/otherComponents/profile';

interface ILayoutProps {
  children: RouteProps["children"];
}


export const LoginContext = createContext({ loggedIn: false, changeLoggedIn: (value: true | false) => {} });

export default function App() {
    useEffect(()=>{
      async function refreshTokens(){
        if(localStorage.refresh){
          const refresh = localStorage.getItem('refresh')
          const navigate = useNavigate();

          try{
            const response = await axios.post("/refresh",{
              data: {
                refresh: refresh
              }
            })
            if(response.status != 200){
              changeLoggedIn(false)
              navigate('/');
            }
            localStorage.access = response.data.access
            changeLoggedIn(true)


          }catch(error: any){
            changeLoggedIn(false)
            navigate('/');
          }                   
        }
      }
      const minute = 1000*60;
      refreshTokens();
      setInterval(refreshTokens, minute*3);
    }, []);


    const [loggedIn, setLoggedIn] = useState<boolean>(localStorage.access? true: false);

    function changeLoggedIn(value: boolean){
      setLoggedIn(value);
      if(value === false){
        localStorage.clear();
      }
    }
    return (
      <LoginContext.Provider value={{loggedIn, changeLoggedIn}}>
       <BrowserRouter>
          <Routes>
              <Route  path ="/login"   element ={<Login />}/>,
              <Route  path ="/register"   element ={ <Register />}/>,
              <Route  path ="/"   element ={ <Home />}/>,                
              <Route path ="/courses" element ={<Courses />}/>,
              <Route path ="/courses/:uuid" element ={<Course />}/>,
              <Route path ="/admin/course" element ={<CreateCourse />}/>,
              <Route path ="/admin/course/:uuid" element ={<CreateCourse />}/>,
              <Route path ="/profile" element ={<UserProfile />}/>,
            </Routes>
          </BrowserRouter>
      </LoginContext.Provider>
  
)
}

 function RequireAuth({ children }: { children: JSX.Element }) {
    const {loggedIn} = useContext(LoginContext);
    if (!loggedIn) {
        return <Navigate to="/login"/>
    };
    return children;
}

