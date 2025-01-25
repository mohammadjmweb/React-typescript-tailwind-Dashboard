import React from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FaUserEdit } from "react-icons/fa";
import { useMutation } from 'react-query';
import axios from 'axios'

type SignUpProps={
    sidebarOpen:boolean
}

interface SignUpFromData{
    username:string;
    email:string;
    password:string
}

const schema=yup.object().shape({
    username:yup.string().matches(/^[A-Za-z][A-Za-z0-9]{3,}$/,'Username must start with a letter and be at least 4 characters long.').required('Username is required'),
    email:yup.string().matches(/^[A-Za-z][A-Za-z0-9]{3,}@(gmail.com|yahoo.com)$/,'The email must start with a letter and must have 4 characters before @ and must end with @yahoo.com or @gmail.com').required('Email is required'),
    password:yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,}$/,'Password must be at least 9 character long and include uppercase letters,lowercase letters,and numbers.').required('Password is required')
})

const submitData=async(data:SignUpFromData)=>{
    const response=await axios.post('https://your-api-endpoint.com/signup',data)
    return response.data
}

const SignUp:React.FC<SignUpProps>=({sidebarOpen})=>{
    const {register,handleSubmit,formState:{errors},trigger}=useForm({
        resolver:yupResolver(schema)
    })

    const mutation=useMutation(submitData,{
        onSuccess:(data)=>{
            console.log('Success',data)
        },
        onError:(error)=>{
            console.error('Error:',error)
        }    
    })

    const onSubmit:SubmitHandler<SignUpFromData>=async (data)=>{
        mutation.mutate(data)
    }

    return(
        <div className={` flex items-center justify-center h-screen bg-black text-gray-300 transition-all duration-300 ${sidebarOpen ? 'md:ml-56' : 'md:ml-0'}`} >
            <form onSubmit={handleSubmit(onSubmit)} className='bg-blue-950 p-6 rounded-xl w-full md:w-3/5 xl:w-2/5 m-6'>
                <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl text-blue-500 cursor-pointer flex items-center">
                        <FaUserEdit className="mr-2"/>
                        <p className="font-bold">Darkpan</p> 
                    </div>
                    <p className="text-3xl font-bold text-white">Sign Up</p>
                </div>
                    
                    <div className='mb-2'>
                        <label className='block text-gray-300'>Username</label>
                        <input type='text' {...register('username',{onChange:()=>trigger('username')})} className={` bg-black rounded w-full py-2 px-3 text-gray-300 outline-none transition-all duration-300 ${errors.username ? 'border-red-500' : ''} `} />
                    </div>
                    {errors.username && <p className='text-red-500 text-base bg-blue-900 rounded-lg p-1 mb-2'>{errors.username.message}</p>}

                    <div className='mb-2'>
                        <label className='block text-gray-300'>Email</label>
                        <input type='email' {...register('email',{onChange:()=>trigger('email')})} className={` bg-black rounded w-full py-2 px-3 text-gray-300 outline-none transition-all duration-300 ${errors.email ? 'border-red-500' : ''} `} />
                    </div>
                    {errors.email && <p className='text-red-500 text-base bg-blue-900 rounded-lg p-1 mb-2'>{errors.email.message}</p>}

                    <div className='mb-2'>
                        <label className='block text-gray-300'>Password</label>
                        <input type='password' {...register('password',{onChange:()=>trigger('password')})} className={` bg-black rounded w-full py-2 px-3 text-gray-300 outline-none transition-all duration-300 ${errors.password ? 'border-red-500' : ''} `} />
                    </div>
                    {errors.password && <p className='text-red-500 text-base bg-blue-900 rounded-lg p-1 '>{errors.password.message}</p>}

                <div className="flex justify-between items-center my-6">
                    <div className="checkbox">
                        <input className="mr-2" type="checkbox" name="" id="check" />
                        <label className="text-gray-400 text-lg" htmlFor="check">Check me out</label>
                    </div> 
                    <a className="text-lg text-blue-500 font-semibold hover:text-blue-700 duration-300" href="">Forgot Password</a>
                </div>
                <button type='submit' disabled={mutation.isLoading} className='w-full text-white font-semibold bg-blue-500 rounded-lg text-lg hover:bg-blue-700 duration-300 py-3 ' >{mutation.isLoading ? 'Submitting...' : 'Sign Up'}</button>
                {mutation.isError && <p>Error occurred during submission!</p>}
            </form>    
        </div>
    )
}

export default SignUp