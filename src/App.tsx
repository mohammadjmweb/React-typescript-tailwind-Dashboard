import './App.css'
import React , {useEffect, useState} from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'
import Footer from './Footer'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Charts from './Charts'
import SignUp from './SignUp'


const App:React.FC=()=>{
    const [sidebarOpen,setSidebarOpen]=useState<boolean>(false)

    const toggleSidebar=()=>{
        setSidebarOpen(prev=>!prev)
    }

    const handleResize=()=>{
        setSidebarOpen(false)
    }

    useEffect(()=>{
        window.addEventListener('resize',handleResize)

        return ()=>{
            window.removeEventListener('resize',handleResize)
        }
    },[])

    

    return(
        <Router >
                <div className='bg-black flex'>
                    <Sidebar isOpen={sidebarOpen}/>
                    <div className='w-full flex flex-col'>
                        <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
                        <Routes>
                            <Route path='/' element={<Dashboard sidebarOpen={sidebarOpen} />} />
                            <Route path='/charts' element={<Charts sidebarOpen={sidebarOpen} />} />
                            <Route path='/signup' element={<SignUp sidebarOpen={sidebarOpen} />} />
                        </Routes>
                        <Footer sidebarOpen={sidebarOpen}/>
                    </div>
                </div> 
        </Router>
    )
}
export default App