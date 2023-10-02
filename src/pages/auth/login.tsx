import { NavLink } from "react-router-dom";
import { Header } from "../../components/headers/headerForm";
import { useAuthentication } from "../../hooks/auth/useAuthentication";
import '../../styles/global.css'

export function Login() {

    const {  setEmail, setPassword, error, handleSubmit } =
    useAuthentication();

    return (
        <div className="grid bg-gradient-to-r from-indigo-900 via-purple-500 to-rose-500">
            <Header textColor={"text-white"}/>

            <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-indigo-900 via-purple-500 to-rose-500">

                <div className="w-full max-w-md flex flex-row gap-18 justify-center ">
                    <form onSubmit={handleSubmit} className="w-full shadow-md rounded px-8 pt-8 pb-10 mb-6 bg-white">

                        <h1 className="mb-10 text-2xl font-bold tracking-tight text-center text-gray-900 ">Log-in</h1>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="name@admin.com"
                                onChange={event => setEmail(event.target.value)}
                                required></input>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="**********"
                                onChange={event => setPassword(event.target.value)}
                                required></input>
                            <p className="text-red-500 text-xs italic">{error}</p>
                        </div>
                        <div className="grid justify-items-center gap-6">
                            <div className="flex justify-items-center space-x-10">
                            <NavLink className="inline-block align-baseline font-bold text-sm text-violet-500 hover:text-violet-800" to="/register">
                                Sign up
                            </NavLink>
                            <NavLink className="inline-block align-baseline font-bold text-sm text-fuchsia-500 hover:text-violet-800" to="/reset">
                                Forgot Password
                            </NavLink>
                            </div>
                           
                            <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-20 rounded-full focus:outline-none focus:shadow-outline" type="submit">
                                Log in
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>



    )
}