import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { FaCheck } from "react-icons/fa6";
import { FaX } from "react-icons/fa6";
import {format,startOfMonth,addMonths,isToday, eachDayOfInterval, startOfWeek} from 'date-fns'
import userImg from './assets/formal-photo.jpg'
import { FaChartLine } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaChartArea } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import nature1 from './assets/nature1.jpg'
import nature2 from './assets/nature2.jpg'
import nature3 from './assets/nature3.jpg'
import nature4 from './assets/nature4.jpg'

type DashboardProps={
    sidebarOpen:boolean
}

const images:Image[]=[
    {src:nature1,caption:'picture1'},
    {src:nature2,caption:'picture2'},
    {src:nature3,caption:'picture3'},
    {src:nature4,caption:'picture4'}
]

interface Image{
    src:string;
    caption:string;
}

const Dashboard:React.FC<DashboardProps>=({sidebarOpen})=>{
    
    const [currentIndex,setCurrentIndex]=useState<number>(0)
    const [isTransitioning,setIsTransitioning]=useState<boolean>(false)

    const [todos,setTodos]=useState<Array<{id:number;title:string;completed:boolean}>>([])
    const [users,setUsers]=useState<Array<{id:number;name:string;username:string;phone:string}>>([])

    const [currentDate,setCurrentDate]=useState<Date>(new Date())

    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/todos').then(response=> setTodos(response.data))
    },[])

    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users').then(response=> setUsers(response.data))
    },[])

    useEffect(()=>{
        const interval=setInterval(()=>{
            nextSlide()    
        } ,2000)
        return ()=> clearInterval(interval)
    },[])

    const nextSlide=()=>{
        if(isTransitioning) return
        setIsTransitioning(true)

        setCurrentIndex(prevIndex=>{
            if(prevIndex === images.length - 1){
                return 0
            }else{
                return prevIndex + 1
            }
        })
        setTimeout(()=>{
            setIsTransitioning(false)
        } ,500)
    }

    const prevSlide=()=>{
        if(isTransitioning) return
        setIsTransitioning(true)

        setCurrentIndex(prevIndex=>{
            return prevIndex > 0 ? prevIndex - 1 : images.length - 1
        })
        setTimeout(()=> setIsTransitioning(false) ,500)
    }

 

    const monthStart=startOfMonth(currentDate)
    const monthEnd=new Date(monthStart.getFullYear(),monthStart.getMonth()+1,0)
    const monthName=format(monthStart,'MMMM yyyy')

    eachDayOfInterval({start:monthStart,end:monthEnd})
    const start=startOfWeek(monthStart,{weekStartsOn:0})
    const weeks=[]
    let currentWeek=[]
    for(let day of eachDayOfInterval({start,end:monthEnd})){
        currentWeek.push(day)
        if(currentWeek.length===7){
            weeks.push(currentWeek)
            currentWeek=[]
        }
    }
    if(currentWeek.length)
