import { useContext } from "react";
import { LoginContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { axios } from "../../../lib/axios";

const { loggedIn, changeLoggedIn } = useContext(LoginContext)

export async function refreshTokens(){
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