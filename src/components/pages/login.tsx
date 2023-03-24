import { FormEvent, useContext, useState } from "react";
import { NavLink ,useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../../App";
import { baseUrl } from "../../lib/baseUrl";
import { Header } from "../headers/headerForm";




export function Login (){
    const {loggedIn, changeLoggedIn} = useContext(LoginContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]= useState('')

    const handleSubmit = async function(event: FormEvent) {
        event.preventDefault();
        const url = baseUrl+"/login"

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({
                email, 
                password
            })
        })
        .then((response)=>{
            if(response.status === 422){
                throw new Error("Email or Password Incorrect")
            }
            return response.json();
        })
        .then((data)=>{
            localStorage.setItem('access', data.access)
            localStorage.setItem('refresh', data.refresh.id)
            localStorage.setItem('user', data.refresh.user_id)
            changeLoggedIn(true)
                //navigate('/')
           

        })
        .catch((error)=>{
            setError(error.message)
        }) 
    }
   
    return(
    <div className="grid bg-gradient-to-r from-indigo-900 via-purple-500 to-rose-500">
      <Header />
    
        <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-indigo-900 via-purple-500 to-rose-500">
        
            <div className="w-full max-w-md flex flex-row gap-16 justify-center ">
                <form onSubmit={handleSubmit} className="w-full shadow-md rounded px-8 pt-8 pb-10 mb-6 bg-white">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="name@admin.com"
                        onChange={event => setEmail(event.target.value)} 
                        required></input>
                </div>
                <div className="mb-6">
                    <label  className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input 
                        type="password" 
                        id="password" 
                        className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="**********"
                        onChange={event => setPassword(event.target.value)} 
                        required></input>
                    <p className="text-red-500 text-xs italic">{error}</p>
                </div>
                <div className="flex items-center justify-around">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Login
                    </button>
                    <NavLink className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/register">
                        Cadastre-se
                    </NavLink>
                </div>
                
                </form>
                
            </div>
            
        </div>

        </div>

     

    )
}
