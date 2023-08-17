// import Axios from "axios";
// import jwt_decode from "jwt-decode";
// import dayjs from "dayjs";

// const useAxios = () => {
//   const accessToken = localStorage.getItem("access");
//   const refreshToken = localStorage.getItem("refresh");
 
//   const axiosInstance = Axios.create({
//     baseURL: "http://localhost:8080",
//     headers:{
//       'Content-Type': 'application/json',
//        Authorization: `Bearer ${accessToken}` },
    
//   });
  

//   axiosInstance.interceptors.request.use(async req => {
//     if (accessToken) {
//       const user = jwt_decode(accessToken);
//       const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

//       if (!isExpired) return req;

//       try {
//         const response = await Axios.post(`http://localhost:8080/refresh`, {
//           refresh: refreshToken
//         });

//         localStorage.setItem('access', JSON.stringify(response.data.access));

//         req.headers.Authorization = `Bearer ${response.data.access}`;
//       } catch (error) {
//         localStorage.clear();
//         setTimeout(() => {
//           window.location.href = "/login"; // Redirecionar para a página de login
//         }, 1000); // Redirect to login if token refresh fails
//       }
//     }

//     return req;
//   });

//   return axiosInstance;
// };

// export let axios = useAxios();

import Axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";



const axios = Axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem("access")}`
  },
});

export function setAuthToken(token: any) {
  axios.defaults.headers.common['Authorization'] = '';
  delete axios.defaults.headers.common['Authorization'];

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}


axios.interceptors.request.use(async (req) => {
  const accessToken = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");

  if (accessToken) {
    const user = jwt_decode(accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    try {
      const response = await Axios.post(`http://localhost:8080/refresh`, {
        refresh: refreshToken,
      });

      localStorage.setItem('access', response.data.access);

      setAuthToken(response.data.access);

      req.headers.Authorization = `Bearer ${response.data.access}`;
    } catch (error) {
      localStorage.clear();
      setTimeout(() => {
        window.location.href = "/login"; // Redirecionar para a página de login
      }, 1000); // Redirect to login if token refresh fails
    }
  }

  return req;
});


export {axios}
