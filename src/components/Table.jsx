'use client'
import React, { useState,useEffect, useCallback  } from 'react';
import Modal from './Modal';
import { MagnifyingGlass, FunnelSimple, PlusCircle, EyeClosed, Eye } from "@phosphor-icons/react/dist/ssr";
import { getAllUsers } from '@/endpoint/user';
import { getUsers } from '@/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../utils/axiosConfig'
import Loader from "react-js-loader";

const Table = () => {
    const [loading, setLoading] = useState(false);
    const [updateUser, setUpdateUser] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    const [userId, setUserId] = useState(null);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [confirmNewPass, setConfirmNewPass] = useState('')

    const togglePassVisibility = () => {
        setConfirmPasswordVisible(prevVisibility => !prevVisibility)
    }

    const header = ['Name', 'Email Address', 'Role', 'Actions'];
    // const history = [
    //     {
    //         id: 1,
    //         name: 'Taiwo Isaac',
    //         email: 'taiwo@email.com',
    //         role: 'Administrator',
    //         text: 'blue',
    //         background: 'light-blue'
    //     },
    //     {
    //         id: 2,
    //         name: 'Seun Fagbemi',
    //         email: 'seunfagbemi@email.com',
    //         role: 'Sales Manager',
    //         text: 'green',
    //         background: 'light-green'
    //     },
    //     {
    //         id: 2,
    //         name: 'Dare Oyejide',
    //         email: 'dareoyejide@email.com',
    //         role: 'Sales Manager',
    //         text: 'green',
    //         background: 'light-green'
    //     },
    //     {
    //         id: 2,
    //         name: 'StudiMatch',
    //         email: 'studimatch@email.com',
    //         role: 'Sales Representative',
    //         text: 'orange',
    //         background: 'light-orange'
    //     },
    // ]
    
    const dispatch = useDispatch();
    const getAllUsers = async () => {
        try {
          const response = await axios.get('/api/users');
        //   console.log('response', response.data)
          dispatch(getUsers(response.data))
        //   return response.data;
        } catch (error) {
          console.error('Error adding user:', error);
          throw error;
        }
    };

    const deleteUserData = async (id) => {
        try {
          const response = await axios.delete(`/api/users/${id}`);
          GetUsers();
          setDeleteUser(false);
          return response.data;
        } catch (error) {
          console.error('Error deleting user:', error);
          throw error;
        }
      };

    const users = useSelector((state) => state.users.users)
    // console.log('users:', users.users)

    // const [productHistory, setProductHistory] = useState(history);
    const GetUsers = useCallback(() => {
        getAllUsers()
    }, [])
    useEffect(() => {
        GetUsers()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setDetails((prevState) => ({
          ...prevState,
          [name]: value,
        }))
      }

    const initialstate = {
        email: '', fullName: '', role: '', password: '',
      }
      const [details, setDetails] = useState(initialstate)

      const user = { email: details.email, fullName: details.fullName, role: details.role };

      const editUser = async () => {
        try {
          const response = await axios.put(`/api/users/${userId}`, user);
        //   dispatch(addNewUserDetails(response.data));
        GetUsers();
        setUpdateUser(false);
          return response.data;
        } catch (error) {
          console.error('Error adding user:', error);
          throw error;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editUser(user)
            .then(() => {
                // Handle success, e.g., clear the form or show a success message
                console.log('User added successfully');
                setEmail('');
                setFullName('');
                setRole('');
                setPassword('');
            })
            .catch((error) => {
                // Handle error
                console.error('Error adding user:', error);
            });
        console.log('submitted')
    }

    return (
        <div className='w-full overflow-x-auto'>
            <table className='w-full divide-y divide-light-gray-2'>
                <thead className='bg-cultured-gray h-[40px]'>
                    <tr>
                        {header.map((item, index) => (
                            <td key={index} className=''>
                                {item === 'Name' ? <input type="checkbox" name="" id="" className='ml-6 mr-4 bg-light-gray-2' /> : ''}
                                {item}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody className='divide-y divide-light-gray-2'>
                    {loading ? (
                        <tr>
                            <td colSpan={header.length} className="text-center py-4">
                                <Loader type="spinner-default" bgColor={"#000000"} color={'#000000'} size={50} />
                            </td>
                        </tr>
                    ) : (
                        users.map((product, index) => (
                        <tr key={index}>
                            <td className="py-4 whitespace-nowrap"><input type="checkbox" name="" id="" className='ml-6 mr-4 bg-light-gray-2' />{product.fullName}</td>
                            <td className="py-4 whitespace-nowrap">{product.email}</td>
                            <td className="py-4 px-3 whitespace-nowrap">
                                <div className={`text-center ${
                                  product.role === 'Administrator' ? 'text-blue bg-light-blue rounded-[10px] px-2 w-[150px]' : 
                                  product.role === 'Sales Manager' ? 'text-green bg-light-green rounded-[10px] px-2 w-[150px]' : 
                                  'text-orange bg-light-orange rounded-[10px] px-2 w-[210px]'
                                }`}>
                                    {product.role}
                                </div> 
                            </td>
                            <td className="py-4 pr-4 whitespace-nowrap">
                                <span className='text-blue mr-2 cursor-pointer' onClick={(id)=>{setUpdateUser(!updateUser); setUserId(product.id); setDetails(product)}}>Edit</span>
                                <span className='text-light-gray-2 cursor-pointer' onClick={(id)=>{setDeleteUser(!deleteUser); setUserId(product.id)}}>Remove</span>
                            </td>
                        </tr>
                        ))
                    )}
                </tbody>
            </table>
            <Modal open={updateUser} setOpen={setUpdateUser}>
                <div className='w-full'>
                    <div className=' w-full flex flex-col justify-between items-center py-4'>
                        <div className='flex flex-col justify-between items-center'>
                            <img src="./images/avatar-2.png" alt="" />
                            <p className='text-yankee-blue text-[24px] font-bold mb-[20px]'>Edit User</p>
                        </div>
                        <form onSubmit={handleSubmit} className='w-[90%]'>
                            <div className='mb-[30px]'>
                                <p htmlFor="" className='text-independence text-[14px]'>Email Address</p>
                                <input type="text" placeholder="New User's Email Address" className='border border-light-gray-2 rounded-md p-[15px] w-full' value={details.email} onChange={handleChange} id='email' name='email'/>
                            </div>
                            <div className='mb-[30px]'>
                                <p htmlFor="" className='text-independence text-[14px]'>Full Name</p>
                                <input type="text" placeholder="New User's Full Name" className='border border-light-gray-2 rounded-md p-[15px] w-full' value={details.fullName} onChange={handleChange} id='fullName' name='fullName'/>
                            </div>
                            <div className='mb-[30px]'>
                                <p htmlFor="" className='text-independence text-[14px]'>Role</p>
                                <select className='border border-light-gray-2 rounded-md p-[15px] w-full' value={details.role} onChange={handleChange} id='role' name='role'>
                                    <option value="" disabled selected>Select Role</option>
                                    <option value="Administrator">Administrator</option>
                                    <option value="Sales Manager">Sales Manager</option>
                                    <option value="Sales Representative">Sales Representative</option>
                                </select>
                            </div>
                            <div className='mb-[30px]'>
                                <p htmlFor="" className='text-independence text-[14px]'>Create Password</p>
                                {/* <input type="text" placeholder="Create a password for new user" className='border border-light-gray-2 rounded-md p-[15px] w-full'/> */}

                                <div className={`text-[#333333] font-[400] text-[16px] border-[1px] border-[#C5C5C5] rounded-[8px] p-3 w-full flex gap-4 ${confirmNewPass ? 'bg-[#E8E8E8]' : ''}`}>
                                    {/* <GiPadlock className='w-[20px]' /> */}
                                    <input
                                        type={confirmPasswordVisible ? 'text' : 'password'}
                                        className='border-none outline-none w-[90%] placeholder:text-[#C5C5C5] bg-transparent'
                                        placeholder='Create a password for new user'
                                        value={confirmNewPass}
                                        onChange={(e) => setConfirmNewPass(e.target.value)}
                                    />
                                    <div onClick={togglePassVisibility}>
                                        {confirmPasswordVisible ? (
                                            <Eye size={22} />
                                        ) : (
                                            <EyeClosed size={22} />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button className='bg-blue text-white py-3 w-full rounded-md mb-[30px]'>Update User</button>
                        </form>
                    </div>
                </div>
            </Modal>
            <Modal open={deleteUser} setOpen={setDeleteUser}>
                <div className='w-full'>
                    <div className=' w-full flex flex-col justify-between items-center py-4'>
                        <div className='w-[90%] flex flex-col justify-between items-center'>
                            <p className='text-[24px] font-bold mb-3 text-yankee-blue'>Delete this user</p>
                            <p className='text-[16px] text-cultured-dark-gray font-normal text-center'>This user and all associated data will be permanently removed. Do you wish to continue</p>
                            <div className='flex items-center justify-center my-3'>
                                <div className='border border-black py-2 px-2 mr-3' onClick={()=>(setDeleteUser(false))}>Cancel Action</div>
                                <div className='border border-red-600 p-2 text-red-600' onClick={() => {deleteUserData(userId)}}>Yes, Delete</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Table;
