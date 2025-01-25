import React,{useState} from 'react'
import {FiMenu} from 'react-icons/fi'
import {FaAngleDown} from 'react-icons/fa6'
import { FaEnvelope } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import userImg from './assets/formal-photo.jpg'
import { FaUserEdit } from "react-icons/fa";

type HeaderProps={
    toggleSidebar:()=> void
    sidebarOpen:boolean
}

const Header:React.FC<HeaderProps>=({toggleSidebar,sidebarOpen})=>{
    const [activeMenu,setActiveMenu]=useState<string|null>(null)

    const toggleMenu=(menu:string)=>{
        setActiveMenu(activeMenu===menu ? null : menu)
    }
    return(
        <div className={`flex justify-between items-center p-4 bg-blue-950 transition-all duration-300 text-white h-[64px] z-20 sticky top-0 border-b-2 border-blue-700 ${sidebarOpen ? 'md:ml-56' : 'md:ml-0'}`}>
            <div className="flex items-center">
                <FaUserEdit className="text-4xl text-blue-500 block md:hidden mr-2 " />
                <div className='cursor-pointer text-blue-700 text-2xl bg-black rounded-full p-2 mr-4' onClick={toggleSidebar}> <FiMenu className='' /> </div>
                <input type="search" name="" id="" className='bg-black outline-none px-2 py-1 rounded-lg hidden md:block '/>
            </div>
               
            <div className='flex justify-between items-center text-white'>
                <div className='relative'>
                    <button onClick={()=>toggleMenu('messages')} className='flex items-center outline-none hover:text-blue-500 '>
                        <div className='p-2 bg-black rounded-full' >
                            <FaEnvelope className=' text-xl ' />
                        </div>
                        <p className='text-lg hidden lg:block ml-2'>Messages</p> 
                        {activeMenu === 'messages' ? (
                            <FaAngleDown className='mx-2 transition-all duration-300 rotate-180'/>
                        ) : (
                            <FaAngleDown className='mx-2 transition-all duration-300'/>
                        )}
                    </button>
                    {activeMenu === 'messages' && (
                        <div className="absolute top-[51px] left-[-32px] w-[250px] bg-blue-950 border-2 border-blue-900 rounded-b-lg border-t-transparent ">
                            <div className="flex p-2 hover:bg-black ">
                                    <img className="w-[70px] h-[70px] mr-2 rounded-full" src={userImg} alt="" />
                                    <div className="flex flex-col">
                                        <h2 className="text-white font-bold ">Jane sent you a message</h2>
                                        <h2 className="text-gray-400">15 minutes ago</h2>
                                    </div>
                            </div>
                            <hr />
                            <div className="flex p-2 hover:bg-black">
                                <img className="w-[70px] h-[70px] mr-2 rounded-full" src={userImg} alt=""/>
                                <div className="flex flex-col">
                                    <h2 className="text-white font-bold ">Joun sent you a message</h2>
                                    <h2 className="text-gray-400">15 minutes ago</h2>
                                </div>
                            </div>
                            <hr />
                            <div className="flex p-2 hover:bg-black">
                                <img className="w-[70px] h-[70px] mr-2 rounded-full" src={userImg} alt=""/>
                                <div className="flex flex-col">
                                    <h2 className="text-white font-bold ">Jack sent you a message</h2>
                                    <h2 className="text-gray-400">15 minutes ago</h2>
                                </div>
                            </div>
                            <hr />
                            <h2 className="text-gray-400 text-center py-2 hover:bg-black rounded-b-lg"> all messages</h2>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <button onClick={()=>toggleMenu('notification')} className='flex items-center outline-none hover:text-blue-500 '>
                        <div className='p-2 bg-black rounded-full' >
                            <FaBell className='text-xl'/>
                        </div>
                        <p className='text-lg hidden lg:block ml-2'>Notifications</p> 
                        {activeMenu === 'notification' ? (
                            <FaAngleDown className='mx-2 transition-all duration-300 rotate-180'/>
                        ) : (
                            <FaAngleDown className='mx-2 transition-all duration-300'/>
                        )}
                    </button>
                    {activeMenu === 'notification' && (
                        <div className="absolute top-[51px] right-0 w-[160px] bg-blue-950 border-2 border-blue-900 rounded-b-lg border-t-transparent ">
                            <div className="flex flex-col hover:bg-black p-2">
                                <h2 className="text-white font-bold ">profile updated</h2>
                                <h2 className="text-gray-400">15 minutes ago</h2>
                            </div>
                            <hr />
                            <div className="flex flex-col hover:bg-black p-2">
                                <h2 className="text-white font-bold">New user added</h2>
                                <h2 className="text-gray-400">15 minutes ago</h2>
                            </div>
                            <hr />
                            <div className="flex flex-col hover:bg-black p-2">
                                <h2 className="text-white font-bold ">Password changed</h2>
                                <h2 className="text-gray-400">15 minutes ago</h2>
                            </div>
                            <hr />
                        <h2 className="text-gray-400 text-center py-2 hover:bg-black rounded-b-lg"> See all notifications</h2>
                    </div> 
                    )}
                </div>
                <div className='relative'>
                    <button onClick={()=>toggleMenu('profile')} className='flex items-center outline-none hover:text-blue-500 '>
                        <img src={userImg} alt="Avatar" className='w-11 h-11 rounded-full' />
                        <p className='text-lg hidden lg:block ml-2'>Profile</p> 
                        {activeMenu === 'profile' ? (
                            <FaAngleDown className='ml-2 transition-all duration-300 rotate-180'/>
                        ) : (
                            <FaAngleDown className='ml-2 transition-all duration-300'/>
                        )}
                    </button>
                    {activeMenu === 'profile' && (
                        <div className="absolute top-[55px] right-0 w-[150px] bg-blue-950 border-2 border-blue-900 rounded-b-lg border-t-transparent py-2">
                            <h2 className="text-gray-400 hover:bg-black px-2 text text-center">My Profile</h2>
                            <h2 className="text-gray-400 hover:bg-black px-2 text text-center">Settings</h2>
                            <h2 className="text-gray-400 hover:bg-black px-2 text text-center">Log Out</h2>
                        </div> 
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header