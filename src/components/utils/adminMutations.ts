// api.js

import { useMutation} from 'react-query';
import { useAxios } from '../../lib/axios';
import { queryClient } from '../../lib/queryClient';
import { AxiosError } from 'axios';
import { Course, User } from './AdminTableTypes';

const axios = useAxios();

export const updateUserMutation = useMutation<void, AxiosError, User[]>(
  async (updatedUsers) => {
    return await axios.patch('/users/update', updatedUsers);
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  }
);

export const updateCoursesMutation = useMutation<void, AxiosError, Course[]>(
  async (updatedCourses) => {
    return await axios.patch('/courses/update', updatedCourses);
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries('courses');
      queryClient.refetchQueries('courses');
    },
  }
);

export const deleteUserMutation = useMutation<void, AxiosError, number[]>(
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

export const deleteCoursesMutation = useMutation<void, AxiosError, number[]>(
  async (selectedCourseIds) => {
    await axios.delete('/courses/delete', { data: selectedCourseIds });
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries('courses');
      queryClient.refetchQueries('courses');
    },
  }
);
