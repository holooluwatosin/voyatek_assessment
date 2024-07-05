'use client'
import React, { useState } from 'react';
import { MagnifyingGlass, Bell, Wallet, Question, Gear, CaretDown, CaretUp } from "@phosphor-icons/react/dist/ssr";

const iconsData = [
    { icon: Bell, label: 'Notification', id: 1 },
    { icon: Wallet, label: 'Wallets', id: 2 },
    { icon: Question, label: 'Inquiries', id: 3 },
    { icon: Gear, label: 'Settings', id: 4 },
];

const Navbar = () => {
    const [activeIconId, setActiveIconId] = useState(null);
    const [activeAvatar, setActiveAvatar] = useState(false);

    const handleIconClick = (id) => {
        setActiveIconId(id);
    };
    const handleImageClick = () => {
        setActiveAvatar(!activeAvatar);
    }

    return (
        <div className='bg-white w-full flex justify-center items-center shadow-custom fixed h-[80px] z-10'>
            <div className='w-[90%] py-4 flex justify-between'>
                <div className='flex justify-start items-center'>
                    <div>
                        <img src="/images/logo.png" alt="Voyatek logo" />
                    </div>
                    <div className='flex justify-start items-center bg-cultured-gray h-[40px] md:w-[429px] ml-[10px] rounded-md px-3'>
                        <MagnifyingGlass size={22} color='#667185' />
                        <input type="search" placeholder='Search here...' className='bg-cultured-gray ml-3' />
                    </div>
                </div>
                <div className='flex justify-normal items-center'>
                    <div className='flex justify-between items-center'>
                        {iconsData.map(({ icon: Icon, label, id }) => (
                            <div
                                key={id}
                                className='flex flex-col items-center justify-between cursor-pointer px-3'
                                onClick={() => handleIconClick(id)}
                            >
                                <Icon size={22} color={activeIconId === id ? 'blue' : 'dark-gray'} />
                                <p className={`text-[12px] ${activeIconId === id ? 'text-blue' : 'text-dark-gray'}`}>
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-normal items-center' onClick={() => {handleImageClick()}}>
                        <img src="/images/avatar.png" alt="" className='rounded-md mr-1' />
                        {activeAvatar ?
                            (<CaretDown size={22} />) :
                            (<CaretUp size={22} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
