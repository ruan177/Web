import { NavLink, useNavigate } from "react-router-dom";
import { Header } from "../../components/headers/headerForm";
import logo from '../../assets/logos/sparkle.png';
import '../../styles/global.css'
import { FormEvent, useState } from "react";
import { useAuth } from "../../context/loginContext";


export function Login() {

    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true); // Inicia o carregamento
        try {
            await login(email, password);
            navigate('/');
        } catch (error: any) {
            setError(error.message); // Defina a mensagem de erro
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };

    return (
        <div className="grid bg-black-800 h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full">
                <div className={`bg-[url('/src/assets/login_logo.jpg')] lg:col-span-2 bg-no-repeat bg-cover lg:col-span-2  w-full lg:block md:block sm:hidden`}></div>
                <div className="flex justify-center items-center bg-white md:w-70 w-full">
                    <form className="h-4/4 w-full   px-8 pt-8 pb-10 mb-6 justify-center bg-white text-left">
                        <div className="flex justify-center items-center">
                            <NavLink className="italic flex items-center font-medium rounded-lg text-sm text-indigo-900" to="/">
                                <img src={logo} width="150" height="150" alt="Logo" />
                            </NavLink>
                        </div>
                        <div className="mb-6 px-8 ">
                            <label className="font-serif block text-gray-700 text-xl  mb-2">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className="shadow appearance-none bg-gray-50 border border-black rounded-lg w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Digite seu email"
                                onChange={event => setEmail(event.target.value)}
                                required
                                autoComplete="email"
                            />
                        </div>

                        <div className="mb-16 px-8 ">
                            <div className="flex justify-between items-center">
                                <label className="font-serif block text-gray-700 text-xl  mb-2">Senha: </label>
                                <a href="/reset" className=" font-serif text-blue-500 italic text-lg underline underline-offset-1">Esqueceu a Senha?</a>
                            </div>



                            <input
                                type="password"
                                id="password"
                                className="shadow appearance-none bg-gray-50 border border-black rounded-lg w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="*********"
                                onChange={event => setPassword(event.target.value)}
                                required
                            />
                            <p className="font-serif text-red-500 text-xl ">{error && (error)}</p>

                        </div>

                        <div className="grid justify-items-center gap-10">
                            <button
                                className="flex font-serif bg-black bg-center bg-cover border-2 border-white text-white text-2xl rounded-full py-2 px-20 focus:outline-none focus:shadow-outline"
                                style={{ borderRadius: '31px', position: 'relative' }}
                                disabled={loading}
                                onClick={handleSubmit}
                            >

                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0  0  24  24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4  12a8  8  0  018-8V0C5.373  0  0  5.373  0  12h4zm2  5.291A7.962  7.962  0  014  12H0c0  3.042  1.135  5.824  3  7.938l3-2.647z"></path>
                                        </svg>
                                        Entrando...
                                    </>
                                ) : (
                                    'Entrar'
                                )}
                            </button>
                            <div className="mt-6">
                                <a className="font-serif text-xl">Não possui uma conta? </a>
                                <a href="/register" className=" font-serif text-blue-500  text-xl underline underline-offset-1">Criar Conta</a>
                            </div>
                        </div>


                    </form>
                </div>


            </div>
        </div>

    )
}