import Axios from 'axios'


const axiosInstance = () => {
  const accessToken = localStorage.getItem('access');

  //axiosInstance.interceptors.request.use(async req => {})

  return Axios.create({
      baseURL: "http://localhost:80",
      headers: {Authorization: `Bearer ${accessToken}`}
  })
    

}
 export let axios = axiosInstance()



