import { useNavigate } from "react-router-dom";
interface ButtonProps {
    name: string
    route: string
    bgColor: string
}
export function HomeButton({name, route, bgColor }:ButtonProps) {
    const navigate = useNavigate();
  
    function handleClick() {
      navigate(route);
    }
  
    return (
        <button 
        type="button" 
        className={`text-white ${bgColor} hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        onClick={handleClick}
        > {name}
        </button>
    )
}