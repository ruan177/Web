import { FormEvent, useState } from "react";
import axios from 'axios'


/*interface ResponseTokens  {
    token: string,
    refresh: 
}*/

export function Login (){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]= useState(' ')

    const handleSubmit = async function(event: FormEvent) {
        event.preventDefault();

        /*await axios.post('/login',{
            email,
            password
        })
        .then(response=>{
            const {token, refresh}: ResponseTokens = response.data
            localStorage.setItem('token', token )
            localStorage.setItem('refresh', refresh )
        }).catch(error=>{
            setError(error.message)
        }) 
        imcompleto*/
            
    }

    return(
   <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-indigo-900 via-purple-500 to-rose-500">
      <div className="w-full max-w-md flex flex-row gap-16 justify-center ">
        
        
        <form onSubmit={handleSubmit} className="w-full shadow-md rounded px-8 pt-8 pb-10 mb-6 bg-white">
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Your email</label>
            <input 
                type="email" 
                id="email" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                placeholder="name@admin.com"
                onChange={event => setEmail(event.target.value)} 
                required></input>
        </div>
        <div className="mb-6">
            <label  className="block text-gray-700 text-sm font-bold mb-2">Your password</label>
                <input 
                type="password" 
                id="password" 
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                placeholder="**********"
                onChange={event => setPassword(event.target.value)} 
                required></input>
            <p className="text-red-500 text-xs italic">{error}</p>
        </div>
        <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Sign In
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
            </a>
        </div>
        
        </form>
        
       </div>
     </div>


    )
}
