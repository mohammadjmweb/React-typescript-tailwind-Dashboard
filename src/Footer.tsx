import React from 'react'

type DashboardProps={
    sidebarOpen:boolean
}

const Footer:React.FC<DashboardProps>=({sidebarOpen})=>{
    return (
        <div className='grid grid-cols-1 px-6 mt-6' >
            <footer className={`bg-blue-950 text-white transition-all duration-300 p-4 border-b-transparent border-2 border-blue-700 rounded-t-xl ${sidebarOpen ? 'md:ml-56' : 'md:ml-0'}`}>
                <div className='flex justify-between'>
                    <h2>© Your Site Name, All Right Reserved.</h2>
                    <div className='flex flex-col'>
                        <h2>Designed By HTML Codex</h2>
                        <h2>Distributed By: ThemeWagon</h2>
                    </div>
                </div>
            </footer>
        </div>)
}

export default Footer