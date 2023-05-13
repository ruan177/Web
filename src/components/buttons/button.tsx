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
        className={`text-white ${bgColor} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0  rounded-full`}
        onClick={handleClick}
        > {name}
        </button>
    )
}