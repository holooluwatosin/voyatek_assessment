'use client'
import React, { useState } from 'react';
import { MagnifyingGlass, FunnelSimple, PlusCircle, EyeClosed, Eye } from "@phosphor-icons/react/dist/ssr";
import Table from './Table';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
// import { addNewUser } from '@/endpoint/user';
import { addNewUserDetails } from '@/slices/userSlice';
import axios from '../utils/axiosConfig'

const Users = () => {
    const [activeButton, setActiveButton] = useState(1);
    const [addUser, setAddUser] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [email, setEmail] = useState();
    const [fullName, setFullName] = useState();
    const [role, setRole] = useState();
    const [password, setPassword] = useState();

    const user = { email, fullName, role, password };

    const togglePassVisibility = () => {
        setConfirmPasswordVisible(prevVisibility => !prevVisibility)
    }

    const handleClick = (buttonIndex) => {
        setActiveButton(buttonIndex);
    };

    const handleChange = (e) => {
        setRole(e.target.value)
    }

    const dispatch = useDispatch();
    const addNewUser = async (user) => {
        try {
          const response = await axios.post('/api/users', user);
          dispatch(addNewUserDetails(response.data));
          return response.data;
        } catch (error) {
          console.error('Error adding user:', error);
          throw error;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNewUser(user)
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

    const header = [
        { name: 'Users', id: 1 },
        { name: 'Roles', id: 2 },
    ];

    const getContent = () => {
        switch (activeButton) {
          case 1:
            return (
                <>
                    <Table />
                </>
            );
          case 2:
            return (
                <div>
                    Roles
                </div>
            );
          default:
            return (
              <p>
                Default Content
              </p>
            );
        }
    };

    return (
        <div>
            <div className='mt-2'>
                <p className='text-[14px] font-medium text-cultured-gray-3'>Settings / Users & Roles Settings</p>
                <p className='text-[24px] font-bold text-yankee-blue mt-6'>Users & Roles</p>
                <p className='text-[16px] font-normal text-cultured-gray-3'>Manage all users in your business</p>
            </div>
            <div className='mt-7'>
                <div className='flex justify-start'>
                    {header.map((item) => (
                        <button
                            key={item.id}
                            className={`px-4 py-2 mr-2 my-3 text-[15px] ${
                                activeButton === item.id ? 'text-blue border-b-[2px] border-blue' : 'text-yankee-blue'
                            }`}
                            onClick={() => handleClick(item.id)}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
                <div className='rounded-md bg-white min-h-[400px] w-full flex flex-col items-center'>
                    <div className='py-3 w-[98%] flex justify-between items-center'>
                        <div className='flex justify-normal'>
                            <div className='flex justify-start items-center h-[40px] md:w-[329px] ml-[10px] rounded-md px-3 border border-light-gray-2'>
                                <MagnifyingGlass size={22} color='#94A3B8' />
                                <input type="search" placeholder='Search here...' className='ml-3' />
                            </div>
                            <button className='flex justify-start items-center h-[40px] ml-[10px] rounded-md px-3 border border-light-gray-2'>
                                <FunnelSimple size={22} color='#94A3B8' className='mr-3' />
                                Filter
                            </button>
                        </div>
                        <button className='text-white bg-blue flex rounded-md justify-normal items-center h-[40px] px-2 mr-5' onClick={()=>{setAddUser(!addUser)}}>
                            <PlusCircle size={22} color='#FFFFFF' className='mr-3' />
                            New User
                        </button>
                    </div>
                    {getContent()}
                </div>
            </div>
            <Modal open={addUser} setOpen={setAddUser}>
                <div className='w-full'>
                    <div className=' w-full flex flex-col justify-between items-center py-4'>
                        <div className='flex flex-col justify-between items-center'>
                            <img src="./images/avatar-2.png" alt="" />
                            <p className='text-yankee-blue text-[24px] font-bold mb-[20px]'>New User</p>
                        </div>
                        <form onSubmit={handleSubmit} className='w-[90%]'>
                            <div className='mb-[30px]'>
                                <p htmlFor="" className='text-independence text-[14px]'>Email Address</p>
                                <input type="email" placeholder="New User's Email Address" className='border border-light-gray-2 rounded-md p-[15px] w-full' onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                            </div>
                            <div className='mb-[30px]'>
                                <p htmlFor="" className='text-independence text-[14px]'>Full Name</p>
                                <input type="text" placeholder="New User's Full Name" className='border border-light-gray-2 rounded-md p-[15px] w-full' onChange={(e)=>{setFullName(e.target.value)}} value={fullName}/>
                            </div>
                            <div className='mb-[30px]'>
                                <p htmlFor="" className='text-independence text-[14px]'>Role</p>
                                <select className='border border-light-gray-2 rounded-md p-[15px] w-full' onChange={handleChange}>
                                    <option value="" disabled selected>Select Role</option>
                                    <option value="Administrator">Administrator</option>
                                    <option value="Sales Manager">Sales Manager</option>
                                    <option value="Sales Representative">Sales Representative</option>
                                </select>
                            </div>
                            <div className='mb-[30px]'>
                                <p htmlFor="" className='text-independence text-[14px]'>Create Password</p>
                                {/* <input type="text" placeholder="Create a password for new user" className='border border-light-gray-2 rounded-md p-[15px] w-full'/> */}

                                <div className={`text-[#333333] font-[400] text-[16px] border-[1px] border-[#C5C5C5] rounded-[8px] p-3 w-full flex gap-4 ${password ? 'bg-[#E8E8E8]' : ''}`}>
                                    {/* <GiPadlock className='w-[20px]' /> */}
                                    <input
                                        type={confirmPasswordVisible ? 'text' : 'password'}
                                        className='border-none outline-none w-[90%] placeholder:text-[#C5C5C5] bg-transparent'
                                        placeholder='Create a password for new user'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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

                            <button type='submit' className='bg-blue text-white py-3 w-full rounded-md mb-[30px]'>Add User</button>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Users;
