import Axios from "axios";
import { useAuth } from "../context/loginContext";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

const useAxios = () => {
  const { accessToken, renewToken } = useAuth();

  const axios = Axios.create({
    baseURL: 'https://markedapi-b89c1e24f33a.herokuapp.com',
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  
  axios.interceptors.request.use(async (config) => {
    if (accessToken) {
      const token = jwt_decode<{ exp: number }>(accessToken);
      const now = dayjs(); // Obtém a data/hora atual com dayjs
      const targetDate = dayjs.unix(token?.exp );
      const minutesRemaining = targetDate.diff(now, 'minutes');
      if (minutesRemaining <= 5){
        await renewToken();
      }
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  });



  return axios;
}
export default useAxios



