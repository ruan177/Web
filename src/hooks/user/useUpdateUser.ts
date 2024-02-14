import { useQuery } from 'react-query';
import axios from 'axios';
import { User } from '../../types/AdminTableTypes';
import { useAuth } from '../../context/loginContext';



export function useUser() {
    const { user, accessToken } = useAuth()
    const { data, isFetching, isError, error } = useQuery(['userInfo', user?.id], async () => {
        // const response = await axios.get(`http://localhost:8080/users/${user?.id}`, {
        const response = await axios.get(`https://markedapi-b89c1e24f33a.herokuapp.com/users/${user?.id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.status === 200) {
            return response.data.user;
        } else {
            throw new Error('Não foi possível atualizar as informações do usuário');
        }
    },
        {
            keepPreviousData: true,
            staleTime: 30 * (60 * 1000),
        });
        return{
            updatedUser: data,
            isFetching, 
            isError,
            error

        }

}