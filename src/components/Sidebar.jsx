'use client'
import React, { useState } from 'react'
import { User, Lock, Bell, Money, Tag, Users, Cloud, SignOut } from "@phosphor-icons/react/dist/ssr";

const Sidebar = () => {
    const [activeIconId, setActiveIconId] = useState(null);
    const handleIconClick = (id) => {
        setActiveIconId(id);
    };

    const sideBarMenu = [
        { icon: User, name: 'Account', id: 1 },
        { icon: Lock, name: 'Security', id: 2 },
        { icon: Bell, name: 'Notifications', id: 3 },
        { icon: Money, name: 'Pricing', id:4 },
        { icon: Tag, name: 'Sales', id: 5 },
        { icon: Users, name: 'Users & Roles', id: 6 },
        { icon: Cloud, name: 'Backups', id: 7 },
    ]

  return (
    <div className='bg-white flex flex-col fixed w-[300px] h-[100%] rounded-md px-2'>
        <div className='flex flex-col justify-between h-[85%]'>
            <div>
                <p className='text-char font-bold text-[12px] py-4 px-5'>Settings</p>
                {sideBarMenu.map(({icon: Icon, name, id }) => (
                    <div 
                        key={id} 
                        className={`flex items-center justify-normal rounded-md px-5 py-3 ${activeIconId === id ? 'bg-light-blue' : ''} `}
                        onClick={() => handleIconClick(id)}
                    >
                        <Icon size={22} className='mr-[4px]' color={activeIconId === id ? 'blue' : '#94A3B8'} />
                        <p className={`text-[14px] ml-5 ${activeIconId === id ? 'text-blue' : 'text-light-gray'}`}>{name}</p>
                    </div>
                ))}
            </div>
            <div>
                <button className='text-independence border border-independence flex rounded-md justify-normal items-center h-[40px] px-2 mx-5'>
                    <SignOut size={22} color='independence' className='mr-3' />
                    Back to Dashboard
                </button>
            </div>
        </div>
    </div>
  )
}

export default Sidebar