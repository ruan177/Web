import Axios from 'axios'


 const axiosInstance = () => {
  const accessToken = localStorage.getItem('access');

  const axiosInstance = Axios.create({
    baseURL: "http://localhost:80",
    headers:{Authorization: `Bearer ${accessToken}`}
  })

  //axiosInstance.interceptors.request.use(async req => {})

  return axiosInstance
    

}
 export let axios = axiosInstance()