weeks.push(currentWeek)

    const weekDays=['Su','Mo','Tu','We','Th','Fr','Sa']
   
    return(
        <div className={` transition-all duration-300 bg-black text-white ${sidebarOpen ? 'md:ml-56' : 'md:ml-0'} `} >
            {/* Image Slider */}
            <div className='grid grid-cols-1 m-6 border-2 border-blue-700 rounded-xl h-[350px] md:h-[500px] relative px-12 md:p-0' >    
                <div className="relative w-full md:w-3/4 m-auto overflow-hidden h-[300px] md:h-[450px]">
                    <div className="flex transition-transform duration-500 h-[300px] md:h-[450px] " style={{transform:`translateX(-${currentIndex*100}%)`} as React.CSSProperties} >
                        {images.map((image,index)=>(
                            <div key={index} className='flex-shrink-0 w-full h-[300px] md:h-[450px] relative'>
                                <img src={image.src} alt={`Slide ${index}`} className='h-[300px] md:h-[450px] w-full' />
                                <p className='text-center text-blue-950 font-bold bg-blue-500 text-xl mt-2 absolute bottom-4 left-[37%] md:left-[45%] w-[100px] p-2 rounded-lg' >{image.caption}</p> 
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={prevSlide} className='absolute text-4xl left-[4%] md:left-[10%] top-1/2 transform -translate-y-1/2 bg-blue-700 text-white p-3 rounded-full'><FaArrowLeft/></button>
                <button onClick={nextSlide} className='absolute text-4xl right-[4%] md:right-[10%] top-1/2 transform -translate-y-1/2 bg-blue-700 text-white p-3 rounded-full'><FaArrowRight/></button>
            </div>
            
            {/* Mini Carts */}
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 px-6 my-6 '>
                <div className="bg-blue-950 border-2 border-blue-700 p-4 rounded-xl shadow flex justify-between items-center ">
                    <FaChartLine className='text-6xl' />
                    <div className="flex flex-col text-xl justify-between">
                        <h2>Today Sale</h2>
                        <h2>$1234</h2>
                    </div>
                </div>
                <div className="bg-blue-950 border-2 border-blue-700 p-4 rounded-xl shadow flex justify-between items-center ">
                    <FaChartBar className='text-6xl' />
                    <div className="flex flex-col text-xl justify-between">
                        <h2>Today Sale</h2>
                        <h2>$1234</h2>
                    </div>
                </div>
                <div className="bg-blue-950 border-2 border-blue-700 p-4 rounded-xl shadow flex justify-between items-center ">
                    <FaChartArea className='text-6xl' />
                    <div className="flex flex-col text-xl justify-between">
                        <h2>Today Sale</h2>
                        <h2>$1234</h2>
                    </div>
                </div>
                <div className="bg-blue-950 border-2 border-blue-700 p-4 rounded-xl shadow flex justify-between items-center ">
                    <FaChartPie className='text-6xl' />
                    <div className="flex flex-col text-xl justify-between">
                        <h2>Today Sale</h2>
                        <h2>$1234</h2>
                    </div>
                </div>
            </div>
        
            {/* Users Table */}
            <div className="grid grid-cols-1 px-4 my-6 px-6 ">
                <div className='bg-blue-950 border-2 border-blue-700 rounded-xl p-4' >
                    <div className="flex justify-between text-xl font-semibold mb-2">
                        <h2>Users information</h2>
                        <a href='' className='text-blue-500 hover:text-blue-700' >Show All</a>
                    </div>
                    <table className='text-center w-full border-2 border-blue-700  ' >
                        <thead>
                            <tr className='border-2 border-gray-400 bg-blue-900 ' >
                                <th className='border-2 border-gray-400 p-2 ' >id</th>
                                <th className='border-2 border-gray-400 p-2' >name</th>
                                <th className='border-2 border-gray-400 p-2' >username</th>
                                <th className='border-2 border-gray-400 p-2' >phone</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {users.slice(0,5).map(user=>(
                                <tr className='border-2 border-gray-400 bg-blue-900 hover:bg-blue-950 '  key={user.id}>
                                    <td className='border-2 border-gray-400 p-2' >{user.id}</td>
                                    <td className='border-2 border-gray-400' >{user.name}</td>
                                    <td className='border-2 border-gray-400' >{user.username}</td>
                                    <td className='border-2 border-gray-400' >{user.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 px-6 gap-6">
                {/* Messages */}
                <div className='bg-blue-950 border-2 border-blue-700 rounded-xl p-4 ' >
                    <div className="flex justify-between text-xl font-semibold mb-2">
                        <h2>Users information</h2>
                        <a href='' className='text-blue-500 hover:text-blue-700' >Show All</a>
                    </div>
                    <div className='flex my-4 '>
                        <img src={userImg} alt="" className='w-[15%] rounded-full mr-2 ' />
                        <div className="flex flex-col w-[85%] justify-between ">
                            <div className='flex justify-between' >
                                <h2>Mohammad Jm</h2>
                                <h2>15 minutes ago</h2>        
                            </div>
                            <h2>short message goes here</h2>
                        </div>
                    </div>
                    <hr className='border-2' />
                    <div className='flex my-4 '>
                        <img src={userImg} alt="" className='w-[15%] rounded-full mr-2 ' />
                        <div className="flex flex-col w-[85%] justify-between ">
                            <div className='flex justify-between' >
                                <h2>Mohammad Jm</h2>
                                <h2>15 minutes ago</h2>        
                            </div>
                            <h2>short message goes here</h2>
                        </div>
                    </div>
                    <hr className='border-2'/>
                    <div className='flex my-4 '>
                        <img src={userImg} alt="" className='w-[15%] rounded-full mr-2 ' />
                        <div className="flex flex-col w-[85%] justify-between ">
                            <div className='flex justify-between' >
                                <h2>Mohammad Jm</h2>
                                <h2>15 minutes ago</h2>        
                            </div>
                            <h2>short message goes here</h2>
                        </div>
                    </div>
                    <hr className='border-2'/>
                    <div className='flex my-4 '>
                        <img src={userImg} alt="" className='w-[15%] rounded-full mr-2 ' />
                        <div className="flex flex-col w-[85%] justify-between ">
                            <div className='flex justify-between' >
                                <h2>Mohammad Jm</h2>
                                <h2>15 minutes ago</h2>        
                            </div>
                            <h2>short message goes here</h2>
                        </div>
                    </div>
                </div>
                {/* Calendar */}
                <div className='bg-blue-950 border-2 border-blue-700 p-4 rounded-xl '>
                    <div className="flex justify-between text-xl font-semibold mb-2">
                        <h2>Calendar</h2>
                        <a href='' className='text-blue-500 hover:text-blue-700' >Show All</a>
                    </div>
                    <div className="flex justify-between px-4 mb-3 text-2xl  ">
                        <button className=' hover:bg-gray-300 hover:text-blue-950 p-1 rounded-lg ' onClick={()=>setCurrentDate(addMonths(currentDate,-1))}><FaArrowLeft/></button>
                        <h1 className='cursor-pointer hover:bg-gray-300 hover:text-blue-950 p-1 rounded-lg ' >{monthName}</h1>
                        <button className=' hover:bg-gray-300 hover:text-blue-950 p-1 rounded-lg ' onClick={()=>setCurrentDate(addMonths(currentDate,1))}><FaArrowRight/></button>
                    </div>
                    
                    <table className='w-full text-center text-gray-300 border-collapse ' >
                        <thead>
                            <tr className='text-gray-300' >
                                {weekDays.map(day=>(
                                    <th className='border-collapse' key={day}>{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {weeks.map((week,index)=>(
                                <tr className='border-collapse' key={index}>
                                    {week.map(day=>(
                                        <td key={day.toString()}  className={`text-gray-300 rounded-lg p-1 cursor-pointer hover:bg-gray-300 hover:text-blue-950 border-collapse ${isToday(day) ? 'bg-blue-700' : ''}`} >
                                            {day.getDate()}
                                        </td>
                                    ))}
                                </tr>    
                            ))}
                                    
                        </tbody>
                    </table>
                </div>
                {/* To Do List */}
                <div className="bg-blue-950 border-2 border-blue-700 p-4 rounded-xl">
                    <div className="flex justify-between text-xl font-semibold mb-4">
                        <h2>To Do List</h2>
                        <a href='' className='text-blue-500 hover:text-blue-700' >Show All</a>
                    </div>
                    <table className='text-center w-full ' >
                        <thead>
                            <tr className='border-2 border-gray-400 bg-blue-900 ' >
                                <th className='border-2 border-gray-400 p-1 ' >id</th>
                                <th className='border-2 border-gray-400 p-1' >title</th>
                                <th className='border-2 border-gray-400 p-1' >completed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.slice(0,5).map(todo=>(
                                <tr key={todo.id} className='border-2 border-gray-400 bg-blue-900 hover:bg-blue-950 ' >
                                    <td className='border-2 border-gray-400' >{todo.id}</td>
                                    <td className='border-2 border-gray-400' >{todo.title}</td>
                                    <td className='text-center border-2 border-gray-400 ' >
                                        {todo.completed ? (
                                            <FaCheck  className='text-green-500 mx-auto ' />
                                        ) : (
                                            <FaX className='text-red-500 mx-auto ' />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    )
}

export default Dashboard