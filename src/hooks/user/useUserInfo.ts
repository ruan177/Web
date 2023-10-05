import { useQuery } from "react-query";
import { useAxios } from "../../lib/axios";
import { User } from "../../types/AdminTableTypes";

export function useUserInfo(userUuid: string) {
    const axios = useAxios();
  
    const { data, isFetching, isError, error } = useQuery<User>('userInfo', async () => {
      const response = await axios.get<User>(`/users/${userUuid}`);
      return response.data;
    }, {
      enabled: userUuid !== null,
    });
  
    return {
      userInfo: data || null,
      isFetching,
      isError,
      error,
    };
  }