import { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { User } from "../../components/tables/usersTable";
import { AxiosError } from "axios";
import { queryClient } from "../../lib/queryClient";
import { useAuth } from "../../context/loginContext";
import useAxios from "../../lib/axios";

export function useAdminUsers() {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isUsersEditMode, setIsUsersEditMode] = useState(false);
  const [usersData, setUsersData] = useState<User[]>([]);
  const [userPage, setUserPage] = useState(1);
  const userItemsPerPage =  8;
  const { user } = useAuth();
  const axios = useAxios();

  const handleUsersEdit = () => { setIsUsersEditMode(true); };
  const handleUsersCancel = () => { setIsUsersEditMode(false); };

  const { data: usersDataInitial } = useQuery<User[], AxiosError>(['users', userPage], async () => {
    const response = await axios.get(`/users/${user?.id}/admin?page=${userPage}&limit=${userItemsPerPage}`);
    return response.data;
  }, { staleTime:  30 * (60 *  1000) });

  useEffect(() => {
    if (usersDataInitial) {
      setUsersData(usersDataInitial);
    }
  }, [usersDataInitial]);

  const updateUserMutation = useMutation<void, AxiosError, User[]>(
    async (updatedUsers) => {
      return await axios.patch('/users/update', updatedUsers);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        queryClient.refetchQueries('users');
      },
    }
  );

  const deleteUserMutation = useMutation<void, AxiosError, number[]>(
    async (selectedUserIds) => {
      await axios.delete('/users/delete', { data: selectedUserIds });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        queryClient.refetchQueries('users');
      },
    }
  );

  const handleUsersSave = async () => {
    const updatedUsers = usersData.filter((user) => {
      const initialUser = usersDataInitial?.find((initial) => initial.id === user.id);
      return initialUser && initialUser.isAdmin !== user.isAdmin;
    });
    if (updatedUsers.length > 0) {
      try {
        const response: any = await updateUserMutation.mutateAsync(updatedUsers);
        if (response.status === 200) {
          setSelectedUsers([]);
          setIsUsersEditMode(false);
        }
      } catch (error) {
        console.error('Update error:', error); // Add this line
      }
    } else {
      setIsUsersEditMode(false);
    }
  };


  const handleUserDelete = async () => {
    try {
      await deleteUserMutation.mutateAsync(selectedUsers);
      setSelectedUsers([]);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleUserSelect = (userId: number) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const userTotalPages = Math.ceil(usersData?.length / userItemsPerPage);
  const displayedUsers = usersData?.slice((userPage -  1) * userItemsPerPage, userPage * userItemsPerPage);

  return {
    selectedUsers,
    setSelectedUsers,
    isUsersEditMode,
    setIsUsersEditMode,
    usersData,
    setUsersData,
    axios,
    handleUsersEdit,
    handleUsersCancel,
    handleUsersSave,
    handleUserDelete,
    handleUserSelect,
    userPage,
    setUserPage,
    userTotalPages,
    displayedUsers,
  };
}