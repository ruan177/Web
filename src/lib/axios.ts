import Axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { useAuth } from '../context/loginContext';

export const useAxios = () => {
  const {loggedIn, changeLoggedIn} = useAuth();
  const accessToken = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");

  const axiosInstance = Axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("access")}`
    },
  });


  axiosInstance.interceptors.request.use(async req => {
    const accessToken = localStorage.getItem("access"); 
    
    if(!accessToken) return req

    const user = jwt_decode(accessToken)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  
    if(!isExpired) return req
  
    const response = await Axios.post(`http://localhost:8080/refresh`, {
           refresh: refreshToken,
   });

   if(response.status === 200){
    localStorage.setItem('access', response.data.access)
    req.headers.Authorization = `Bearer ${response.data.access}`;
    changeLoggedIn(true);
    return req;
   }
   else{
    changeLoggedIn(false)
    return req;
   }
  })
  
  return axiosInstance
}

