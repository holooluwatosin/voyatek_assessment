import axios from '../utils/axiosConfig'
// import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '@/slices/userSlice';

export const addNewUser = async (user) => {
  try {
    const response = await axios.post('/api/users', user);
    // dispatch(addUser(response.data));
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get('/api/users');
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

export const editUser = async (id, updatedUser) => {
  try {
    const response = await axios.put(`/api/users/${id}`, updatedUser);
    return response.data;
  } catch (error) {
    console.error('Error editing user:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};