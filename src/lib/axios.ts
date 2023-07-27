import { AxiosInstance } from "axios";
import { useNavigate } from "react-router-dom";
import Axios, { AxiosResponse } from "axios";

const useAxios = () => {
  const accessToken = localStorage.getItem("access");

  const axiosInstance = Axios.create({
    baseURL: "http://localhost:80",
    headers:{
      'Content-Type': 'application/json',
       Authorization: `Bearer ${accessToken}` },
    
  });

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: any) => {
      const navigate = useNavigate();

      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        try {
          const refresh = localStorage.getItem("refresh");
          const response = await axiosInstance.post("/refresh", {
            data: {
              refresh: refresh,
            },
          });

          if (response.status === 200) {
            localStorage.access = response.data.access;
            // Reenvia a solicitação original com os tokens atualizados
            return axiosInstance.request(error.config);
          } else {
            navigate("/");
          }
        } catch (error) {
          navigate("/");
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
export let axios = useAxios();



