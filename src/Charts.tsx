import React from 'react'
import {Bar, Line,Pie,Doughnut} from 'react-chartjs-2'
import { Chart,registerables } from 'chart.js'

type ChartsProps={
    sidebarOpen:boolean
}

Chart.register(...registerables)

const Charts:React.FC<ChartsProps>=({sidebarOpen})=>{
       const barData={
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                    label: 'USA',
                    data: [18, 30, 55, 65, 60, 80],
                    borderWidth: 1,
                    backgroundColor: 'rgba(255,0,0,0.6)',
                },
                {
                    label: 'UK',
                    data: [10, 35, 40, 60, 70, 55],
                    borderWidth: 1,
                    backgroundColor: 'rgba(0,255,0,0.6)'
                },
                {
                    label: 'AU',
                    data: [15, 25, 45, 55, 65, 70],
                    borderWidth: 1,
                    backgroundColor: 'rgba(0,0,255,0.6)'
                }
            ]
        }
    
        const barOptions={
            plugins:{
                legend:{
                    labels:{
                        color:'white'
                    }
                }
            },
            scales:{
                x:{
                    grid:{
                        color:'dimgray'
                    },
                    ticks:{
                        color:'white'
                    }
                },
                y:{
                    grid:{
                        color:'dimgray'
                    },
                    ticks:{
                        color:'white'
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    
        const lineData={
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                    label: 'Salse',
                    fill:true,
                    data: [100, 130, 170, 125, 190, 185],
                    borderWidth: 3,
                    backgroundColor: 'rgba(128,128,128,0.2)',
                    borderColor:'rgba(255,255,255,0.7)'
                },
                {
                    label: 'Revenue',
                    fill:true,
                    data: [20, 30, 52, 50, 70, 65],
                    borderWidth: 3,
                    backgroundColor: 'rgba(128,128,128,0.9)',
                    borderColor:'rgba(255,255,255,0.9)'
                },
            ]
        }
            
        const lineOptions={
            plugins:{
                legend:{
                    labels:{
                        color:'white'
                    }
                }
            },
            scales:{
                x:{
                    grid:{
                        color:'dimgray'
                    },
                    ticks:{
                        color:'white'
                    }
                },
                y:{
                    grid:{
                        color:'dimgray'
                    },
                    ticks:{
                        color:'white'
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
        
        const pieData={
            labels: [
                'Italy',
                'France',
                'Spain',
                'USA',
                'Argentina'
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [55, 50, 44,24,15],
                backgroundColor: [
                    'rgb(255,0,0)',
                    'rgb(255,165,0)',
                    'rgb(255,255,0)',
                    'rgb(0,255,0)',
                    'rgb(0,0,255)'
                ],
                hoverOffset: 4
            }]
        }

        const pieOptions={
            responsive:true,
            maintainAspectRatio:false
        }

        const doughnutData={
            labels: [
                'Italy',
                'France',
                'Spain',
                'USA',
                'Argentina'
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [55, 50, 44,24,15],
                backgroundColor: [
                    'rgb(255,0,0)',
                    'rgb(255,165,0)',
                    'rgb(255,255,0)',
                    'rgb(0,255,0)',
                    'rgb(0,0,255)'
                ],
                hoverOffset: 4
            }]
        }

        const doughnutOptions={
            responsive:true,
            maintainAspectRatio:false
        }
    return(
        <div className={` grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 px-6 bg-black text-white transition-all duration-300 ${sidebarOpen ? 'md:ml-56' : 'md:ml-0'}`} >
            {/* Charts */}
            <div className="border-2 border-blue-700 bg-blue-950 rounded-xl pt-4 px-4 pb-9 h-[400px] ">
                    <div className="flex justify-between text-xl font-semibold ">
                        <h2>Worldwide Sales</h2>
                        <a href='' className='text-blue-500 hover:text-blue-700' >Show All</a>
                    </div>
                    <Bar className='w-full' data={barData} options={barOptions} />
            </div>
            <div className="border-2 border-blue-700 bg-blue-950 rounded-xl pt-4 px-4 pb-9 h-[400px]">
                    <div className="flex justify-between text-xl font-semibold ">
                        <h2>Salse & Revenue</h2>
                        <a href='' className='text-blue-500 hover:text-blue-700' >Show All</a>
                    </div>
                    <Line className='w-full' data={lineData} options={lineOptions} />
            </div>
            <div className="border-2 border-blue-700 bg-blue-950 rounded-xl pt-4 px-4 pb-9 h-[600px]">
                    <div className="flex justify-between text-xl font-semibold ">
                        <h2>Salse & Revenue</h2>
                        <a href='' className='text-blue-500 hover:text-blue-700' >Show All</a>
                    </div>
                    <Pie className='w-full' data={pieData} options={pieOptions} />
            </div>
            <div className="border-2 border-blue-700 bg-blue-950 rounded-xl pt-4 px-4 pb-9 h-[600px]">
                    <div className="flex justify-between text-xl font-semibold ">
                        <h2>Salse & Revenue</h2>
                        <a href='' className='text-blue-500 hover:text-blue-700' >Show All</a>
                    </div>
                    <Doughnut className='w-full' data={doughnutData} options={doughnutOptions} />
            </div>
        </div>
    )
}

export default Charts